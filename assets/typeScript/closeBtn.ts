import { _decorator, Component, Node } from 'cc';
import { EventManger } from './EventManger';
import { UIManager } from './UIManager';
import { LanauageManager } from './LanauageManager';
const { ccclass, property } = _decorator;

@ccclass('closeBtn')
export class closeBtn extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    closeClick(){
        LanauageManager.playSound();
        if (this.node && this.node.parent){
            UIManager.close(this.node.parent);
        }
    }
}

