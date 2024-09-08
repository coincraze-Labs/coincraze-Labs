import { _decorator, assetManager, Component, game, ImageAsset, Node, Sprite, SpriteFrame, Texture2D } from 'cc';
import { HttpClient } from './net/HttpClient';
import { randItemData, ShopItemData } from './LanauageManager';
import { GameFi } from '@ton/cocos-sdk';
const { ccclass, property } = _decorator;

@ccclass('gameData')
export class gameData extends Component {
    arrPosLevel: any[];
    arrTypeLevel: any[];

    public static saveData:SaveData = null;

    static wxProArr:number[] = [0.01, 0.1 , 1, 2];

    static wxLevelArr:number[] = [1,2,30,35];

    static isGuide:boolean = false;

    static date:Date = new Date();

    public static numBlockSum = 30;

    public static isChanllenge= false;

    public static isPlayMusic = true;

    public static isPlaySound = true;

    public static isBackNotShop = false;

    public static isCommonNoChallenge = false;

    public static curBuyShopData:ShopItemData;

    public static curBuyCount:number;

    public static levelSeconds:number = 0;

    public static refreshCoinTime:number = 0;

    public static isChanllengeShare = false;

    public static popupTipItemId:number = 0;

    //--------------------task--------------------

    public static isBindTwitter = false;

    public static isBindWallet = false;
    public static cocosGameFi:GameFi = null;

    public static saveDataClick(type:number = 2){
        //HttpClient.getInstance().sendPasLevel(gameData.saveData.addMoney, gameData.saveData.addGold, type);
        gameData.saveData.addGold = 0;
        gameData.saveData.addMoney = 0;
    }

    public static resetLevelData(){
        gameData.saveData.isOpen100Panel = [];
    }

    public static getShowLevel(level:number = -1):string{
        if (level == -1){
            level = gameData.saveData.curLevel;
        }
        var showLevel:string = (level).toString();
        return showLevel;
    }


//------------------------------------------------------------------------------------------------
    public static getInitNum(num:number, num2:number = 100):number{
        return Math.round(num*num2)/num2;
    }

    public static getArrivalTime(time:number){
        let arrival = time - Math.floor(Date.now()/1000);
        if (arrival < 0){
            arrival = 0;
        }
        return arrival;
    }

    public static getZeroTime():number{
        let now = new Date();  
        
        let utcNow = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());  
        let utcEndOfDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 24, 0, 0, 0); 
        
        // let noonToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0);  
   
        // if (now > noonToday) {  
        //     noonToday.setDate(noonToday.getDate() + 1);  
        // }  
        let hour = utcEndOfDay.getTime()
        let hour2 = utcNow.getTime()
        let diff = utcEndOfDay.getTime() - utcNow.getTime();  
  
        let seconds = Math.ceil(diff / 1000); 
        
        return seconds;
    }

    public static getLeftTime(diffSeconds:number): string{
        let hours = Math.floor( diffSeconds / 3600);  
        let minutes = Math.floor(( diffSeconds % 3600) / 60);  
        let secs =  diffSeconds % 60;  

        let h1 = (hours < 10) ? '0' + hours.toString() : hours.toString();  
        let m1 = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();  
        let s1 = (secs < 10) ? '0' + secs.toFixed(0) : secs.toFixed(0);  
        
        if (hours == 0){
            return  `${m1}:${s1}`;
        }
        if (hours == 0 && minutes == 0){
            return  `${s1}`;
        }
 
        return  `${h1}:${m1}:${s1}`;
    }

    public static getShowTime():string{
        let date = new Date();  
   
        let month = (date.getMonth() + 1)
        let day = date.getDate()
        let year = date.getFullYear()

        let h1 = (month < 10) ? '0' + month.toString() : month.toString();  
        let m1 = (day < 10) ? '0' + day.toString() : day.toString();  
        let s1 = (year < 10) ? '0' + year.toString() : year.toString();   
        
        return `${h1}:${m1}:${s1}`;
    }

    public static replaceHead(sp:Sprite, remoteUrl:string){
        if (remoteUrl == undefined || remoteUrl == null){
            return;
        }
        assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
            if (err){
                console.log("加载失败" + err);
                return;
            }
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            sp.spriteFrame = spriteFrame;
        });
    }

    
    public static getExpSum(): number{
        let level = gameData.saveData.curLevel;
        return (level+1)*100*0.6;
    }
