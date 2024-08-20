import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData } from '../gameData';
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

    private isBack:boolean = false;

    protected onEnable(): void {
        this.buyNum = 1;
    }

    refresh(data:any){

        this.itemData = data;
        if (!this.itemData){
            return;
        }

        this.isBack = gameData.isBackNotShop;

        this.numNode.active = !this.isBack;
        this.coinSp.node.active = !this.isBack;

        LanauageManager.loadImage("image/shopItem/" + this.itemData.icon, this.iconSp);

        this.nameLab.string = LanauageManager.getDesStrById(this.itemData.nameId);

        if (this.isBack){
            this.refreshBack();
        }
        else{
            this.refreshShop();
            LanauageManager.loadImage("image/shopItem/coin" + this.itemData.coinType, this.coinSp);
        } 
    }

    refreshBack(){

    }

    refreshShop(){
        if (!this.isBack){
            this.numLab.string = this.buyNum.toString();
        }
        this.coinLab.string = LanauageManager.getCoinNumString(this.itemData.coinNum * this.buyNum);
    }

    onAddBtnClick(){
        this.buyNum++;
        this.refreshShop();
    }

    onSubBtnClick(){
        this.buyNum--;
        if (this.buyNum <= 0){
            this.buyNum = 1;
        }
        this.refreshShop();
    }

    onBuyClick(){
        if (this.isBack){
            if (this.itemData.canUse){
                gameData.curBuyShopData = this.itemData;
                UIManager.open(UIManager.uiNamePath.popupUseBtn);
            }else{
                EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(69));
            }
        }else{
            gameData.curBuyShopData = this.itemData;
            gameData.curBuyCount = this.buyNum;
            UIManager.open(UIManager.uiNamePath.popupShopBtn);
        }
    }
}

