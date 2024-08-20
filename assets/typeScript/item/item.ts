import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData } from '../gameData';
import { UIManager } from '../UIManager';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('item')
export class item extends Component {

    @property(Sprite)  
    iconSp: Sprite = null; 

    @property(Label)  
    nameLab: Label = null;

    @property(Label)  
    numLab: Label = null;

    private itemData:ShopItemData

    protected onEnable(): void {

    }

    refresh(data:any, num:number){
        if (!data){
            return;
        }
        this.itemData = data;
        LanauageManager.loadImage("image/shopItem/" + this.itemData.icon, this.iconSp);

        this.nameLab.string = LanauageManager.getDesStrById(this.itemData.nameId);

        this.numLab.string = num.toString();
    }


}

