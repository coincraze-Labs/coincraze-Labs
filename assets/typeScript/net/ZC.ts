import { _decorator, Component, Node } from 'cc';
import { HttpRequest } from './ZCHttpRequest';

const { ccclass, property } = _decorator;

export class zc {
    public static instance:zc = null;

    public static getInstance():zc{
        if (this.instance === null) {
            this.instance = new zc();
        }

        return this.instance;
    }

    public static http:HttpRequest = new HttpRequest();
}