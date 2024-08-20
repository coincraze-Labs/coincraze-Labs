import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('chanllengeFail')
export class chanllengeFail extends Component {

    @property(Label)  
    tryLab: Label = null; 

    @property(Label)  
    backLab: Label = null; 


    onEnable() {
        this.refresh()
    }

    update(deltaTime: number) {
        
    }

    refresh(){

        this.tryLab.string = LanauageManager.getDesStrById(41);

        this.backLab.string = LanauageManager.getDesStrById(27);
    }

    onTryClick(){
        EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, false);
        UIManager.close(this.node);
    }

    onBackClick(){
        EventManger.eventTarget.emit(EventManger.EEventName.IS_SHOW_MAINVIEW, true);
        UIManager.close(this.node);
    }
}

