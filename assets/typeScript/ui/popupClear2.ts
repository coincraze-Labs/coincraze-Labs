import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('popupClear2')
export class popupClear2 extends Component {

    @property(Node)  
    itemContent: Node = null; 

    @property(Label)  
    yesLab: Label = null;

    @property(Prefab)  
    itemPfb: Prefab = null;

    private isCommon:boolean;

    private rewardList;

    private rewardNum;

    onEnable() {
        this.refresh();
    }

    refresh(){

        this.isCommon = true;

        if (this.isCommon){
            this.yesLab.string = LanauageManager.getDesStrById(139);

            this.rewardList = [8,9];

            let coinNum = gameData.saveData.passRewardout*((gameData.saveData.curLevel-1)**gameData.saveData.passRewardin)
            let exp = 0.8* gameData.saveData.passRewardout*(gameData.saveData.curLevel-1)**gameData.saveData.passRewardin;

            this.rewardNum = [coinNum, exp];
        }
        else{

            this.yesLab.string = LanauageManager.getDesStrById(139);

            this.rewardList = [8,9,1,2];

            let coinNum = gameData.saveData.passRewardout*(gameData.saveData.curLevel**gameData.saveData.passRewardin)
            let exp = 0.8* gameData.saveData.passRewardout*gameData.saveData.curLevel**gameData.saveData.passRewardin;
            
            this.rewardNum = [coinNum, exp, 1,1]
        }

        for (let index = 0; index < this.itemContent.children.length; index++) {
            let itemshow = this.itemContent.children[index];
            itemshow.active = false;
        }

        for (let index = 0; index < this.rewardList.length; index++) {
            let itemData = LanauageManager.getShopItemData(this.rewardList[index]);
            let item;
            if (this.itemContent.children && this.itemContent.children[index]){
                item = this.itemContent.children[index];
            }else{
                item = instantiate(this.itemPfb);
                this.itemContent.addChild(item);
            }
            item.active = true;
            item.getComponent('item')?.refresh(itemData, this.rewardNum[index]);
        }
    }

    onYesClick(){
        if (gameData.saveData.hpNum <= 0){
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, LanauageManager.getDesStrById(71))
            return;
        }
        HttpClient.getInstance().sendLevelByType(3);
    }

    onNoClick(){
        UIManager.close(this.node);
    }


}

