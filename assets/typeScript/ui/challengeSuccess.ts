import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('challengeSuccess')
export class challengeSuccess extends Component {

    @property(Label)  
    timeLab: Label = null; 

    @property(Node)  
    itemContent: Node = null; 

    @property(Label)  
    yesLab: Label = null;

    @property(Label)  
    noLab: Label = null;

    @property(Prefab)  
    itemPfb: Prefab = null;

    private isCommon:boolean;

    private rewardList;

    private rewardNum;

    onEnable() {
        this.refresh();
    }

    refresh(){

        this.isCommon = !gameData.isChanllenge;

        this.timeLab.string = LanauageManager.getDesStrById(37) + "  " + gameData.getLeftTime(gameData.levelSeconds);

        if (this.isCommon){
            this.yesLab.string = LanauageManager.getDesStrById(27);

            this.noLab.string = LanauageManager.getDesStrById(76);

            this.rewardList = [8,9];

            let coinNum = 100*(gameData.saveData.curLevel**0.5)
            let exp = 100*gameData.saveData.curLevel*0.5;

            this.rewardNum = [coinNum, exp];
        }
        else{

            this.yesLab.string = LanauageManager.getDesStrById(27);

            this.noLab.string = LanauageManager.getDesStrById(6);

            this.rewardList = [8,9,1];

            let coinNum = 100*(gameData.saveData.curLevel**0.5)
            let exp = 100*gameData.saveData.curLevel*0.5;
            
            this.rewardNum = [coinNum, exp, 1]
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
        EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, true);
        UIManager.close(this.node);
    }

    onNoClick(){
        if (this.isCommon){
            EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, false);
        }else{
            gameData.isChanllengeShare = true;
            EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, true);
            UIManager.open(UIManager.uiNamePath.popupShare);
        }
        UIManager.close(this.node);
    }


}

