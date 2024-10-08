import { _decorator, assetManager, Component, director, game, Label, loader, native, Node, ProgressBar, resources, RichText, sys, System, Toggle, tween, UITransform, Vec3 } from 'cc';
import { AndroidSdk } from './AndroidSdk';
import { HttpClient } from './net/HttpClient';
import { gameData, SaveData } from './gameData';
import { EventManger } from './EventManger';
import { TgManager, TonAddressConfig } from './TgManager';
import { UIManager } from './UIManager';
import { TelegramWebApp } from '../cocos-telegram-miniapps/scripts/telegram-web';
import { LanauageManager } from './LanauageManager';
const { ccclass, property } = _decorator;

@ccclass('login')
export class login extends Component {

    @property(Toggle)
    isCheck:Toggle

    @property(Node)
    userTip:Node

    @property(Node)
    ageTip:Node

    @property(Node)
    seTip:Node

    @property(Node)
    nodeTip:Node

    @property(RichText)
    rich:RichText

    @property(RichText)
    rich2:RichText

    @property(ProgressBar)
    loadPross:ProgressBar

    @property(Label)
    loadLab:Label

    isneed:boolean = true;

    static instance;

    start() {

        gameData.saveData = new SaveData();
        // director.preloadScene("game");
        EventManger.eventTarget.on(EventManger.EEventName.SHOW_TIP, this.showTip, this);

        //var checked = localStorage.getItem("game_isChecded");
        // this.isCheck.isChecked = false; //checked == "true";
        // if (AndroidSdk.isTempTest){
        //     this.seTip.active = true;
           
        // }else{
        //     this.isCheck.node.active = false;
        //     this.isCheck.isChecked = true;
        //     this.rich2.node.active = false;
        //     if (AndroidSdk.isAndroid){
        //         native.bridge.sendToNative("userAgree", "defaultAdUrl");
        //     }
        // }
        this.loadPross.progress = 0
        this.loginRequest();

        // const element = document.documentElement; // 通常是 <html> 元素  
        // if (element && element.requestFullscreen) {  
        //     element.requestFullscreen();  
        // }  

        TelegramWebApp.Instance.init().then(res => {
            console.log("telegram web app init : ", res.success);
        });

    }


    showStr(): void {
        if (this.isneed){
            this.scheduleOnce(() => {
                this.rich.string = this.userStr;
            }, 1)
            this.isneed = false;
        }
    }

    btnClick(event:Event, str:string){
        if (str == "openUser"){
            this.seTip.active = false;
            this.userTip.active = true;
            //sys.openURL("http://111.229.126.145:8098/privacy-policy.html");
        }
        else if (str == "openAgeTip"){
            this.ageTip.active = true;
        }

        else if (str == "agreeUser"){
            //this.isCheck.isChecked = true;
            this.userTip.active = false;
            this.seTip.active = false;
        }
        else if (str == "exit"){
            this.isCheck.isChecked = false;
            this.userTip.active = false;
            this.seTip.active = false;

            if (AndroidSdk.isAndroid){
                native.bridge.sendToNative("exit", "defaultAdUrl");
            } 
        }
        else if (str == "login"){
            //请求登录
            if(this.isCheck.isChecked){
                //localStorage.setItem("game_isChecded", "true");
                this.loginRequest();
            }else{
                this.userTip.active = true;
                //localStorage.setItem("game_isChecded", "false");
            }
        }
        else if (str == "userAgree"){
            if (AndroidSdk.isAndroid){
                native.bridge.sendToNative("userAgree", "defaultAdUrl");
            }
        }

        if (this.userTip.active){
            //this.showStr();
        }
    }

    loginRequest(){
        //AndroidSdk.wxLogin();
        TgManager.processURLParameters();

        tween(this.loadPross)
        .to(30,{progress:0.8}, { easing: 'quadIn' })
        // .to(50,{progress:0.95}, { easing: 'quadIn' })
        // .to(100,{progress:1}, { easing: 'quadIn' })
        .start();
        
        login.instance = this;
        //director.loadScene("game")  
        resources.preloadDir("ui", ()=>{
            console.log("preload ui success")
            if (LanauageManager.isInitData){
                director.loadScene("game", this.onComplete2) 
                //director.loadScene("text", this.onComplete2) 
            }
            this.onComplete(); 
            //director.preloadScene("game", this.onComplete)
        })
         
    }

    onComplete2() {  
        console.log("preload game success")
    }
      
    onComplete() {  
        //console.log("preload game success")
        LanauageManager.isLoad = true;
        tween( login.instance.loadPross).stop();
        tween( login.instance.loadPross)
        .to(3,{progress:0.8})
        .to(30,{progress:0.95})
        .to(200,{progress:1})
        .start();

        // if (LanauageManager.isInitData){
        //     director.loadScene("game", ()=>{
        //         console.log("load game success")
        //     })  
        // }else{
        //     //login.instance.showTip("Network error, login failed")
        // }
    } 

    update(deltaTime: number) {
        
    }

    showTip(str){
        this.nodeTip.getChildByName('Label').getComponent(Label).string = str
        tween(this.nodeTip)
            .to(0.1,{scale:new Vec3(1,1,1)})
            .delay(3)
            .to(0.1,{scale:new Vec3(0,0,0)})
            .start()
    }

    protected onDestroy(): void {
        EventManger.eventTarget.off(EventManger.EEventName.SHOW_TIP, this.showTip, this);
    }


    userStr:string = "";
}

