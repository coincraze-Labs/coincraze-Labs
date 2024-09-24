import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupLabType } from '../gameData';
const { ccclass, property } = _decorator;

@ccclass('popupClear1')
export class popupClear1 extends Component {

    @property(Label)  
    titleLab: Label = null; 

    @property(Label)  
    desLab: Label = null; 

    @property(Label)  
    des2Lab: Label = null; 

    @property(Label)  
    btnLab: Label = null; 

    @property(Label)  
    moneyLab: Label = null; 

    onEnable() {
        this.refresh();
    }

    update(deltaTime: number) {
        
    }

    refresh(){
        this.titleLab.string = LanauageManager.getDesStrById(134);

        this.desLab.string = LanauageManager.getDesStrById(136);

        this.des2Lab.string = LanauageManager.getDesStrById(143);

        this.btnLab.string = LanauageManager.getDesStrById(137);

        this.moneyLab.string = "$" + gameData.saveData.clear_money;
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onBuyClick(){
        //UIManager.close(this.node);
        let itemData = new ShopItemData();
        itemData.id = 999;
        itemData.coin_num = 6.9;
        itemData.coin_type = 1;

        gameData.curBuyShopData = itemData;
        gameData.curBuyCount = 1;
        UIManager.open(UIManager.uiNamePath.popupBuyItem);

        this.onCloseClick();
    }
}

