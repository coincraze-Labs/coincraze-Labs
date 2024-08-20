import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
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
        this.coinLab.string = LanauageManager.getCoinNumString(this.itemData.coinNum * this.buyNum);
        LanauageManager.loadImage("image/shopItem/coin" + this.itemData.coinType, this.coinSp);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onYesClick(){
        if (LanauageManager.getCoinNumByType(this.itemData.coinType) >= this.itemData.coinNum * this.buyNum){

        }else{
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(68));
        }
    }
}

