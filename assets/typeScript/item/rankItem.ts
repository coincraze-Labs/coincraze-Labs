import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, UITransform } from 'cc';
import { LanauageManager, randItemData, ShopItemData, taskItemData } from '../LanauageManager';
import { gameData } from '../gameData';
import { UIManager } from '../UIManager';
import { EventManger } from '../EventManger';
const { ccclass, property } = _decorator;

@ccclass('rankItem')
export class rankItem extends Component {

    @property(Label)  
    rankLab: Label = null;

    @property(Sprite)  
    ranksp: Sprite = null;

    @property(Sprite)  
    head: Sprite = null;

    @property(Label)  
    desLab: Label = null;

    @property(Sprite)  
    iconSp: Sprite = null;

    @property(Label)  
    numLab: Label = null;

    @property([SpriteFrame])  
    rankArr: SpriteFrame[] = [];

    @property([SpriteFrame])  
    iconArr: SpriteFrame[] = [];

    private rangeData:randItemData;

    private rankType:number = 1;

    private rankDes:number[] = [28, 80, 81];

    private headAvatar:string;

    protected onEnable(): void {
        
    }

    refresh(data:randItemData, type:number){
        if(!data){
            return;
        }

        let rank = data.rank
        this.rankType = type;

        this.rangeData = data;

        if (this.headAvatar != data.avatar){
            gameData.replaceHead(this.head, data.avatar);
        }
        this.headAvatar = data.avatar;

        if (rank <= 3 && rank >=1){
            this.rankLab.string = "";
            this.ranksp.spriteFrame = this.rankArr[rank-1];
            this.ranksp.node.active = true;
        }else{
            this.rankLab.string = rank==0?"--": rank.toString();
            this.ranksp.node.active = false;
        }

        this.desLab.string = LanauageManager.getDesStrById(this.rankDes[this.rankType-1]) + ":";

        this.scheduleOnce(this.onPositon, 0.1);  
        
        this.iconSp.spriteFrame = this.iconArr[this.rankType-1];
        
        if (this.rankType == 3){
            this.numLab.string = gameData.getLeftTime(this.rangeData.num);
        }else if (this.rankType == 1){
            this.numLab.string = LanauageManager.getCoinNumString(this.rangeData.num);
        }else{
            this.numLab.string = this.rangeData.num.toString();
        }
    }

    onPositon(){
        this.iconSp.node.setPosition(this.desLab.node.position.x + this.desLab.node.getComponent(UITransform).contentSize.width + 50,  this.iconSp.node.position.y);
    }

    onReceiveClick(){

    }
}

