import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { gameData, popupCommonType } from '../gameData';
import { LanauageManager } from '../LanauageManager';
import { EventManger } from '../EventManger';
import { blinkAnima } from '../animation/blinkAnima';
import { UIManager } from '../UIManager';
const { ccclass, property } = _decorator;

@ccclass('levelView')
export class levelView extends Component {

    @property(Node)  
    bossAnima: Node = null; 

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
    challLab: Label = null;

    @property(Label)  
    stageLab: Label = null;


    onEnable() {
        this.refresh();
    }


    update(deltaTime: number) {
 
    }

    onBtnClick(event: Event, str:string){
        if (str == "backBtn"){
            LanauageManager.popupCommonlType = popupCommonType.exit;
            UIManager.open(UIManager.uiNamePath.popupCommonBtn);
            //EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, true);
        }
    }

    public refresh(){

        this.levelPross.progress = gameData.saveData.expNum / gameData.getExpSum();

        this.levelLab.string = gameData.saveData.userLevel.toString();

        this.hpLab.string = gameData.saveData.hpNum.toString();

        this.coinLab.string = gameData.saveData.coin.toString();

        this.stageLab.string = LanauageManager.getDesStrById(31) + gameData.getShowLevel() ;

        // this.chall.active = !gameData.saveData.isChallenged;

        this.challLab.string = LanauageManager.getDesStrById(10);

    }

    public playBossAnima(){
        this.bossAnima.active = true;
        this.bossAnima.getComponent(blinkAnima)?.startBlinkOne(()=>{
            this.bossAnima.active = false;
        });
    }
}

