import { _decorator, Component, Label, Node, Sprite, Toggle, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager } from '../LanauageManager';
import { gameData, popupLabType } from '../gameData';
import { HttpClient } from '../net/HttpClient';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('popupSeting')
export class popupSeting extends Component {

    @property(Label)  
    titleLab: Label = null; 

    @property(Label)  
    soundLab: Label = null; 

    @property(Label)  
    musicLab: Label = null; 

    @property(Toggle)  
    soundCheck: Toggle = null; 

    @property(Toggle)  
    musicCheck: Toggle = null; 

    @property(Toggle)  
    soundCheck2: Toggle = null; 

    @property(Toggle)  
    musicCheck2: Toggle = null; 

    @property(Label)  
    btnLab: Label = null; 

    onEnable() {
        this.refresh();
    }


    refresh(){
        this.titleLab.string = LanauageManager.getDesStrById(8);

        this.soundLab.string = LanauageManager.getDesStrById(16);

        this.musicLab.string = LanauageManager.getDesStrById(15);

        this.btnLab.string = LanauageManager.getDesStrById(17);

        this.soundCheck.isChecked = gameData.isPlaySound;
        this.soundCheck2.isChecked != gameData.isPlaySound;

        this.musicCheck.isChecked = gameData.isPlayMusic;
        this.musicCheck2.isChecked != gameData.isPlayMusic;
    }

    onChangeMusic(event:Event, str:string){
        if (str != "isbutton"){
            return;
        }
        gameData.isPlayMusic = this.musicCheck.isChecked;
        HttpClient.getInstance().sendChangePersion(0);
        EventManger.eventTarget.emit(EventManger.EEventName.MUSIC_CHANGE_STATE);
    }

    onChangeSound(event:Event, str:string){
        if (str != "isbutton"){
            return;
        }
        gameData.isPlaySound = this.soundCheck.isChecked;
        HttpClient.getInstance().sendChangePersion(1);
    }

    onOpenVisit(){
        
    }

    onCloseClick(){
        UIManager.close(this.node);
    }
}

