import { director, error, log, sys } from "cc";
import { zc } from "./ZC";
import { HttpReturn } from "./ZCHttpRequest";
import { SaveData, gameData } from "../gameData";
import { EventManger } from "../EventManger";
import { AndroidSdk } from "../AndroidSdk";
import { LanauageManager } from "../LanauageManager";
import { UIManager } from "../UIManager";
import { TgManager } from "../TgManager";

export class HttpClient {
    private httpTryCount = 10;  
    private httpTryNum = 0;     
    private static instance:HttpClient = null;
    private isInit:boolean = true;

    private isShowTip:boolean = true;

    private rankTime:number[] = [0,0,0,0];

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

    sendLogin(user_id:number = 1111111, first_name:string = "11", last_name:string = "22", shared_id:string = null){
        let params = {
            "user_id":user_id,
            "first_name":first_name,
            "last_name":last_name, 
            "shared_id":shared_id,
            //"platform":sys.platform,
        }
        if (AndroidSdk.isLocal){
            return;
        }
        this.isInit = true;
        LanauageManager.isInitData = false;
        console.log("Platform", sys.platform);
        //TgManager.downloadTextFile("Platform", sys.platform);
        zc.http.post("api/user", this.onLogin.bind(this), params);
    }

    onLogin(res:HttpReturn){
        
        console.log("Login------------", res.res)
        if (res.res && res.res.code == "200"){
            if (res.res.data){
                let data = res.res.data;
                if (data.user){
                    gameData.saveData.user_id = data.user.user_id;
                    gameData.saveData.userName = data.user.username;
                    gameData.saveData.head = data.user.avatar;
                }
                if (data.task){
                    LanauageManager.taskConfig = data.task;
                }
                if (data.property){
                    LanauageManager.shopConfig = data.property;
                }

                if (data.gameinfo){
                    if (data.gameinfo.level != undefined){
                        if (!this.isInit && data.gameinfo.level > gameData.saveData.userLevel){
                            gameData.saveData.userLevel = data.gameinfo.level;
                            UIManager.open(UIManager.uiNamePath.levelUp)
                        }
                        gameData.saveData.userLevel = data.gameinfo.level;
                    }
                    if (data.gameinfo.live != undefined){
                        if (!this.isInit && data.gameinfo.live > gameData.saveData.hpNum){
                            EventManger.eventTarget.emit(EventManger.EEventName.BLINK_ANIMATION, 2);
                        }
                        gameData.saveData.hpNum = data.gameinfo.live;
                    }
                    if (data.gameinfo.exp != undefined){
                        if (!this.isInit && data.gameinfo.exp > gameData.saveData.expNum){
                            EventManger.eventTarget.emit(EventManger.EEventName.BLINK_ANIMATION, 3);
                        }
                        gameData.saveData.expNum = data.gameinfo.exp;
                    }
                    if (data.gameinfo.coin != undefined){
                        if (!this.isInit && data.gameinfo.coin > gameData.saveData.coin){
                            EventManger.eventTarget.emit(EventManger.EEventName.BLINK_ANIMATION, 1);
                        }
                        //gameData.refreshCoinTime = 0;
                        gameData.saveData.coin = data.gameinfo.coin;
                    }
                    if (data.gameinfo.coin_up_s){
                        gameData.saveData.addCoin = data.gameinfo.coin_up_s
                    } 
                    if (data.gameinfo.offline_rewards){
                        gameData.saveData.offline_rewards = data.gameinfo.offline_rewards;
                    }
                    if (data.gameinfo.boost_card_expire_time != undefined){
                        gameData.saveData.boost_card_remaining_time = data.gameinfo.boost_card_expire_time;
                    }   
                    if (data.gameinfo.offline_card_remaining_time != undefined){
                        gameData.saveData.offline_card_remaining_time = data.gameinfo.offline_card_remaining_time;
                    }  

                    if (data.gameinfo.coin_up > 0 || data.gameinfo.exp_up > 0){
                        EventManger.eventTarget.emit(EventManger.EEventName.ADD_COINANDEXP, data.gameinfo.coin_up, data.gameinfo.exp_up);
                    } 

                    if (data.gameinfo.share_id != undefined){
                        gameData.saveData.invitId = data.gameinfo.share_id;
                    }

                    if (data.gameinfo.checkpoint_detail != undefined){
                        gameData.saveData.curLevel = data.gameinfo.checkpoint_detail;
                    }

                    if (data.gameinfo.daily_pass_num != undefined){
                        gameData.saveData.daily_pass_num = data.gameinfo.daily_pass_num;
                    }

                    if (data.gameinfo.tt_name != undefined){
                        gameData.bindTwitterName = data.gameinfo.tt_name;

                        gameData.isBindTwitter = data.gameinfo.tt_name == "no" ? false: true;
                    }
                    if (data.gameinfo.sweep_status != undefined){
                        gameData.saveData.clear_isBuy = data.gameinfo.sweep_status == 1
                    }
                    if (data.gameinfo.sweep_price != undefined){
                        gameData.saveData.clear_money = data.gameinfo.sweep_price;
                    }
                    if (data.gameinfo.sweep_N != undefined){
                        gameData.saveData.clear_level1 = data.gameinfo.sweep_N
                    }
                    if (data.gameinfo.sweep_M != undefined){
                        gameData.saveData.clear_level2 = data.gameinfo.sweep_M
                    }

                    if (data.gameinfo.share_rank_num != undefined){
                        gameData.saveData.inviteNumFoever = data.gameinfo.share_rank_num;
                    }
                    if (data.gameinfo.wallet_addr != undefined){
                        gameData.bindWalletNameShow = data.gameinfo.wallet_addr;
                    }

                }

                if (data.game){
                    if (data.game.checkpoint_detail){
                        gameData.saveData.curLevel = data.game.checkpoint_detail;
                    }
                    if (data.game.game_time_consuming != undefined){
                        gameData.saveData.game_time_consuming = data.game.game_time_consuming;
                    }
                }

                if (data.backpack){
                    gameData.saveData.backList = data.backpack;
                }

                if (data.task_done){
                    if (data.task_done.detail_task){
                        gameData.saveData.detail_task_isRecive = data.task_done.detail_task;
                    }
                    if (data.task_done.daily_task){
                        gameData.saveData.daily_task_isRecive = data.task_done.daily_task;
                    }
                }

                if (data.task_get){
                    if (data.task_get.detail_task){
                        gameData.saveData.detail_task = data.task_get.detail_task;
                    }
                    if (data.task_get.daily_task){
                        gameData.saveData.daily_task = data.task_get.daily_task;
                    }

                    if (data.task_get.package_task){
                        gameData.saveData.special_reward = data.task_get.package_task;
                    }

                    gameData.saveData.isChallenged = LanauageManager.getTaskIsComplete(15);

                    //gameData.isBindTwitter = LanauageManager.getTaskIsComplete(3);

                    //gameData.isBindWallet = LanauageManager.getTaskIsComplete(1);
                }

                if (data.game_detail){

                    gameData.refreshCoinTime = data.game_detail.update_datetime;
                    gameData.saveData.initNum = data.game_detail.initNum;
                    gameData.saveData.stateNum = data.game_detail.stateNum;
                    gameData.saveData.bossNum = data.game_detail.bossNum;
                    gameData.saveData.challengeNum = data.game_detail.challengeNum;

                    gameData.saveData.passRewardout =  data.game_detail.checkpoint_type_out;
                    gameData.saveData.passRewardin =  data.game_detail.checkpoint_type_in;
                    gameData.saveData.up_coin_out =  data.game_detail.up_out;
                    gameData.saveData.up_coin_in =  data.game_detail.up_in;

                    TgManager.repostTwitterUrl = data.game_detail.tweet_url;
                }

                if (data.personal_detail){
                    gameData.isPlayMusic = data.personal_detail.music_on;
                    gameData.isPlaySound = data.personal_detail.audio_on;
                }

                if (data.invite_num != undefined){
                    gameData.saveData.inviteNum = data.invite_num;
                }
                
                //var token = res.res.data.token;
                //zc.http.addHeader("Authorization",token);
                //console.log("token----------" + token)
            }
            if (this.isInit && LanauageManager.isLoad){
                director.loadScene("game")
            }
            this.isInit = false;
            LanauageManager.isInitData = true;
            this.refreshView();
        }else{
            if (this.isInit){
                this.showFail("111" , "Network error, login failed")
            }
            this.showFail("" , res.res? res.res.msg: res.err)
        }
    }
    //infoType 0 begin level,1 remove success ,2 pass level   checkpoint_type: 0 common, 1 challenge
    sendLevelByType(type:number){
        let levelType = gameData.isChanllenge ? 1 : 0;
        let params = {
            "user_id":gameData.saveData.user_id,
            "info_type":type,
            "checkpoint_type":levelType
        }
        zc.http.post("api/updateinfo", this.onLogin.bind(this), params);
    }

