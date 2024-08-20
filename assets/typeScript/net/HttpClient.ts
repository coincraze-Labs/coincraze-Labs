import { director, error, log } from "cc";
import { zc } from "./ZC";
import { HttpReturn } from "./ZCHttpRequest";
import { SaveData, gameData } from "../gameData";
import { EventManger } from "../EventManger";
import { AndroidSdk } from "../AndroidSdk";

export class HttpClient {
    private httpTryCount = 10;  
    private httpTryNum = 0;     
    private static instance:HttpClient = null;
    public static getInstance():HttpClient {
        if(this.instance == null) {
            this.instance = new HttpClient();
        }

        return this.instance;
    }

    private constructor() {
        if ((window as any).user_token) {
            zc.http.addHeader("token",(window as any).user_token);
        }

        //zc.http.addHeader("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxIiwiaWF0IjoiMTcyMDUwNjc1MyIsIm5iZiI6IjE3MjA1MDY3NTMiLCJleHAiOiIxNzIwNTEzOTUzIiwiaXNzIjoidm9sLmNvcmUub3duZXIiLCJhdWQiOiJ2b2wuY29yZSIsIm9wZW5JZCI6IjU1NSIsInd4TmlrZU5hbWUiOiLmnb7mnb4xIn0.UdRs6PekPYMMkgXnTz8K1dAQtRkZQ6bDaNGW3-VJTrI");
    }

    sendLogin(code:string = "555songsong"){
        let params = {
            "code":code
        }
        if (AndroidSdk.isLocal){
            director.loadScene("game");
            return;
        }
        zc.http.post("api/XXL_GameInfo/WxLogin", this.onLogin.bind(this), params);
    }

    onLogin(res:HttpReturn){
        console.log("Login------------", res.res)
        if (res.res && res.res.code == "200"){
            if (res.res.data){
                gameData.saveData.coin = res.res.data.gameHome.money;
                gameData.saveData.gold = res.res.data.gameHome.gold;
                gameData.saveData.curLevel = res.res.data.gameHome.curLevel;
                gameData.saveData.arrNumDJ = res.res.data.gameHome.arrNumDJ;
                gameData.saveData.wxName = res.res.data.gameHome.wxNickName;
               
                AndroidSdk.isTempTest = res.res.data.gameHome.isOpenAcg;
                AndroidSdk.isAd = res.res.data.gameHome.isPlayAd;
                // AndroidSdk.isAd = false

                gameData.saveData.wxId =res.res.data.gameHome.userCode;

                console.log("userCode----------" + res.res.data.gameHome.userCode)

                var token = res.res.data.token;
                zc.http.addHeader("Authorization",token);
                //console.log("token----------" + token)
            }
            director.loadScene("game")
        }else{
            this.showFail("" , res.res? res.res.message: res.err)
        }
    }

    sendWxOutData(){
        if (AndroidSdk.isLocal){
            return;
        }
        zc.http.get("api/XXL_GameInfo/GetbalanceAndWxoutNumArr", this.onwxOutData.bind(this));
    }

