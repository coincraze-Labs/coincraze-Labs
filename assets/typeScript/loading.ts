import { _decorator, Color, color, Component, Node, Sprite, Tween, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    @property(Node)
    layoutNode:Node = null;

    @property(Node)
    loadSp:Node = null;

    onEnable() {
        // this.updateTime();
        // this.schedule(this.updateTime, 2);
        this.layoutNode.active = false;

        this.loadSp.angle = 0;
        tween(this.loadSp)
        .to(2.5,{angle:360})
        .call(()=>{
            this.loadSp.angle = 0;
        })
        .union()
        .repeatForever()
        .start();
    }

    updateTime() {
        // for (let index = 0; index < this.layoutNode.children.length; index++) {
        //     let element:Node = this.layoutNode.children[index];
        //     let sp:Sprite = element.getComponent(Sprite);
        //     sp.color = new Color("#FFFFFF");
        //     tween(sp)
        //     .delay(0.5*(index+1))
        //     .call(()=>{
        //         sp.color = new Color("#2BEB11");
        //     })
        //     .start();
        // } 
    }

    protected onDisable(): void {
        //this.unschedule(this.updateTime);
        tween(this.loadSp).stop();
    }
}


