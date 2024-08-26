import { _decorator, Component, EventTarget, Node, resources, Sprite, SpriteFrame } from 'cc';
import { coinType, gameData } from './gameData';
import { HttpClient } from './net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('TgManager')
export class TgManager {

    public static connectTwitter(){

    }

    public static disConnectTwitter(){
        
    }

    public static followTwitter(){

    }

    public static connectWallet(){

    }

    public static disConnectWalletr(){
        
    }

    public static addTelegram(){

    }

    public static visitWebsite(){

    }

    public static share(){

    }

    public static invite(){
        
    }

    public static processURLParameters() {  
        const url = window.location.href;  

        const queryString = url.split('?')[1];  

        if (!queryString) {  
            HttpClient.getInstance().sendLogin();
            console.log("no parameter");
            return;  
        }  
      
        const params: { [key: string]: string } = {};  
      
        queryString.split('&').forEach(pair => {   
            const [key, value] = pair.split('=');  
      
            const decodedKey = decodeURIComponent(key);  
            const decodedValue = decodeURIComponent(value || '');  
       
            params[decodedKey] = decodedValue;  
        });  
  
        const userID = params['UserID'];  
      
        if (userID) {  
            HttpClient.getInstance().sendLogin(userID);
            console.log(`UserID: ${userID}`);  
        } else {  
            HttpClient.getInstance().sendLogin();
            console.log('no userId');  
        }  
    }  

}
