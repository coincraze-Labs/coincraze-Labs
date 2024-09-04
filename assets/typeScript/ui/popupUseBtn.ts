import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('popupUseBtn')
export class popupUseBtn extends Component {

    @property(Label)  
    titleLab: Label = null; 

    @property(Sprite)  
    iconSp: Sprite = null; 

    private itemData:ShopItemData;


    onEnable() {
        this.refresh()
    }

    update(deltaTime: number) {
        
    }

    refresh(){
        this.itemData = gameData.curBuyShopData;
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
        if (this.itemData.id == 5 || this.itemData.id == 6 || this.itemData.id == 7){
            EventManger.eventTarget.emit(EventManger.EEventName.USE_ITEM_SURE, this.itemData.id)
        }else{
            HttpClient.getInstance().sendUseItem(this.itemData.id);
        }
        this.onCloseClick();
    }
}

