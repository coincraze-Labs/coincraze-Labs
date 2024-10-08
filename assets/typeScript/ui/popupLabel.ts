import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupLabType } from '../gameData';
const { ccclass, property } = _decorator;

@ccclass('popupLabel')
export class popupLabel extends Component {

    @property(Node)  
    bg: Node = null;
    
    @property(Node)  
    bg2: Node = null; 

    @property(Label)  
    titleLab: Label = null; 

    @property(Label)  
    desLab: Label = null; 

    @property(Label)  
    des2Lab: Label = null; 

    private titId:number = 0;

    private desId:number = 0;

    private des2Id:number = 0;

    onEnable() {
        this.des2Id = 0
        this.refresh();
    }

    update(deltaTime: number) {
        
    }

    refresh(){
        this.bg.active = LanauageManager.popupLabelType != popupLabType.hookPopup;

        this.bg2.active = LanauageManager.popupLabelType == popupLabType.hookPopup;
        this.titId = 66;
        if (LanauageManager.popupLabelType == popupLabType.hookPopup){
            this.titId = 64;
            this.desId = 14;
        }
        else if (LanauageManager.popupLabelType == popupLabType.challPopup){
            this.titId = 18;
            this.desId = 61;
            this.des2Id = 60;
            let diffSeconds = gameData.getZeroTime();
            let str = gameData.getLeftTime(diffSeconds);
            this.des2Lab.string = LanauageManager.getDesStrById(this.des2Id).replace("&1", str);
        }
        else if (LanauageManager.popupLabelType == popupLabType.hpPopup){
            this.titId = 55
            this.desId = 56;
        }
        else if (LanauageManager.popupLabelType == popupLabType.offlineCardPopup){
            this.titId = 23
            this.desId = 24;
        }
        else if (LanauageManager.popupLabelType == popupLabType.boostCardPopup){
            this.titId = 25
            this.desId = 26;
        }
        else if (LanauageManager.popupLabelType == popupLabType.itemPopup){
            let itemData:ShopItemData = LanauageManager.getShopItemData(gameData.popupTipItemId);
            this.titId = itemData.name_id;
            this.desId = itemData.des_id;
        }else if (LanauageManager.popupLabelType == popupLabType.exp){
            this.desId = 129;
        }

        this.titleLab.string = LanauageManager.getDesStrById(this.titId);

        if (this.desId == 129){
            this.desLab.string = LanauageManager.getDesStrById(this.desId).replace("&1", gameData.saveData.userLevel.toString());
        }else if (this.desId == 14){
            let rat = gameData.getInitNum(gameData.saveData.up_coin_out * (gameData.saveData.userLevel**gameData.saveData.up_coin_in)*100, 1000000)  + "%"
            this.desLab.string = LanauageManager.getDesStrById(this.desId).replace("&1", rat);
        }
        else{
            this.desLab.string = LanauageManager.getDesStrById(this.desId);
        }

        if (this.des2Id > 0){
            //this.des2Lab.string = LanauageManager.getDesStrById(this.des2Id);
            this.desLab.node.setPosition(new Vec3(this.desLab.node.position.x, 20, 0))
        }else{
            this.des2Lab.string = "";
            this.desLab.node.setPosition(new Vec3(this.desLab.node.position.x, 92, 0))
        }
    }

    onCloseClick(){
        UIManager.close(this.node);
    }
}