    onwxOutData(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                gameData.saveData.coin = res.res.data.money;
                gameData.saveData.waitMoney = res.res.data.waitMoney;
                gameData.saveData.wxoutNum = res.res.data.wxoutNum;
                gameData.saveData.wxoutNumArr = res.res.data.wxoutNumArr;

                this.refreshView();
            }
        }else{
            this.showFail("sendWxOutData " , res.res.message)
        }
    }

    sendGoldOutData(){
        if (AndroidSdk.isLocal){
            return;
        }
        zc.http.get("api/XXL_GameInfo/GetGoldAndPlayAdNum", this.onGoldOutData.bind(this));
    }

    onGoldOutData(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                gameData.saveData.gold = res.res.data.gold;
                this.refreshView();
            }
        }else{
            this.showFail("sendGoldOutData " , res.res.message)
        }
    }

    sendTaskData(){
        zc.http.get("api/XXL_GameInfo/CurrentTaskMakeMoney", this.onTaskData.bind(this));
    }

    onTaskData(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                gameData.saveData.gold = res.res.data.gold;
                gameData.saveData.singDayNum = res.res.data.curSigninNum;
                gameData.saveData.playAdNum = res.res.data.curPlayAdNum;
                gameData.saveData.isSingToday = res.res.data.isCurSignin;
                gameData.saveData.taskGetArr = res.res.data.curPlayAdNumArr;
                gameData.saveData.registerDays = res.res.data.registerDays;
                gameData.saveData.taskAdArr = res.res.data.gearAdPlayArr;

                gameData.saveData.wxId = res.res.data.userCode;


                this.refreshView()
            }
        }else{
            this.showFail("sendTaskData " , res.res.message)
        }
    }

    sendLevelData(){
        if (AndroidSdk.isLocal){
            EventManger.eventTarget.emit(EventManger.EEventName.RESET_RESET_GAME);
            return;
        }
        zc.http.get("api/XXL_GameInfo/GameHome", this.onLevelData.bind(this));
    }

    onLevelData(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                gameData.saveData.coin = res.res.data.money;
                gameData.saveData.gold = res.res.data.gold;
                gameData.saveData.curLevel = res.res.data.curLevel;
                gameData.saveData.arrNumDJ = res.res.data.arrNumDJ;

                EventManger.eventTarget.emit(EventManger.EEventName.RESET_RESET_GAME);
            }
        }else{
            this.showFail("sendLevelData " , res.res.message)
        }
    }

    sendPasLevel(addMoney:number, addGold:number, type:number){
        let params = {
            "type":type,
            "Money":addMoney,
            "Gold":addGold
        }
        if (AndroidSdk.isLocal){
            if (type == 2){
                EventManger.eventTarget.emit(EventManger.EEventName.PASS_LEVEL_START);
            }
            return;
        }
        zc.http.post("api/XXL_GameInfo/AddMoneyOrGold", this.onPasLevel.bind(this), params);
    }

    onPasLevel(res:HttpReturn){
        if (res.res.code == "200"){
            gameData.resetLevelData();

            gameData.saveData.coin = res.res.data.money;
            gameData.saveData.gold = res.res.data.gold;
            gameData.saveData.curLevel = res.res.data.curLevel;
            gameData.saveData.arrNumDJ = res.res.data.arrNumDJ;

            EventManger.eventTarget.emit(EventManger.EEventName.PASS_LEVEL_START);
        }else{
            this.showFail("sendPasLevel " , res.res.message)
        }
    }

    sendUseItem(PropPos:number){
        let params = {
            "PropPos":PropPos,
        }
        if (AndroidSdk.isLocal){
            return;
        }
        zc.http.post("api/XXL_GameInfo/UpdateProp", this.onSendUseItem.bind(this), params);
    }

    onSendUseItem(res:HttpReturn){
        if (res.res.code == "200"){
            gameData.saveData.coin = res.res.data.money;
            gameData.saveData.gold = res.res.data.gold;
            gameData.saveData.curLevel = res.res.data.curLevel;
            gameData.saveData.arrNumDJ = res.res.data.arrNumDJ;

            this.refreshView();
        }else{
            this.showFail("sendPasLevel " , res.res.message)
        }
    }

    sendPlayAd(index:number = 0, gear:number = 0){
        let params = {
            "index":index,
            "gear":gear,
        }
        if (AndroidSdk.isLocal){
            return;
        }
        zc.http.post("api/XXL_GameInfo/AdPlayEnd", this.onsendPlayAd.bind(this), params);
    }

    onsendPlayAd(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                gameData.saveData.playAdNum = res.res.data.curPlayAdNum;
                gameData.saveData.taskAdArr = res.res.data.gearAdPlayArr;
            }
            this.refreshView()
        }else{
            this.showFail("sendLevelData " , res.res.message)
        }
    }

    sendSignToday(){
        zc.http.post("api/XXL_GameInfo/Signin", this.onSignToday.bind(this));
    }

    onSignToday(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                this.playAnimaTask(res.res.data.gold);

                gameData.saveData.gold = res.res.data.gold;
                gameData.saveData.singDayNum = res.res.data.curSigninNum;
                gameData.saveData.playAdNum = res.res.data.curPlayAdNum;
                gameData.saveData.isSingToday = res.res.data.isCurSignin;
                gameData.saveData.taskGetArr = res.res.data.curPlayAdNumArr;
                //gameData.saveData.registerDays = res.res.data.registerDays

                this.refreshView()
            }
        }else{
            this.showFail("sendTaskData " , res.res.message)
        }
    }

    sendGetTaskReard(index:number){
        let params = {
            "index":index,
        }
        zc.http.post("api/XXL_GameInfo/GoMakeMoney", this.onGetTaskReard.bind(this), params);
    }

    onGetTaskReard(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data){
                this.playAnimaTask(res.res.data.gold);
                gameData.saveData.gold = res.res.data.gold;
                gameData.saveData.singDayNum = res.res.data.curSigninNum;
                gameData.saveData.playAdNum = res.res.data.curPlayAdNum;
                gameData.saveData.isSingToday = res.res.data.isCurSignin;
                gameData.saveData.taskGetArr = res.res.data.curPlayAdNumArr;
                //gameData.saveData.registerDays = res.res.data.registerDays

                this.refreshView()
            }
        }else{
            this.showFail("sendGetTaskReard " , res.res.message)
        }
    }

    sendOutBytype(type:number){
        let params = {
            "type":type
        }
        zc.http.post("api/XXL_GameInfo/Withdrawal", this.onOutBytype.bind(this), params);
        
    }

    onOutBytype(res:HttpReturn){
        if (res.res.code == "200"){
            if (res.res.data.withdrawalAmount != undefined){
                EventManger.eventTarget.emit(EventManger.EEventName.OUT_SUCCESS_PANEL, res.res.data.withdrawalAmount);
            }
            if (res.res.data.money != undefined){
                gameData.saveData.coin = res.res.data.money;
                gameData.saveData.waitMoney = res.res.data.waitMoney;
                gameData.saveData.wxoutNum = res.res.data.wxoutNum;
                gameData.saveData.wxoutNumArr = res.res.data.wxoutNumArr;
            }else if(res.res.data.gold != undefined){
                gameData.saveData.gold = res.res.data.gold;
            }

            this.refreshView();
            
        }else{
            this.showFail("sendOutBytype " , res.res.message)
        }
    }

    playAnimaTask(gold:number){
        var addGold = Math.max(0, gold - gameData.saveData.gold);
        EventManger.eventTarget.emit(EventManger.EEventName.PLAY_ANIMATION_TASK, addGold);
    }

    refreshView(){
        EventManger.eventTarget.emit(EventManger.EEventName.REFRESH_GAME);
    }

    showFail(str:string,  message:string) {
        EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, (str + message))
    }

}

