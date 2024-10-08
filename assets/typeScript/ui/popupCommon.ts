import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
import { TgManager } from '../TgManager';
import { HttpClient } from '../net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('popupCommon')
export class popupCommon extends Component {

    @property(Label)  
    titleLab: Label = null; 

    @property(Label)  
    desLab: Label = null; 

    private titleId:number = 66;

    private desId:number = 0;

    onEnable() {
        this.refresh()
    }

    update(deltaTime: number) {
        
    }

    refresh(){

        if (LanauageManager.popupCommonlType == popupCommonType.exit){
            this.desId = 70
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.disConnectTwitter){
            this.desId = 63;
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.disConnectWalletr){
            this.desId = 63;
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.offLineCoin){
            this.desId = 128;
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.buy){
            this.desId = 130;
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.connectTwitter){
            this.desId = 132;
        }

        this.titleLab.string = LanauageManager.getDesStrById(this.titleId);

        this.desLab.string = LanauageManager.getDesStrById(this.desId);

        if (this.desId == 128){
            this.desLab.string = LanauageManager.getDesStrById(this.desId).replace("&1", gameData.saveData.offline_rewards.toString());
        }
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onYesClick(){
        if (LanauageManager.popupCommonlType == popupCommonType.exit){
            EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, true);
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.disConnectTwitter){
            TgManager.disConnectTwitter();
            this.scheduleOnce(()=>{
                HttpClient.getInstance().sendGetTaskData();
            }, 0.3)
            
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.disConnectWalletr){
            TgManager.disConnectWalletr();
            this.scheduleOnce(()=>{
                HttpClient.getInstance().sendGetTaskData();
            }, 0.3)
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.offLineCoin){
            HttpClient.getInstance().sendReceiveOffReward();
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.buy){
            gameData.isBackNotShop = false;
            UIManager.open(UIManager.uiNamePath.shopView);
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.connectTwitter){
            TgManager.connectTwitter();
        }

        this.scheduleOnce(()=>{
            UIManager.close(this.node);
        }, 0.4)
    }
}

