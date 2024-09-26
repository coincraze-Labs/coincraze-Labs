import { _decorator, Animation, AnimationClip, Color, color, Component, Label, Node, ProgressBar, resources, Sprite } from 'cc';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { LanauageManager } from '../LanauageManager';
import { EventManger } from '../EventManger';
import { UIManager } from '../UIManager';
import { blinkAnima } from '../animation/blinkAnima';
import { TgManager } from '../TgManager';
import { HttpClient } from '../net/HttpClient';
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
    userIdLab: Label = null;

    @property(Label)  
    userTwitterLab: Label = null;

    @property(Label)  
    userBagLab: Label = null;

    @property(Sprite)  
    userTwitterCon: Sprite = null;

    @property(Sprite)  
    userTwitterDis: Sprite = null;

    @property(Sprite)  
    userBagCon: Sprite = null;

    @property(Sprite)  
    userBagDis: Sprite = null;

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

    @property(Animation)  
    anim: Animation = null;

    @property(Node)  
    clearBtn: Node = null;

    @property(blinkAnima)  
    clearUnLock: blinkAnima = null;

    @property(Sprite)  
    clearLock: Sprite = null;

    @property(Label)  
    clearBtnLab: Label = null;

    diffSeconds:number = 0;

    timeoff:number = 1;

    timeSeconds:number = 1;

    static instance;

    protected start(): void {
        EventManger.eventTarget.on(EventManger.EEventName.BLINK_ANIMATION, this.blikAnima, this);

        this.scheduleOnce(this.loadAnimation, 5);
    }

    onEnable() {
        this.refresh();
        gameData.replaceHead(this.head, gameData.saveData.head);
    }

    update(deltaTime: number) {
        if (true){
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

    // 懒加载动画资源  
    loadAnimation() {  
        let animaPath = ""
        // 假设这是加载一个AnimationClip，具体取决于你的动画类型  
        resources.load("animation/newMain", AnimationClip, (err, clip) => {  
            if (err) {  
                console.error(err);  
                return;  
            }  
            if (this.anim){
                this.anim.addClip(clip); 
                this.anim.play(clip.name);  
            }
        });  
    }

    onBtnClick(event: Event, str:string){
        LanauageManager.playSound();
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
            if (gameData.saveData.isChallenged){
                EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(131));
                return;
            }
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
                this.scheduleOnce(()=>{
                    HttpClient.getInstance().sendGetTaskData();
                }, 0.3)
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
        else if (str == "expPopup"){
            LanauageManager.popupLabelType = popupLabType.exp
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
        else if (str == "copyUserId"){
            LanauageManager.copyText(gameData.saveData.user_id.toString());
        }
        else if (str == "clearBtn"){
            //LanauageManager.copyText(gameData.saveData.user_id.toString());
            if (gameData.saveData.userLevel < gameData.saveData.clear_level1){
                EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(135))
            }
            else if (gameData.saveData.userLevel >= gameData.saveData.clear_level2 || gameData.saveData.clear_isBuy || gameData.saveData.inviteNumFoever >=10){
                UIManager.open(UIManager.uiNamePath.popupClear2);
            }else{
                UIManager.open(UIManager.uiNamePath.popupClear1);
            }
        }
    }

    public refresh(){
        //this.clearUnLock.node.active = false;
        this.clearLock.node.active = false;
        this.clearBtnLab.string = LanauageManager.getDesStrById(134);
        if (gameData.saveData.userLevel < gameData.saveData.clear_level1){
            this.clearLock.node.active = true;
            this.clearBtnLab.color = new Color("#FFFFFF")
        }
        else if (gameData.saveData.userLevel >= gameData.saveData.clear_level2 || gameData.saveData.clear_isBuy || gameData.saveData.inviteNumFoever >=10){
            this.clearUnLock.stopAnima();
            this.clearBtnLab.color = new Color("#F0F060")
        }else{
            this.clearLock.node.active = true;
            this.clearBtnLab.color = new Color("#FFFFFF")
        }
        
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

        //this.chall.active = !gameData.saveData.isChallenged;

        this.userNameLab.string = LanauageManager.truncateString(gameData.saveData.userName);

        this.userIdLab.string = "UID:" + gameData.saveData.user_id.toString();

        this.userTwitterLab.string = gameData.isBindTwitter? LanauageManager.truncateString(gameData.bindTwitterName, 10, 2):"" //LanauageManager.getDesStrById( gameData.isBindTwitter? 63: 62 );

        this.userBagLab.string = gameData.isBindWallet? LanauageManager.truncateString(gameData.bindWalletName, 10, 2):""//LanauageManager.getDesStrById( gameData.isBindWallet ? 63: 62 );

        this.userTwitterCon.node.active = gameData.isBindTwitter?false:true;
        this.userTwitterDis.node.active = !this.userTwitterCon.node.active;

        this.userBagCon.node.active = gameData.isBindWallet? false: true;
        this.userBagDis.node.active = ! this.userBagCon.node.active;

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

