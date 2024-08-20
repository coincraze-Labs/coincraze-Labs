import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
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
        else if (LanauageManager.popupCommonlType == popupCommonType.disconnect){
            this.desId = 63;
        }

        this.titleLab.string = LanauageManager.getDesStrById(this.titleId);

        this.desLab.string = LanauageManager.getDesStrById(this.desId);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onYesClick(){
        if (LanauageManager.popupCommonlType == popupCommonType.exit){
            EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, true);
        }
        else if (LanauageManager.popupCommonlType == popupCommonType.disconnect){
            
        }

        UIManager.close(this.node);
    }
}

