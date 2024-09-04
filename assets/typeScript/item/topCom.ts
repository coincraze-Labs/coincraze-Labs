import { _decorator, Component, Label, Node, ProgressBar, Sprite } from 'cc';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData } from '../gameData';
import { UIManager } from '../UIManager';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('topCom')
export class topCom extends Component {

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

    protected onEnable(): void {
        this.refresh();

        if (this.head.node.active){
            gameData.replaceHead(this.head,gameData.saveData.head);
        }
    }

    refresh(){
        
        if (this.levelPross.node.active){
            this.levelPross.progress = gameData.saveData.expNum / gameData.getExpSum();
        }

        if (this.levelLab.node.active){
            this.levelLab.string = gameData.saveData.userLevel.toString();
        }

        if (this.hpLab.node.active){
            this.hpLab.string = gameData.saveData.hpNum.toString();
        }

        if (this.coinLab.node.active){
            this.coinLab.string = gameData.saveData.coin.toString();
        }
    }

    shake(){

    }
}

