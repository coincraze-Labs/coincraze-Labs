import { _decorator, Component, Label, Node, Sprite, Toggle, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager } from '../LanauageManager';
import { gameData, popupLabType } from '../gameData';
import { HttpClient } from '../net/HttpClient';
import { EventManger } from '../EventManger';
import { TgManager } from '../TgManager';
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

        this.soundCheck.node.active = gameData.isPlaySound;
        this.soundCheck2.node.active = !gameData.isPlaySound;

        this.musicCheck.node.active = gameData.isPlayMusic;
        this.musicCheck2.node.active = !gameData.isPlayMusic;
    }

    onChangeMusic(event:Event, str:string){
        if (str != "isbutton"){
            return;
        }
        LanauageManager.playSound();
        gameData.isPlayMusic = !gameData.isPlayMusic;
        HttpClient.getInstance().sendChangePersion(0);
        EventManger.eventTarget.emit(EventManger.EEventName.MUSIC_CHANGE_STATE);

        this.refresh();
    }

    onChangeSound(event:Event, str:string){
        if (str != "isbutton"){
            return;
        }
        LanauageManager.playSound();
        gameData.isPlaySound = !gameData.isPlaySound;
        HttpClient.getInstance().sendChangePersion(1);
        this.refresh();
    }

    onOpenVisit(event:Event, str:string){
        if (str == "comBtn"){
            window.open("https://t.me/Coincraze_Ann");
        }else if (str == "aboutUs"){
            //window.open("https://www.coincraze.ai/");
            TgManager.visitWebsite();
        }
        else if (str == "support"){
            window.open("https://t.me/Coincraze_support");
        }
        
    }

    onCloseClick(){
        UIManager.close(this.node);
    }
}

