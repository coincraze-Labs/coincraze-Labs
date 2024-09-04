import { _decorator, Component, native, Node, System } from 'cc';
import { gameData, popupCommonType } from './gameData';
import { HTML5, JSB, NATIVE } from 'cc/env';
import { HttpClient } from './net/HttpClient';
import { EventManger } from './EventManger';
import { LanauageManager } from './LanauageManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('AndroidSdk')
export class AndroidSdk  {
    public static isLocal = false;

    public static isAndroid =  NATIVE

    public static  callBack:Function= null;

    public static index:number = -1;

    public static gear:number = -1;

    public static isTempTest:boolean = false;

    public static isPingbi:boolean = false;

    public static isAd:boolean = true;

    public static isPlaying:boolean = false;
    public static playAd(call:Function = null, gear:number = -1, index:number = -1){

        if (this.isPlaying){
            return;
        }
        this.index = index;
        this.gear = gear;
        setTimeout(() =>{
            this.isPlaying = false;
        }, 2000);
        this.isPlaying = true;
        this.callBack = call;
        if (AndroidSdk.isAndroid && AndroidSdk.isAd){
            native.bridge.sendToNative("playAd", "defaultAdUrl");
        }else{
            this.wxLoginResult("playAd", null);
        }
    }

    public static playAdAddItem(index:number){
        LanauageManager.popupCommonlType = popupCommonType.buy;
        UIManager.open(UIManager.uiNamePath.popupCommonBtn);
        //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(84));
        //this.playAd(null, -1, index);
    }

    public static outToWx(type:number){
        //HttpClient.getInstance().sendOutBytype(type);
    }


     public static wxLogin() {
        console.log("wxLogin");
        if (AndroidSdk.isAndroid){
            native.bridge.onNative = (animationName: string, code: string | null):void=>{
                this.wxLoginResult(animationName, code);
                return;
            }
            native.bridge.sendToNative("login", "defaultAdUrl");
        }else{
            HttpClient.getInstance().sendLogin();
        }
    }
 
    public static wxLoginResult(usrName:string, errCode:string) {
        return;
        if (usrName == "login"){
            console.log("wxLoginResultcode=" + errCode)
            HttpClient.getInstance().sendLogin()
        }
        
        else if (usrName == "playAd"){

            console.log("usrName  =" + usrName)
            gameData.saveData.playAdNum++;
            if (this.index >= 0 && this.index <= 2){
                gameData.saveData.arrNumDJ[this.index]++;
            }
            if(this.gear >= 1 && this.gear <= 3){
                gameData.saveData.taskAdArr[this.gear - 1]++;
            }
            EventManger.eventTarget.emit(EventManger.EEventName.REFRESH_GAME);
            //HttpClient.getInstance().sendPlayAd(this.index + 1, this.gear);
            if(this.callBack){
                this.callBack();   
            }

            this.callBack = null;
            this.index = -1;
            this.gear = -1;
        }

        else if (usrName == "showTip"){
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, "广告错误" + errCode);
        }
    }
}

