import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite } from 'cc';
import { UIManager } from '../UIManager';
import { gameData } from '../gameData';
import { LanauageManager, taskItemData } from '../LanauageManager';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('taskVIew')
export class taskVIew extends Component {

    @property(Label)  
    dailLab: Label = null;

    @property(Label)  
    speciaLab: Label = null;
    
    @property(Node)  
    itemContent: Node = null;

    @property(Prefab)  
    itempfb: Prefab = null;

    private info:taskItemData[];

    private infoType:number[];

    private is_daily:boolean = true;

    onEnable() {
        //this.is_daily = true;
        HttpClient.getInstance().sendGetTaskData();
        this.refresh();
        EventManger.eventTarget.on(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    onDisable() {
        EventManger.eventTarget.off(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    update(deltaTime: number) {
        
    }

    refresh(){

        this.dailLab.string = LanauageManager.getDesStrById(42);

        this.speciaLab.string = LanauageManager.getDesStrById(43);

        this.info = [];
        this.infoType = [];
        for (let index = 0; index < LanauageManager.taskConfig.length; index++) {
            let element = LanauageManager.taskConfig[index];
            if (element && element.is_daily == this.is_daily){
                if (element.is_hidden){
                    continue;
                }
                if (element.task_type > 1){
                    if (this.getIsShow(element)){
                        this.info.push(element);
                        this.infoType.push(element.task_type);
                    }
                }else{
                    this.info.push(element);
                }
            }
        }
        if (!this.info){
            return;
        }
        this.info.sort((a, b) => {  
            return a.sort - b.sort;  
        });  
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
            item.getComponent('taskItem')?.refresh(itemData);
            
        }
    }

    public getIsShow(itemData:taskItemData){
        if ( this.infoType.indexOf(itemData.task_type) < 0){
            let state = LanauageManager.getTaskState(itemData.id);
            if (state == 3){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    onGoCompleteTask(){
        
    }

    onDailyClick(){
        this.is_daily = true;
        this.refresh();
    }

    onSpecialClick(){
        this.is_daily = false;
        this.refresh();
    }

    onBackClick(){
        UIManager.close(this.node);
    }
}

