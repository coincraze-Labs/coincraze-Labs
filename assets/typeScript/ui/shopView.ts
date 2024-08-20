import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { UIManager } from '../UIManager';
import { gameData } from '../gameData';
import { LanauageManager } from '../LanauageManager';
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

    private info:any[];
    onEnable() {
        this.refresh();
    }

    update(deltaTime: number) {
        
    }

    refresh(){

        this.coinLab.string = LanauageManager.getCoinNumString();

        this.shopSp.node.active = !gameData.isBackNotShop;
        this.backpackSp.node.active = gameData.isBackNotShop

        this.info = gameData.isBackNotShop? gameData.saveData.backList: gameData.saveData.shopList;
        this.info = LanauageManager.shopItemList;
        if (!this.info){
            return;
        }
        for (let index = 0; index < this.itemContent.children.length; index++) {
            let itemshow = this.itemContent.children[index];
            itemshow.active = false;
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
            item.getComponent('shopItem')?.refresh(itemData);
        }
    }

    onBackClick(){
        UIManager.close(this.node);
    }
}

