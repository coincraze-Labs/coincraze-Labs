import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData, taskItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('rewardView')
export class rewardView extends Component {

    @property(Node)  
    view1: Node = null; 

    @property(Node)  
    view2: Node = null; 

    @property(Node)  
    itemContent: Node = null; 

    @property(Prefab)  
    itemPfb: Prefab = null;

    private taskData:taskItemData;

    private rewardList;

    private rewardNum;

    onEnable() {
        this.refresh();
    }

    refresh(){

        this.view1.active = true;

        this.view2.active = false;

        this.taskData = LanauageManager.getTaskDataById(gameData.saveData.special_reward[0]);
        if (! this.taskData){
            this.node.active = false;
        }

        this.rewardList = this.taskData.reward;

        this.rewardNum =  this.taskData.reward_num;

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
        LanauageManager.playSound();
        HttpClient.getInstance().sendReceiveTaskReward(this.taskData.id);
        gameData.saveData.special_reward.shift()
        if (gameData.saveData.special_reward.length > 0){
            this.refresh()
        }else{
            this.node.active = false;
        }
    }

    onOpenClick(){
        this.view1.active = false;
        this.view2.active = true;
    }


}

