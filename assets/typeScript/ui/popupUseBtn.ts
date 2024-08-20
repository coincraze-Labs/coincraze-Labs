import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('popupUseBtn')
export class popupUseBtn extends Component {

    @property(Label)  
    titleLab: Label = null; 

    @property(Sprite)  
    iconSp: Sprite = null; 

    private itemData:ShopItemData;

    private buyNum:number = 0;

    onEnable() {
        this.refresh()
    }

    update(deltaTime: number) {
        
    }

    refresh(){
        this.itemData = gameData.curBuyShopData;
        this.buyNum = gameData.curBuyCount;
        if (!this.itemData){
            return;
        }

        this.titleLab.string = LanauageManager.getDesStrById(32);
        LanauageManager.loadImage("image/shopItem/" + this.itemData.icon, this.iconSp);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onYesClick(){
        
    }
}

