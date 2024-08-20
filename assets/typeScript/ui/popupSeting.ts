import { _decorator, Component, Label, Node, Sprite, Toggle, Vec2, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager } from '../LanauageManager';
import { gameData, popupLabType } from '../gameData';
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

    onEnable() {
        this.refresh();
    }

    update(deltaTime: number) {
        
    }

    refresh(){
        this.titleLab.string = LanauageManager.getDesStrById(8);

        this.soundLab.string = LanauageManager.getDesStrById(16);

        this.musicLab.string = LanauageManager.getDesStrById(15);

        this.soundCheck.isChecked = gameData.isPlaySound;
        this.soundCheck2.isChecked != gameData.isPlaySound;

        this.musicCheck.isChecked = gameData.isPlayMusic;
        this.musicCheck2.isChecked != gameData.isPlayMusic;
    }

    onChangeMusic(){
        gameData.isPlayMusic = this.musicCheck.isChecked;
    }

    onChangeSound(){
        gameData.isPlaySound = this.soundCheck.isChecked;
    }

    onOpenVisit(){
        
    }

    onCloseClick(){
        UIManager.close(this.node);
    }
}

