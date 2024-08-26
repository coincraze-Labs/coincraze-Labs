import { _decorator, Component, instantiate, Label, Node, Prefab, tween, Vec3 } from 'cc';
import { coinDrop } from './coinDrop';
import { gameData, moneyType, SaveData } from '../gameData';
const { ccclass, property } = _decorator;

@ccclass('taskDropManger')
export class taskDropManger extends Component {
    @property (Prefab)
    goldPfb:Prefab = null;

    @property([Node])
    from:Node[];

    @property(Node)
    target:Node = null;

    @property(Label)
    goldNumLabel:Label = null;

    @property(Node)
    goldAni:Node = null;

    goldPosY:number = 0

    start() {
        this.goldPosY = this.goldAni.position.y;

        this.refresh();

        this.goldAni.active = false;
    }

    refresh(){

        //this.goldNumLabel.string =  gameData.getShowGolde().toString();
    }

    drop(fromIndex:number,coinNum:number, isRefresh:boolean = true){
        var pfb :Prefab;
        var target:Node;

        //gameData.saveData.taskGold = gameData.getInitNum(gameData.saveData.taskGold + coinNum);
        pfb = this.goldPfb
        target = this.target;
        //gameData.setGold()
        if (pfb && target){
            var prefab = instantiate(pfb);
            prefab.parent = this.node;
            prefab.getComponent(coinDrop)?.drop(this.from[fromIndex], target, () => {

                this.goldAni.position.set( this.goldAni.position.x, this.goldPosY, this.goldAni.position.z)
                this.goldAni.children[0].getComponent(Label).string = "+" + coinNum;
                this.refresh();
                this.scaleAnimation(this.target);
                this.upAnimation(this.goldAni);
            })
        }
        if (isRefresh){
            //gameData.saveTaskData();
        }
    }

    upAnimation(node:Node){
        node.active = true;
        tween(node)
            .to(1, {position: new Vec3(node.position.x, node.position.y + 80 , 0)})
            .call(() => {
                node.active = false;
            })
            .start()
        
    }

    scaleAnimation(node:Node){
        tween(node)
            .to(0.5, {scale: new Vec3(1.2, 1.2, 1)})
            .to(0.5, {scale: new Vec3(1, 1, 1)})
            .call(() => {
            })
            .start();
    }

    update(deltaTime: number) {
        
    }
}

