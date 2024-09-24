import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupLabType } from '../gameData';
import { UIManager } from '../UIManager';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('shopItem')
export class shopItem extends Component {

    @property(Sprite)  
    iconSp: Sprite = null; 

    @property(Sprite)  
    coinSp: Sprite = null; 

    @property(Label)  
    nameLab: Label = null;

    @property(Label)  
    coinLab: Label = null;

    @property(Node)  
    numNode: Node = null;

    @property(Label)  
    numLab: Label = null;

    private buyNum:number = 1;

    private itemData:ShopItemData

    private isBackPack:boolean = false;

    protected onEnable(): void {
        this.buyNum = 1;
    }

    refresh(data:any){

        this.isBackPack = gameData.isBackNotShop;
        this.itemData = data;
        if (!this.itemData){
            this.node.active = false;
            return;
        }

        this.numNode.active = !this.isBackPack;
        this.coinSp.node.active = !this.isBackPack;

        LanauageManager.loadImage("image/shopItem/" + this.itemData.icon, this.iconSp);

        this.nameLab.string = LanauageManager.getDesStrById(this.itemData.name_id);

        if (this.isBackPack){
            this.refreshBack();
        }
        else{
            this.refreshShop();
            LanauageManager.loadImage("image/shopItem/coin" + this.itemData.coin_type, this.coinSp);
        } 
    }

    refreshBack(){
        this.coinLab.string = LanauageManager.getItemNumById(this.itemData.id).toString();
    }

    refreshShop(){
        if (!this.isBackPack){
            this.numLab.string = this.buyNum.toString();
        }
        this.coinLab.string = LanauageManager.getCoinNumString(this.itemData.coin_num * this.buyNum);
    }

    onItemTipClick(){
        if (this.itemData.is_tip){
            gameData.popupTipItemId = this.itemData.id;
            LanauageManager.popupLabelType = popupLabType.itemPopup;
            UIManager.open(UIManager.uiNamePath.popupLabel);
        }
    }

    onAddBtnClick(){
        if (this.isBackPack){
            return;
        }
        LanauageManager.playSound();
        this.buyNum++;
        this.refreshShop();
    }

    onSubBtnClick(){
        if (this.isBackPack){
            return;
        }
        LanauageManager.playSound();
        this.buyNum--;
        if (this.buyNum <= 0){
            this.buyNum = 1;
        }
        this.refreshShop();
    }

    onBuyClick(){
        LanauageManager.playSound();
        if (this.isBackPack){
            if (this.itemData.can_use && LanauageManager.getItemNumById(this.itemData.id) > 0){
                if (this.itemData.id == 1 && gameData.getArrivalTime(gameData.saveData.boost_card_remaining_time) > 0){
                    EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(109).replace("&1", LanauageManager.getDesStrById(this.itemData.name_id)));
                    return;
                }
                if (this.itemData.id == 2 && gameData.saveData.offline_card_remaining_time > 0){
                    EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(109).replace("&1", LanauageManager.getDesStrById(this.itemData.name_id)));
                    return;
                }

                gameData.curBuyShopData = this.itemData;
                UIManager.open(UIManager.uiNamePath.popupUseBtn);
            }else{
                EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(69));
            }
        }else{
            if (this.itemData.coin_type != 2){
                gameData.curBuyShopData = this.itemData;
                gameData.curBuyCount = this.buyNum;
                UIManager.open(UIManager.uiNamePath.popupBuyItem);
            }
            else if (LanauageManager.getCoinNumByType(this.itemData.coin_type) >= this.itemData.coin_num * this.buyNum){
                gameData.curBuyShopData = this.itemData;
                gameData.curBuyCount = this.buyNum;
                UIManager.open(UIManager.uiNamePath.popupShopBtn);
            }else{
                EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(68));
            }
        }
    }
}

