import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { gameData, popupLabType } from '../gameData';
import { LanauageManager } from '../LanauageManager';
import { EventManger } from '../EventManger';
import { UIManager } from '../UIManager';
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

    @property(Label)  
    onhookLab: Label = null;

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

    diffSeconds:number = 0;

    timeoff:number = 1;

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
    }

    onBtnClick(event: Event, str:string){
        if (str == "task"){

        }
        else if (str == "share"){
            gameData.isChanllengeShare = false;
            UIManager.open(UIManager.uiNamePath.popupShare);
        }
        else if (str == "range"){

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
            
        }
        else if (str == "moneyBag"){

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
            LanauageManager.popupLabelType = popupLabType.offlineCardPopup
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
    }

    public refresh(){

        gameData.replaceHead(this.head);

        this.levelPross.progress = gameData.saveData.expNum / gameData.getExpSum();

        this.levelLab.string = gameData.saveData.userLevel.toString();

        this.hpLab.string = gameData.saveData.hpNum.toString();

        this.coinLab.string = gameData.saveData.coin.toString();

        let strIds:number[] = [4, 6, 5, 7, 10, 9, 8];
        for (let index = 0; index < this.labArr.length; index++) {
            const element:Label = this.labArr[index];
            if (element && strIds[index]){
                element.string = LanauageManager.getDesStrById(strIds[index]);
            }
        }

        this.chall.active = !gameData.saveData.isChallenged;

        this.userNameLab.string = gameData.saveData.wxName;

        this.userTwitterLab.string = LanauageManager.getDesStrById( gameData.isBindTwitter? 62: 61 );

        this.userBagLab.string = LanauageManager.getDesStrById( gameData.isBindTwitter? 62: 61 );

    }
}

