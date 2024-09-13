import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { UIManager } from '../UIManager';
import { gameData } from '../gameData';
import { LanauageManager } from '../LanauageManager';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('shopView')
export class shopView extends Component {

    @property(Sprite)  
    shopSp: Sprite = null; 

    @property(Sprite)  
    backpackSp: Sprite = null; 

    @property(Label)  
    coinLab: Label = null;
    
    @property(Node)  
    itemContent: Node = null;

    @property(Prefab)  
    itempfb: Prefab = null;

    timeSeconds:number = 1;

    private info:any[];

    protected start(): void {
        EventManger.eventTarget.on(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    onEnable() {
        this.refresh();
    }

    onDisable() {
        //EventManger.eventTarget.off(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    update(deltaTime: number) {
        this.timeSeconds -= deltaTime;
        if (this.timeSeconds < 0){
            this.timeSeconds = 1;
            this.coinLab.string = LanauageManager.getCoinNumString(gameData.saveData.coin);
        }
    }

    refresh(){

        this.coinLab.string = LanauageManager.getCoinNumString();

        this.shopSp.node.active = !gameData.isBackNotShop;
        this.backpackSp.node.active = gameData.isBackNotShop
        this.info = [];

        for (let index = 0; index < this.itemContent.children.length; index++) {
            let itemshow = this.itemContent.children[index];
            if(itemshow){
                itemshow.active = false;
            }
        }

        if (gameData.isBackNotShop){
            this.info = gameData.saveData.backList;
        }else{
            for (let index = 0; index < LanauageManager.shopConfig.length; index++) {
                let element = LanauageManager.shopConfig[index];
                if (element.is_shop){
                    this.info.push(element);
                }
            }
        }
        if (!this.info){
            return;
        }

        for (let index = 0; index < this.info.length; index++) {
            let itemData = this.info[index];
            let item;
            if (this.itemContent.children && this.itemContent.children[index]){
                item = this.itemContent.children[index];
            }else{
                item = instantiate(this.itempfb);
                this.itemContent.addChild(item);
            }
            item.active = true;
            if (gameData.isBackNotShop){
                itemData = LanauageManager.getShopItemData(itemData.id)
                item.getComponent('shopItem')?.refresh(itemData);
            }else{
                item.getComponent('shopItem')?.refresh(itemData);
            }
            
        }
    }

    onBackClick(){
        UIManager.close(this.node);
    }
}

