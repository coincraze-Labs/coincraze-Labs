import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
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

    protected start(): void {
        EventManger.eventTarget.on(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    onEnable() {
        HttpClient.getInstance().sendTonPrice();
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

        this.btn1_lab1.string = LanauageManager.getCoinNumString(coin*0.9/gameData.saveData.tonPrice) + " " + LanauageManager.getDesStrById(105);
        this.btn1_lab2.string = LanauageManager.getCoinNumString(coin/gameData.saveData.tonPrice)  + LanauageManager.getDesStrById(105);
        //this.btn1_lab3.string = "10%" + LanauageManager.getDesStrById(107);

        this.btn2_lab1.string = LanauageManager.getCoinNumString(coin*0.9) + " " +  LanauageManager.getDesStrById(106);
        this.btn2_lab2.string = LanauageManager.getCoinNumString(coin)  +  LanauageManager.getDesStrById(106);
        //this.btn2_lab3.string = "10%" + LanauageManager.getDesStrById(107);

        this.btn3_lab1.string = LanauageManager.getCoinNumString(coin*70);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onBtn1Click(){
        LanauageManager.playSound();
        if (gameData.isBindWallet){
            let coin = Math.floor(this.itemData.coin_num * this.buyNum*0.9/gameData.saveData.tonPrice);
            EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT, 2, coin);

        }else{
            EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT);
        }
    }

    onBtn2Click(){
        LanauageManager.playSound();
        if (gameData.isBindWallet){
            let coin = Math.floor(this.itemData.coin_num * this.buyNum*0.9);
            EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT, 2, coin);
        }else{
            EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT);
        }
    }

    onBtn3Click(){
        LanauageManager.playSound();
        let coin = Math.floor(this.itemData.coin_num * this.buyNum * 71);
        //EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT, 1, coin);

        HttpClient.getInstance().sendGetinvoiceLink(LanauageManager.getDesStrById(this.itemData.name_id), coin)
    }

}