    sendReceiveOffReward(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/offline", this.onLogin.bind(this), params);
    }

    sendUseItem(id:number, isShowTip:boolean = true){
        let params = {
            "user_id":gameData.saveData.user_id,
            "card_id":id
        }
        this.isShowTip = isShowTip;
        zc.http.post("api/usecard", this.onUseItem.bind(this), params);
    }

    onUseItem(res:HttpReturn){
        this.onLogin(res);
        if (res.res && res.res.code == "200"){
            if (this.isShowTip){
                this.showFail("111", LanauageManager.getDesStrById(127));
            }
        }else{
            this.showFail("" , res.res? res.res.msg: res.err)
        }
    }

    sendBuyShopItem(id:number, num:number = 1){
        let params = {
            "user_id":gameData.saveData.user_id,
            "proprety_id":id,
            "pay_num":num,
        }
        zc.http.post("api/shoppay", this.onBuyShopItem.bind(this), params);
    }

    onBuyShopItem(res:HttpReturn){
        this.onLogin(res);
        if (res.res && res.res.code == "200"){
            this.showFail("111", LanauageManager.getDesStrById(108));
        }else{
            this.showFail("" , res.res? res.res.msg: res.err)
        }
    }

    sendRefreshCoin(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/detail", this.onLogin.bind(this), params);
    }

