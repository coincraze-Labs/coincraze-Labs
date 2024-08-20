import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('popupBuyItem')
export class popupBuyItem extends Component {

    @property(Label)  
    titllab1: Label = null; 

    @property(Label)  
    btn1_lab1: Label = null; 

    @property(Label)  
    btn1_lab2: Label = null; 

    @property(Label)  
    btn1_lab3: Label = null; 

    @property(Label)  
    btn2_lab1: Label = null; 

    @property(Label)  
    btn2_lab2: Label = null; 

    @property(Label)  
    btn2_lab3: Label = null; 

    @property(Label)  
    btn3_lab1: Label = null; 

    onEnable() {
        this.refresh()
    }

    refresh(){

        this.titllab1.string = LanauageManager.getDesStrById(65);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onBtn1Click(){

    }

    onBtn2Click(){
        
    }

    onBtn3Click(){
        
    }

}

