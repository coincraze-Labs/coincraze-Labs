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

    private itemData:ShopItemData;

    private buyNum:number = 0;

    onEnable() {
        this.refresh()
    }

    refresh(){
        this.itemData = gameData.curBuyShopData;
        this.buyNum = gameData.curBuyCount;
        if (!this.itemData){
            return;
        }

        let coin = this.itemData.coin_num * this.buyNum;

        this.titllab1.string = LanauageManager.getDesStrById(65);

        this.btn3_lab1.string = LanauageManager.getDesStrById(gameData.isBindWallet ? 63: 62 )

        this.btn1_lab1.string = coin + LanauageManager.getDesStrById(105);
        this.btn1_lab2.string = coin + LanauageManager.getDesStrById(105);
        this.btn1_lab3.string = "10%" + LanauageManager.getDesStrById(107);

        this.btn2_lab1.string = coin +  LanauageManager.getDesStrById(106);
        this.btn2_lab2.string = coin +  LanauageManager.getDesStrById(106);
        this.btn2_lab3.string = "10%" + LanauageManager.getDesStrById(107);
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

