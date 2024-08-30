import { _decorator, Component, error, warn, Node } from 'cc';
import { ZCConfig } from './ZCConfig';
import { AndroidSdk } from '../AndroidSdk';
const { ccclass, property } = _decorator;

type HttpCallback = (ret: HttpReturn) => void;

var urls:any = {};
var reqparams:any = {};


export enum HttpEvent {
    NO_NETWORK = "http_request_no_network",

    UNKNOWN_ERROR = "http_request_unknown_error",

    TIMEOUT = "http_request_timout"
}

export class HttpReturn {

    isSucc: boolean = false;

    res?: any;

    err?: any;
}

export class HttpRequest {

    defaultUrl: string =  "https://api.coincraze.ai/"; //"http://122.114.74.62:9009/"; //"http://192.168.9.114:8008/" // "http://111.229.126.145:8098/" //"http://111.229.126.145:8098/"; // "http://192.168.9.78:8098/"//

    h5defaultUrl:string =  "http://localhost:9991/"

    timeout:number = 10000;

    private header: Map<string, string> = new Map<string, string>();

    constructor() {
        //this.defaultUrl = this.h5defaultUrl;
        this.timeout = ZCConfig.httpServerTimeout;
    }

    /**
     * @param {string} name    
     * @param {string} value    
     * @memberof HttpRequest
     */
    addHeader(name:string, value:string) {
        this.header.set(name, value);
    }

    getHeader(name:string):string {
        return this.header.get(name);
    }

    isHeader(name:string):boolean {
        return this.header.has(name);
    }

    get(name:string, onComplete:HttpCallback, params:any = null) {
        this.sendRequest(name, params, false, onComplete)
    }

    getAsync(name:string, params:any = null): Promise<HttpReturn> {
        return new Promise((resolve, reject) => {
            this.sendRequest(name, params, false, (ret:HttpReturn) => {
                resolve(ret);
            });
        });
    }

    getByArraybuffer(name:string, onComplete:HttpCallback, params:any = null) {
        this.sendRequest(name, params, false, onComplete, 'arraybuffer', false);
    }

    getAsyncByArraybuffer(name:string, params:any = null): Promise<HttpReturn> {
        return new Promise((resolve, reject) => {
            this.sendRequest(name, params, false, (ret:HttpReturn) => {
                resolve(ret);
            }, 'arraybuffer', false);
        });
    }

    post(name:string, onComplete:HttpCallback, params:any = null) {
        this.sendRequest(name, params, true, onComplete);
    }

    /**
     * 
     *
     * @param {string} name
     * @param {*} [params=null]
     * @return {*}  {Promise<HttpReturn>}
     * @memberof HttpRequest
     */
    postAsync(name:string, params:any = null): Promise<HttpReturn> {
        return new Promise((resolve, reject) => {
            this.sendRequest(name, params, true, (ret: HttpReturn) => {
                resolve(ret);
            });
        });
    }

    /**
     * @param {string} name
     * @memberof HttpRequest
     */
    abort(name:string) {
        var xhr = urls[this.defaultUrl + name];
        if (xhr) {
            xhr.abort();
        }
    }

    /**
     * @private
     * @param {string} name 
     * @param {*} params 
     * @param {boolean} isPost
     * @param {HttpCallback} onComplete
     * @param {string} [responseType] 
     * @param {boolean} [isOpenTimeout=true]
     * @return {*} 
     * @memberof HttpRequest
     */
    private sendRequest(name:string, params:any, isPost:boolean, onComplete:HttpCallback, responseType?:string, isOpenTimeout:boolean = true):void {
        if (AndroidSdk.isLocal){
            return;
        }
        if (name == null || name == '') {
            return ;
        }

        /** @type {string}  */
        var url:string;

        /** @type {string}   */
        var newUrl:string;

        var paramsStr:string = "";  

        if (name.toLocaleLowerCase().indexOf("http") == 0) { 
            url = name;
        } else {
            url = this.defaultUrl + name;
        }
        if (params) {
            paramsStr = this.getParamString(params);
            if (url.indexOf("?") > -1) {    
                newUrl = url + "&" + paramsStr;
            } else {
                newUrl = url + "?" + paramsStr;
            }
        } else {
            newUrl = url;
        }
        console.log("RequestUrl:" + newUrl);
        if (urls[newUrl] != null && reqparams[newUrl] == paramsStr) {
            warn(`地址[${url}]已正在请求中，不能重复请求`);
            return ;
        }

        var xhr = new XMLHttpRequest();

        urls[newUrl] = xhr;
        reqparams[newUrl] = paramsStr;

        if (isPost) {
            xhr.open("POST", url);
        } else {
            xhr.open("GET", newUrl);
        }

        for (const [key, value] of this.header) {
            xhr.setRequestHeader(key, value);
        }
        // xhr.setRequestHeader("Content-Type", "application/x-ww-form-urlencoded;charset=utf-8");
        // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        var data:any = {};
        data.url = url;
        data.params = params;

        var ret: HttpReturn = new HttpReturn();
        if (isOpenTimeout) {
            xhr.timeout = this.timeout;
            xhr.ontimeout = () => {
                this.deleteCache(newUrl);

                ret.isSucc = false;
                ret.err = HttpEvent.TIMEOUT; 
                onComplete(data);
            }
        }

        xhr.onloadend = () => {
            if (xhr.status == 500) {
                this.deleteCache(newUrl);

                ret.isSucc = false;
                ret.err = HttpEvent.NO_NETWORK;
                onComplete(ret);
            }
        }

        xhr.onerror = () => {
            this.deleteCache(newUrl);
            console.log("断网------------------" + xhr);
            ret.isSucc = false;
            if (xhr.readyState == 0 || xhr.readyState == 1 || xhr.status == 0) {
                ret.err = HttpEvent.NO_NETWORK;
            } else {
                ret.err = HttpEvent.UNKNOWN_ERROR;
            }
            onComplete(ret);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return ;

            this.deleteCache(newUrl);

            if (xhr.status == 200 && onComplete) {
                ret.isSucc = true;
                if (responseType == 'arraybuffer') {
                    xhr.responseType = responseType;
                    ret.res = xhr.response;
                } else {
                    ret.res = JSON.parse(xhr.response);
                }
                onComplete(ret);
            }
        }

        if (params == null || params == "") {
            xhr.send();
        } else {
            if (isPost) {
                if (AndroidSdk.isAndroid){
                    xhr.send(this.getParamBodyAndroid(params));
                }else{
                    xhr.send(this.getParamBody(params));
                }
            } else {
                xhr.send(paramsStr);
            }
        }
    }

    
    /**
     *
     * @private
     * @param {*} params
     * @return {*}
     * @memberof HttpRequest
     */
    private getParamString(params:any): string {
        var result = "";
        for (var name in params) {
            let data = params[name];
            if (data instanceof Object) {
                for (var key in data) {
                    result += `${key}=${data[key]}&`;
                }
            } else {
                result += `${name}=${data}&`;
            }
        }

        return result.substring(0, result.length - 1);
    }

    private getParamBodyAndroid(params: any): string {  
        let data = '';  
        for (let name in params) {  
            if (data !== '') {  
                data += '&';  
            }  
            let value = params[name];  
            data += encodeURIComponent(name) + '=' + encodeURIComponent(value);  
        }  
        return data;  
    }  

    private getParamBody(params:any):FormData {
        var data = new FormData();
        for (var name in params) {
            let value = params[name];
            data.append(name, String(value));
        }
        
        return data;
    }

    private deleteCache(url:string) {
        delete urls[url];
        delete reqparams[url];
    }
}

