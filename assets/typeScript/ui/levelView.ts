import { _decorator, Component, Label, Node, ProgressBar, Sprite, tween, Vec3 } from 'cc';
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

    @property(blinkAnima)  
    coinBlink: blinkAnima = null;

    @property(blinkAnima)  
    hpBlink: blinkAnima = null;

    @property(blinkAnima)  
    expBlink: blinkAnima = null;

    @property(Node)
    expyAni:Node = null;

    @property(Label)
    expyAniLab:Label = null;

    @property(Node)
    goldAni:Node = null;

    @property(Label)
    goldAniLab:Label = null;

    timeSeconds:number = 1;

    moneyPosY:number = 0

    goldPosY:number = 0

    protected start(): void {
        EventManger.eventTarget.on(EventManger.EEventName.BLINK_ANIMATION, this.blikAnima, this);

        //EventManger.eventTarget.on(EventManger.EEventName.ADD_COINANDEXP, this.upAnimation, this);

        this.moneyPosY = this.expyAni.position.y;
        
        this.goldPosY = this.goldAni.position.y;
    }

    onEnable() {
        this.refresh();

        this.bossAnima.active = false;
    }

    protected update(deltaTime: number): void {
        this.timeSeconds -= deltaTime;
        if (this.timeSeconds < 0){
            this.timeSeconds = 1;
            this.coinLab.string = LanauageManager.getCoinNumString(gameData.saveData.coin);
        }
    }

    onBtnClick(event: Event, str:string){
        LanauageManager.playSound();
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

        this.coinLab.string = LanauageManager.getCoinNumString(gameData.saveData.coin);

        this.stageLab.string = LanauageManager.getDesStrById(31) + " " + gameData.getShowLevel();

        // this.chall.active = !gameData.saveData.isChallenged;

        this.challLab.string = LanauageManager.getDesStrById(10);

    }

    public playBossAnima(){
        this.bossAnima.active = true;
        this.bossAnima.getComponent(blinkAnima)?.startBlinkOne(()=>{
            this.bossAnima.active = false;
        });
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

    upAnimation(addCoin:number, addExp:number){
        if (this.node.active){
            this.expyAni.position.set( this.expyAni.position.x, this.moneyPosY, this.expyAni.position.z)
            this.goldAni.position.set( this.goldAni.position.x, this.goldPosY, this.goldAni.position.z)
            if (addCoin > 0){
                this.goldAniLab.string = "+" + addCoin;
                this.upAnimationByNode(this.goldAni);
            }
            if (addExp > 0){
                this.expyAniLab.string = "+" + addExp;
                this.upAnimationByNode(this.expyAni);
            }
        }
    }

    upAnimationByNode(node:Node){
        node.active = true;
        tween(node)
            .to(1, {position: new Vec3(node.position.x, node.position.y + 80 , 0)})
            .call(() => {
                node.active = false;
            })
            .start()
        
    }
}