//--------------------------------------------------------------------------------------------------
    start() {
        this.arrTypeLevel = [
            2,40,
        ]
        this.arrPosLevel = [];
        this.arrPosLevel[0] = [{x:-160,y:440},{x:-160,y:395},{x:0,y:440},{x:0,y:395},{x:160,y:440},{x:160,y:395},{x:-160,y:260},{x:-160,y:215},{x:0,y:260},{x:0,y:215},{x:160,y:260},{x:160,y:215}]
        // this.arrPosLevel[29] = [{x:0,y:35},{x:-160,y:350},{x:240,y:350},{x:240,y:80},{x:40,y:395},{x:-160,y:305},{x:-280,y:80},{x:-160,y:485},{x:-120,y:125},{x:-120,y:215},{x:-200,y:305},{x:280,y:125},{x:-240,y:125},{x:160,y:395},{x:-240,y:125},{x:160,y:215},{x:120,y:215},{x:200,y:80},{x:280,y:125},{x:0,y:395},{x:-80,y:395},{x:120,y:485},{x:-160,y:125},{x:280,y:350},{x:40,y:350},{x:160,y:350},{x:160,y:305},{x:120,y:440},{x:80,y:350},{x:200,y:440},{x:-280,y:350},{x:-80,y:305},{x:40,y:395},{x:40,y:80},{x:80,y:485},{x:240,y:305},{x:-160,y:260},{x:-240,y:35},{x:-120,y:305},{x:-40,y:350},{x:200,y:170},{x:-120,y:-10},{x:160,y:395},{x:240,y:125},{x:120,y:-10},{x:200,y:35},{x:120,y:305},{x:-80,y:-10},{x:-120,y:-10},{x:160,y:-10},{x:0,y:395},{x:-120,y:305},{x:240,y:35},{x:120,y:35},{x:-40,y:-55},{x:-80,y:485},{x:-200,y:80},{x:200,y:395},{x:-280,y:350},{x:-160,y:-10},{x:-80,y:305},{x:120,y:-55},{x:-80,y:-10},{x:-80,y:485},{x:-200,y:125},{x:160,y:305},{x:-40,y:350},{x:-200,y:395},{x:200,y:350},{x:40,y:35},{x:160,y:170},{x:-120,y:485},{x:-120,y:-55},{x:-160,y:305},{x:160,y:350},{x:160,y:-55},{x:-120,y:350},{x:160,y:80},{x:-240,y:125},{x:-160,y:215},{x:80,y:395},{x:200,y:215},{x:-80,y:440},{x:-200,y:350},{x:-120,y:170},{x:-160,y:35},{x:200,y:170},{x:-160,y:350},{x:0,y:35},{x:240,y:170},{x:280,y:35},{x:-200,y:305},{x:-120,y:395},{x:160,y:260},{x:0,y:35},{x:-160,y:260},{x:280,y:305},{x:280,y:395},{x:80,y:-55},{x:-160,y:170},{x:160,y:-55},{x:-200,y:350},{x:160,y:350},{x:-120,y:125},{x:240,y:35},{x:80,y:125},{x:200,y:305},{x:-40,y:80},{x:280,y:125},{x:-280,y:305},{x:-160,y:-10},{x:-40,y:35},{x:-160,y:440},{x:-240,y:395},{x:-280,y:80},{x:-200,y:35},{x:-160,y:395},{x:160,y:305},{x:-120,y:80},{x:280,y:350},{x:-160,y:440},{x:0,y:80},{x:-280,y:305},{x:-120,y:170},{x:-80,y:395},{x:-80,y:125},{x:-40,y:350},{x:240,y:350},{x:80,y:35},{x:120,y:-55},{x:-120,y:170},{x:-240,y:350},{x:-40,y:125},{x:-40,y:-10},{x:-280,y:125},{x:0,y:350},{x:-120,y:35},{x:-280,y:125},{x:80,y:440},{x:-200,y:350},{x:-120,y:-10},{x:-200,y:350},{x:-40,y:35},{x:240,y:350},{x:120,y:170},{x:160,y:-55},{x:-200,y:80},{x:200,y:125},{x:-120,y:35},{x:-160,y:350},{x:160,y:260},{x:240,y:350},{x:160,y:350},{x:240,y:35},{x:120,y:485},{x:-160,y:350},{x:-120,y:-10},{x:-160,y:440},{x:200,y:35},{x:80,y:485},{x:-120,y:260},{x:280,y:350},{x:120,y:170},{x:200,y:305},{x:120,y:35},{x:-160,y:170},{x:0,y:395},{x:120,y:-10},{x:200,y:125},{x:160,y:440},{x:80,y:350},{x:240,y:80},{x:160,y:440},{x:-200,y:80},{x:-80,y:-10},{x:0,y:80},{x:200,y:80},{x:80,y:35},{x:0,y:80},{x:160,y:440},{x:200,y:350},{x:80,y:80},{x:240,y:80},{x:-40,y:-10},{x:-80,y:485},{x:80,y:440},{x:-200,y:80},{x:240,y:125},{x:160,y:350},{x:160,y:35},{x:-160,y:440},{x:-160,y:35},{x:160,y:350},{x:-120,y:260},{x:120,y:125},{x:200,y:170},{x:160,y:170},{x:160,y:350},{x:80,y:-10},{x:160,y:125},{x:120,y:305},{x:80,y:35},{x:80,y:485},{x:-80,y:-55},{x:240,y:170},{x:-40,y:125},{x:160,y:-10},{x:-280,y:80},{x:160,y:215},{x:-240,y:35},{x:-40,y:-55},{x:80,y:125},{x:120,y:-55},{x:80,y:-10},{x:160,y:215},{x:240,y:35},{x:200,y:170},{x:-80,y:395},{x:-80,y:35},{x:120,y:485},{x:280,y:170},{x:80,y:80},{x:240,y:80},{x:160,y:-10},{x:-240,y:350},{x:160,y:80},{x:-80,y:-10},{x:-120,y:395},{x:-120,y:-55},{x:-40,y:125},{x:200,y:80},{x:-80,y:395},{x:-40,y:80},{x:200,y:125},{x:-120,y:350},{x:-120,y:440},{x:-40,y:80},{x:-120,y:35},{x:160,y:440},{x:-160,y:350},{x:80,y:80},{x:280,y:305},{x:-80,y:-55},{x:120,y:485},{x:-120,y:-10},
        //     {x:-280,y:305},{x:80,y:35},{x:-240,y:35},{x:-120,y:-10},{x:-120,y:-55},{x:-240,y:395},{x:120,y:-10},{x:-200,y:305},{x:-40,y:35},{x:160,y:-55},{x:80,y:-10},{x:-280,y:350},{x:-40,y:35},{x:-280,y:305},{x:-80,y:-55},{x:120,y:35},{x:-240,y:395},{x:-160,y:-10},{x:80,y:35},{x:-40,y:35},{x:160,y:-10},{x:-160,y:-55},{x:120,y:-55},{x:-40,y:35},{x:160,y:485},{x:-80,y:-55},{x:160,y:485},{x:-40,y:35},{x:160,y:-55},{x:120,y:-10},{x:160,y:35},{x:80,y:485},{x:120,y:-10},{x:160,y:-10},{x:-280,y:350},{x:80,y:-55},{x:80,y:485},{x:-280,y:125},{x:-280,y:305},{x:-160,y:-55},{x:160,y:35},{x:-80,y:-55},{x:-160,y:-10}
        //    ]
    }

    public static isSignToday(){
        return gameData.saveData.isSingToday == 1
    }

    getItemNumByLevel(level:number){
        var itemNum:number = gameData.saveData.initNum*3;
        var stageNum = this.getStageNum(level);

        if(this.arrPosLevel[stageNum]){
            itemNum = this.arrPosLevel[stageNum].length;
        }else{
            itemNum = itemNum + stageNum*gameData.saveData.stateNum*3;//9
        }

        var isBoss = this.getIsBoss(level);
        if (gameData.isChanllenge){
            itemNum = gameData.saveData.challengeNum*3;//90
        }
        else if (isBoss){
            itemNum += gameData.saveData.bossNum*3;//30
        }
        return itemNum;
    }

    getItemType(level:number){
        var typeNum = 2;
        var stageNum = this.getStageNum(level);

        typeNum = typeNum + stageNum * 3;
        
        var isBoss = this.getIsBoss(level);
        
        if (gameData.isChanllenge){
            typeNum = gameData.numBlockSum;
        }
        else if (isBoss){
            typeNum += 5;
        }

        return Math.min(typeNum, gameData.numBlockSum);
    }


    getStageNum(level:number){
        var stageNum = Math.floor((level-1)/5);
        return stageNum;
    }

    getIsBoss(level:number){
        var isBoss = (level)%5 == 0;
        return isBoss;
    }

    // public static setValue(key:any, value:any){
    //     var val = JSON.stringify(value);

    //     localStorage.setItem(key, val);
    // }

    // public static getValue(key):any{
    //     var data = localStorage.getItem(key);
    //     var val = null;
    //     if(data){
    //         val = JSON.parse(data);
    //     }
    //     return val;
    // }


}

