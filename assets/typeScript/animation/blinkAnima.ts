import { _decorator, color, Color,Component, easing, Node, Sprite, Tween, tween, UIOpacity, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('blinkAnima')
export class blinkAnima extends Component {

    @property(Boolean)
    isForever:boolean = false;

    @property(Number)
    type:Number = 1;

    duration: number = 0.8

    target:UIOpacity;

    onEnable(): void {
        this.target = this.node.getComponent(UIOpacity);
        if (!this.target){
            this.node.addComponent(UIOpacity);
        } 
        this.target = this.node.getComponent(UIOpacity);

        if (this.isForever){
            this.startBlink();  
        }
    }

    private startBlink() {  

        if (this.type == 1){
            tween(this.target)  
            .to(this.duration, { opacity: 100 }, {easing: easing.quadOut})  
            .to(this.duration, { opacity: 255 }, {easing: easing.quadOut})  
            .union() 
            .repeatForever() 
            .start(); 
        }else{
            tween(this.node)  
            .to(this.duration, { scale: new Vec3(1.1,1.1, 1) }, {easing: easing.quadOut})  
            .to(this.duration, { scale: new Vec3(0.9,0.9, 1) }, {easing: easing.quadOut})  
            .union() 
            .repeatForever() 
            .start();  
        }
         
    } 

    public startBlinkOne(callBack:Function = null) {  
        if (this.type == 1){
            tween(this.target)  
            .to(this.duration, { opacity: 100 })  
            .to(this.duration, { opacity: 255 })  
            .to(this.duration, { opacity: 100 })  
            .to(this.duration, { opacity: 255 })  
            .call(()=>{
                if (callBack){
                    callBack();
                }
            })
            .start(); 
        }else{
            tween(this.node)  
            .to(this.duration, { scale: new Vec3(1.1,1.1, 1) }, {easing: easing.quadOut})  
            .to(this.duration, { scale: new Vec3(0.9,0.9, 1) }, {easing: easing.quadOut})  
            .to(this.duration, { scale: new Vec3(1.1,1.1, 1) }, {easing: easing.quadOut})  
            .to(this.duration, { scale: new Vec3(1,1, 1) }, {easing: easing.quadOut})  
            .call(()=>{
                if (callBack){
                    callBack();
                }
            })
            .start(); 
        }
    }

    protected onDisable(): void {
        Tween.stopAllByTarget(this.target);
        Tween.stopAllByTarget(this.node);
    }
}


