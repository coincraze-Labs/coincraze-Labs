import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { UIManager } from '../UIManager';
import { gameData } from '../gameData';
import { LanauageManager } from '../LanauageManager';
import { HttpClient } from '../net/HttpClient';
import { EventManger } from '../EventManger';
import { rankItem } from '../item/rankItem';
const { ccclass, property } = _decorator;

@ccclass('rankView')
export class rankView extends Component {

    @property(Label)  
    titlLab: Label = null;

    @property(Label)  
    btn1Lab: Label = null;

    @property(Label)  
    btn2Lab: Label = null;

    @property(Label)  
    btn3Lab: Label = null;
    
    @property(Node)  
    itemContent: Node = null;

    @property(Prefab)  
    itempfb: Prefab = null;

    @property(rankItem)  
    selfRank: rankItem = null;

    @property(Label)  
    tipLab: Label = null;

    private info:any[];

    private rankType:number = 1;

    onEnable() {
        //this.rankType = 1;

        EventManger.eventTarget.on(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
        HttpClient.getInstance().sendGetRankData(this.rankType);
    }

    protected onDisable(): void {
        EventManger.eventTarget.off(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    update(deltaTime: number) {
        
    }

    refresh(){

        this.titlLab.string = LanauageManager.getDesStrById(5);

        this.btn1Lab.string = LanauageManager.getDesStrById(28);

        this.btn2Lab.string = LanauageManager.getDesStrById(29);

        this.btn3Lab.string = LanauageManager.getDesStrById(30);

        let str = Math.floor((800 - gameData.saveData.selfRank.rank) / 800 * 100) + "%"
        if (str == "NaN%" || gameData.saveData.selfRank.rank > 800){
            str = "0%"
        }
        this.tipLab.string = LanauageManager.getDesStrById(82).replace("&1", str);

        this.info = gameData.saveData.rankList;

        if (!this.info){
            return;
        }
        for (let index = 0; index < this.itemContent.children.length; index++) {
            let itemshow = this.itemContent.children[index];
            itemshow.active = false;
        }

        for (let index = 0; index < this.info.length; index++) {
            let itemData = this.info[index];
            let item;
            if (this.itemContent.children && this.itemContent.children[index]){
                item = this.itemContent.children[index];
            }else{
                item = instantiate(this.itempfb);
                this.itemContent.addChild(item);
            }
            item.active = true;
            item.getComponent('rankItem')?.refresh(itemData, this.rankType);    
        }

        this.selfRank.refresh(gameData.saveData.selfRank, this.rankType);    
    }

    onBtn1Click(){
        this.rankType = 1;
        this.refresh();
        HttpClient.getInstance().sendGetRankData(this.rankType);
    }

    onBtn2lClick(){
        this.rankType = 2;
        this.refresh();
        HttpClient.getInstance().sendGetRankData(this.rankType);
    }

    onBtn3Click(){
        this.rankType = 3;
        this.refresh();
        HttpClient.getInstance().sendGetRankData(this.rankType);
    }

    onBackClick(){
        UIManager.close(this.node);
    }

    
}