export enum moneyType{
    money = 1,     
    gold = 2       
}

export enum getPanelType{
    pass = 1,      
    get = 2       
}

export enum popupLabType{
    challPopup = 1,      
    hpPopup = 2,
    hookPopup = 3,        
    offlineCardPopup = 4, 
    boostCardPopup = 5,  
    itemPopup = 6, 
    exp = 7, 
}

export enum popupCommonType{
    exit = 1,      
    disConnectTwitter = 2,   
    disConnectWalletr = 3,  
    offLineCoin = 4, 
    buy = 5,   
    connectTwitter = 6,
}

export enum coinType{
    coin1 = 1,      
    coin2 = 2,
    coin3 = 3,        
}

export class SaveData  {
    gold: number = 0;

    addMoney:number = 0;

    addGold:number = 0

    isOpen100Panel:number[] = [];


    //--------------------------------------------------------
    waitMoney:number = 0;

    playAdNum:number = 0;

    taskGetArr:number[] = [];

    lastSignTime:number = 0;

    isSingToday:number = 2;

    singDayNum:number = 0;

    registerDays:number = 0;

    wxoutNum:number = 0; 

    wxoutNumArr:number[] = []; 

    arrNumDJ:number[] = [0,0,0];

    wxName:string = "wxname";

    wxId:string = "";

    taskAdArr:number[] = [0,0,0];

    //-------------------------user-----------------------------------
    user_id:number = 0;

    userName:string;

    head:string;

    //-------------------------gameinfo-----------------------------------
    userLevel:number = 0;

    hpNum:number = 0;

    expNum:number = 0;

    coin: number = 0;

    addCoin: number = 0;

    coin2: number = 0;

    coin3: number = 0;

    offline_rewards:number = 0;

    boost_card_remaining_time:number = 0

    offline_card_remaining_time:number = 0;

     //-------------------------game-----------------------------------

    curLevel:number = 1;

    game_time_consuming:number = 0;

    //----------------------------task--------------------------------------

    isChallenged:boolean = false;

    backList:any[] = [];

    detail_task:number[] = [];

    daily_task:number[] = [];

    detail_task_isRecive:number[] = [];

    daily_task_isRecive:number[] = [];

    //-----------------------rank---------------------------------------------

    rankList:randItemData[] = [];

    selfRank:randItemData;

    invitId:string = "456SFGR1545SFGRA";

    inviteNum:number = 0;

    //------------------------------------------------------------

    initNum:number = 10;

    stateNum:number = 3;

    bossNum:number = 10;

    challengeNum:number = 30;

    tonPrice:number = 0;
}
