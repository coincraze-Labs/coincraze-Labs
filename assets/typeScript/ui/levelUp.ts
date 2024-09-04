import { _decorator, AudioSource, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('levelUp')
export class levelUp extends Component {

    @property(Label)  
    levelLab: Label = null; 

    onEnable() {
        this.refresh()
    }


    refresh(){

        this.levelLab.string = gameData.saveData.userLevel.toString();

    }

    onBackClick(){
        LanauageManager.playSound();
        UIManager.close(this.node);
    }
}