    sendReceiveTaskReward(taskId:number){
        let params = {
            "user_id":gameData.saveData.user_id,
            "task_id":taskId,
        }
        zc.http.post("api/task", this.onReceiveTaskReward.bind(this), params);
    }

    onReceiveTaskReward(res:HttpReturn){
        this.onLogin(res);
        if (res.res && res.res.code == "200"){
            this.showFail("111", LanauageManager.getDesStrById(45));
        }
    }

    sendGetTaskData(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/tasklist", this.onLogin.bind(this), params);
    }

    sendGetRankData(type:number){
        let params = {
            "user_id":gameData.saveData.user_id,
            "type":type
        }
        // let time = new Date().getTime()/1000;
        // if (this.rankTime[type] + 10 > time ){
        //     return;
        // }
        // this.rankTime[type] = time;
        zc.http.post("api/ranking", this.onRankData.bind(this), params);
    }

    onRankData(res:HttpReturn){
        if (res.res && res.res.code == "200"){
            if (res.res.self_rank){
                gameData.saveData.selfRank[res.res.rank_type] = res.res.self_rank;
            }
            if (res.res.count){
                gameData.saveData.allPlayNum = res.res.count;
            }
            if (res.res.all_rank){
                gameData.saveData.rankList[res.res.rank_type] = res.res.all_rank;
            }
            this.refreshView();
        }else{
            this.showFail("api/ranking " , res.res.msg)
        }
    }

    sendChangePersion(type:number){
        let params = {
            "user_id":gameData.saveData.user_id,
            "detail_type":type
        }
        zc.http.post("api/changepersonaldetail", this.onLogin.bind(this), params);
    }

    sendDailyshare(){

        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/dailyshare", this.onLogin.bind(this), params);
    }

    sendDailyinvite(){

        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/dailyinvite", this.onLogin.bind(this), params);
    }

    sendDailyrepost(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/dailyrepost", this.onLogin.bind(this), params);
    }

    sendVisitwebsite(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/visitwebsite", this.onLogin.bind(this), params);
    }

    sendTonPrice(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/tounsdt", this.onsendTonPrice.bind(this), params);
    }

    onsendTonPrice(res:HttpReturn){
        if (res.res){
            gameData.saveData.tonPrice = res.res.price;
            this.refreshView();
        }
    }

    sendTwiteer(type:number){
        let params = {
            "user_id":gameData.saveData.user_id,
            "x_type":type,
        }
        zc.http.post("api/xback", this.onLogin.bind(this), params);
    }

    sendWallet(type:number, address:string = ""){
        let params = {
            "user_id":gameData.saveData.user_id,
            "x_type":type,
            "wallet_addr":address,
        }
        zc.http.post("api/mback", this.onLogin.bind(this), params);
    }

    sendJoinCommunity(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/joincommunity", this.onLogin.bind(this), params);
    }

    sendPremium(premium:Number, userid:number = 0){
        let params = {
            "user_id": userid == 0 ? gameData.saveData.user_id:userid,
            "is_premium":premium,
        }
        zc.http.post("api/premium", this.onsendPremium.bind(this), params);
    }

    onsendPremium(res:HttpReturn){

    }

    sendGetinvoiceLink(name:string, stars:number){
        let params = {
            "user_id":gameData.saveData.user_id,
            "description":name,
            "amount": stars
        }
        zc.http.post("api/creat_link", this.onSendGetinvoiceLink.bind(this), params);
    }

    onSendGetinvoiceLink(res:HttpReturn){
        if (res.res && res.res.code == "200"){
            EventManger.eventTarget.emit(EventManger.EEventName.OPEN_STAR_BUY, res.res.invoice_link);
        }
    }

    sendGetTTName(){
        let params = {
            "user_id":gameData.saveData.user_id,
        }
        zc.http.post("api/ttname", this.onLogin.bind(this), params);
    }


    refreshView(){
        EventManger.eventTarget.emit(EventManger.EEventName.REFRESH_GAME);
    }

    showFail(str:string,  msg:string) {
        if (str == "111"){
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, msg)
        }
    }

}

