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

    protected onEnable(): void {
        
    }

    refresh(data:randItemData, type:number){
        if(!data){
            return;
        }

        let rank = data.rank
        this.rankType = type;

        this.rangeData = data;

        if (rank <= 3){
            this.rankLab.string = "";
            this.ranksp.spriteFrame = this.rankArr[rank-1];
            this.ranksp.node.active = true;
        }else{
            this.rankLab.string = rank.toString();
            this.ranksp.node.active = false;
        }

        this.desLab.string = LanauageManager.getDesStrById(this.rankDes[this.rankType-1]) + ":";
        //this.iconSp.node.setPosition(this.desLab.node.position.x + this.desLab.node.getComponent(UITransform).contentSize.width,  this.iconSp.node.position.y);
        this.iconSp.spriteFrame = this.iconArr[this.rankType-1];
        this.numLab.string = gameData.getInitNum(this.rangeData.num).toString();
        if (this.rankType == 3){
            this.numLab.string = gameData.getLeftTime(this.rangeData.num);
        }
    }

    onReceiveClick(){

    }
}

