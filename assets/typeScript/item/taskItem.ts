import { _decorator, Button, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { LanauageManager, ShopItemData, taskItemData } from '../LanauageManager';
import { gameData } from '../gameData';
import { UIManager } from '../UIManager';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
import { TgManager } from '../TgManager';
const { ccclass, property } = _decorator;

@ccclass('taskItem')
export class taskItem extends Component {

    @property(Label)  
    nameLab: Label = null;

    @property(Label)  
    desLab: Label = null;

    @property(Node)  
    btn1: Node = null;

    @property(Label)  
    btn1Lab: Label = null;

    @property(Node)  
    btn2: Node = null;

    @property(Label)  
    btn2Lab: Label = null;

    @property(Node)  
    btn3: Node = null;

    @property(Label)  
    btn3Lab: Label = null;

    @property(Node)  
    itemContent: Node = null; 

    @property(Prefab)  
    itemPfb: Node = null; 

    @property(Label)  
    prossLab: Label = null;

    private isCanGo:number[] = [1,2,3,4,6,7,10,11,12,13,14,16];

    private taskData:taskItemData

    refresh(data:taskItemData){

        this.taskData = data;

        this.nameLab.string = LanauageManager.getDesStrById(this.taskData.name_id);

        this.desLab.string = LanauageManager.getDesStrById( this.taskData.des_id).replace("&1", this.taskData.task_num.toString());

        if (data.id == 11 ||data.id == 12 ||data.id == 13){
            this.prossLab.string = gameData.saveData.inviteNum + "/" + this.taskData.task_num;
        }else{
            this.prossLab.string = "";
        }

        let state = LanauageManager.getTaskState(this.taskData.id);


        this.btn1.active = state == 1;
        this.btn2.active = state == 2;
        this.btn3.active = state == 3;
        if (state == 1){
            this.btn1Lab.string = LanauageManager.getDesStrById(data.btn_id>0?data.btn_id:86);
            this.btn1.getComponent(Button).interactable = data.btn_id > 0;
            this.btn1.getComponent(Sprite).grayscale = data.btn_id <= 0;
        }else if (state == 2){
            this.btn2Lab.string = LanauageManager.getDesStrById(44);
        }
        else if (state == 3){
            this.btn3Lab.string = LanauageManager.getDesStrById(45);
        }

        this.refreshReward();
    }

    refreshReward(){
        let rewardList = this.taskData.reward;
        let rewardNum = this.taskData.reward_num;
        for (let index = 0; index < this.itemContent.children.length; index++) {
            let itemshow = this.itemContent.children[index];
            itemshow.active = false;
        }

        for (let index = 0; index < rewardList.length; index++) {
            let itemData = LanauageManager.getShopItemData(rewardList[index]);
            if (itemData && itemData.id > 0){
                let item;
                if (this.itemContent.children && this.itemContent.children[index]){
                    item = this.itemContent.children[index];
                }else{
                    item = instantiate(this.itemPfb);
                    this.itemContent.addChild(item);
                }
                item.active = true;
                item.getComponent('item')?.refresh(itemData, rewardNum[index]);
            }
        }
    }

    onReceiveClick(){
        LanauageManager.playSound();
        HttpClient.getInstance().sendReceiveTaskReward(this.taskData.id);
    }

    onCompleteClick(){
        LanauageManager.playSound();
        switch (this.taskData.id) {
            case 1:
                TgManager.connectWallet();
                break;
            case 2:
                TgManager.addTelegramChannel();
                break;
            case 3:
                TgManager.connectTwitter();
                break;
            case 4:
                TgManager.followTwitter();
                break;
            case 6:
                TgManager.visitWebsite();
                break;
            case 7:
                TgManager.addVip();
                break;
            case 10:
            case 5:
                gameData.isBackNotShop = false;
                UIManager.open(UIManager.uiNamePath.shopView);
                break;
            case 11:
            case 12:
            case 13:
                TgManager.invite();
                break;
            case 14:
                TgManager.shareTelegram();
                break;
            case 16:
                TgManager.repostTwitter();
                break;
            default:
                break;
        }
        this.scheduleOnce(()=>{
            HttpClient.getInstance().sendGetTaskData();
        }, 1)
    }
}

