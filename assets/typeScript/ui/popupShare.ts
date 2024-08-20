import { _decorator, Component, Label, Node, Sprite, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData, popupCommonType, popupLabType } from '../gameData';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('popupShare')
export class popupShare extends Component {

    @property(Node)  
    topCom: Node = null; 

    @property(Label)  
    twitLab: Label = null; 

    @property(Label)  
    tgLab: Label = null; 

    @property(Label)  
    inivtLab: Label = null; 

    @property(Label)  
    inivtIdLab: Label = null; 

    @property(Node)  
    chall: Node = null; 

    @property(Label)  
    desLab: Label = null; 

    @property(Label)  
    timeLab: Label = null; 

    @property(Label)  
    timeLab2: Label = null; 

    onEnable() {
        this.refresh()
    }

    refresh(){

        this.twitLab.string = LanauageManager.getDesStrById(77);
        this.tgLab.string = LanauageManager.getDesStrById(78);
        this.inivtLab.string = LanauageManager.getDesStrById(79);

        this.inivtLab.string = gameData.saveData.inivitId;

        this.chall.active = gameData.isChanllengeShare;
        if (this.chall.active){
            this.desLab.string = LanauageManager.getDesStrById(52);

            this.timeLab.string = LanauageManager.getDesStrById(37) + "  " + gameData.getLeftTime(gameData.levelSeconds);

            this.timeLab2.string = gameData.getShowTime();
        }
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onTwiterClick(){
        
    }

    onTGClick(){
        
    }

    onCopyClick(){
        
    }
}

