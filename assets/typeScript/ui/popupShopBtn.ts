import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('popupShopBtn')
export class popupShopBtn extends Component {

    @property(Sprite)  
    coinSp: Sprite = null; 

    @property(Label)  
    titleLab: Label = null; 

    @property(Label)  
    desLab: Label = null; 

    @property(Label)  
    coinLab: Label = null; 

    private itemData:ShopItemData;

    private buyNum:number = 0;

    onEnable() {
        this.refresh()

        this.desLab.node.active = false;
    }

    update(deltaTime: number) {
        
    }

    refresh(){
        this.itemData = gameData.curBuyShopData;
        this.buyNum = gameData.curBuyCount;
        if (!this.itemData){
            return;
        }

        this.titleLab.string = LanauageManager.getDesStrById(65);
        this.desLab.string = LanauageManager.getDesStrById(67);
        this.coinLab.string = LanauageManager.getCoinNumString(this.itemData.coin_num * this.buyNum);
        LanauageManager.loadImage("image/shopItem/coin" + this.itemData.coin_type, this.coinSp);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onYesClick(){
        HttpClient.getInstance().sendBuyShopItem(this.itemData.id, this.buyNum);
        this.onCloseClick();
    }
}

