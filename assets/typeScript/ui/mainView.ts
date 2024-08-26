import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { LanauageManager } from '../LanauageManager';
import { EventManger } from '../EventManger';
import { UIManager } from '../UIManager';
import { blinkAnima } from '../animation/blinkAnima';
import { TgManager } from '../TgManager';
const { ccclass, property } = _decorator;

@ccclass('mainView')
export class mainView extends Component {

    @property(Sprite)  
    head: Sprite = null; 

    @property(ProgressBar)  
    levelPross: ProgressBar = null; 

    @property(Label)  
    levelLab: Label = null; 

    @property(Label)  
    hpLab: Label = null; 

    @property(Label)  
    coinLab: Label = null; 

    @property(Node)  
    chall: Node = null;

    @property(Label)  
    challTimeLab: Label = null;

    @property(Node)  
    userInfo: Node = null;

    @property(Label)  
    userNameLab: Label = null;

    @property(Label)  
    userTwitterLab: Label = null;

    @property(Label)  
    userBagLab: Label = null;

    @property([Label])  
    labArr: Label[] = [];

    @property(blinkAnima)  
    coinBlink: blinkAnima = null;

    @property(blinkAnima)  
    expBlink: blinkAnima = null;

    @property(blinkAnima)  
    hpBlink: blinkAnima = null;

    @property(Node)  
    offLine: Node = null;

    @property(Label)  
    offLineLab: Label = null;

    @property(Node)  
    boost: Node = null;

    @property(Label)  
    boostLab: Label = null;

    diffSeconds:number = 0;

    timeoff:number = 1;

    timeSeconds:number = 1;

    protected start(): void {
        EventManger.eventTarget.on(EventManger.EEventName.BLINK_ANIMATION, this.blikAnima, this);

    }

    onEnable() {
        this.refresh();

    }

    update(deltaTime: number) {
        if (!gameData.saveData.isChallenged){
            if (this.diffSeconds <= 0){
                this.diffSeconds = gameData.getZeroTime();
            }
    
            if (this.diffSeconds >= 1){
                this.timeoff-=deltaTime;
                if (this.timeoff < 0){
                    this.timeoff = 1;
                    this.diffSeconds--;
  
                    // 更新 Label 的文本  
                    this.challTimeLab.string = gameData.getLeftTime(this.diffSeconds) + " RESET";  
                }
            }
        }

        this.timeSeconds -= deltaTime;
        if (this.timeSeconds < 0){
            this.timeSeconds = 1;
            this.coinLab.string = LanauageManager.getCoinNumString(gameData.saveData.coin);

            this.boost.active = gameData.getArrivalTime(gameData.saveData.boost_card_remaining_time) > 0;
            if (this.boost.active){
                this.boostLab.string = gameData.getLeftTime(gameData.getArrivalTime(gameData.saveData.boost_card_remaining_time));
            }  
        }
    }

    onBtnClick(event: Event, str:string){
        if (str == "task"){
            UIManager.open(UIManager.uiNamePath.taskView);
        }
        else if (str == "share"){
            gameData.isChanllengeShare = false;
            UIManager.open(UIManager.uiNamePath.popupShare);
        }
        else if (str == "range"){
            UIManager.open(UIManager.uiNamePath.rankView);
        }
        else if (str == "shop"){
            gameData.isBackNotShop = false;
            UIManager.open(UIManager.uiNamePath.shopView);
        }
        else if (str == "backpack"){
            gameData.isBackNotShop = true;
            UIManager.open(UIManager.uiNamePath.shopView);
        }
        else if (str == "setting"){
            UIManager.open(UIManager.uiNamePath.popupSeting);
        }
        else if (str == "challenge"){
            gameData.isChanllenge = true;
            EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, false);
        }
        else if (str == "play"){
            gameData.isChanllenge = false;
            EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, false);
        }
        else if (str == "head"){
            this.userInfo.active = !this.userInfo.active;
        }
        else if (str == "twitter"){
            if (gameData.isBindTwitter){
                LanauageManager.popupCommonlType = popupCommonType.disConnectTwitter;
                UIManager.open(UIManager.uiNamePath.popupCommonBtn);
            }else{
                TgManager.connectTwitter();
            }
        }
        else if (str == "moneyBag"){
            if (gameData.isBindWallet){
                LanauageManager.popupCommonlType = popupCommonType.disConnectWalletr;
                UIManager.open(UIManager.uiNamePath.popupCommonBtn);
            }else{
                TgManager.connectWallet();
            }
        }
        else if (str == "challPopup"){
            LanauageManager.popupLabelType = popupLabType.challPopup
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
        else if (str == "hpPopup"){
            LanauageManager.popupLabelType = popupLabType.hpPopup
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
        else if (str == "hookPopup"){
            LanauageManager.popupLabelType = popupLabType.hookPopup
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
        else if (str == "offlinePopup"){
            LanauageManager.popupLabelType = popupLabType.itemPopup;
            gameData.popupTipItemId = 2;
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
        else if (str == "bostPopup"){
            LanauageManager.popupLabelType = popupLabType.itemPopup;
            gameData.popupTipItemId = 1;
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
    }

    public refresh(){

        gameData.replaceHead(this.head, gameData.saveData.head);

        this.levelPross.progress = gameData.saveData.expNum / gameData.getExpSum();

        this.levelLab.string = gameData.saveData.userLevel.toString();

        this.hpLab.string = gameData.saveData.hpNum.toString();

        this.coinLab.string = LanauageManager.getCoinNumString(gameData.saveData.coin);

        let strIds:number[] = [4, 6, 5, 7, 10, 9, 8];
        for (let index = 0; index < this.labArr.length; index++) {
            const element:Label = this.labArr[index];
            if (element && strIds[index]){
                element.string = LanauageManager.getDesStrById(strIds[index]);
            }
        }

        this.chall.active = !gameData.saveData.isChallenged;

        this.userNameLab.string = gameData.saveData.userName;

        this.userTwitterLab.string = LanauageManager.getDesStrById( gameData.isBindTwitter? 63: 62 );

        this.userBagLab.string = LanauageManager.getDesStrById( gameData.isBindWallet ? 63: 62 );

        this.offLine.active = gameData.saveData.offline_card_remaining_time > 0;
        if (this.offLine.active){
            this.offLineLab.string = gameData.getLeftTime(gameData.saveData.offline_card_remaining_time);
        }
    }

    blikAnima(type:number){
        if (this.node.active){
            if (type == 1){
                this.coinBlink.startBlinkOne();
            }
            if (type == 2){
                this.hpBlink.startBlinkOne();
            }
            if (type == 3){
                this.expBlink.startBlinkOne();
            }
        }
    }
}

