import { _decorator, Component, instantiate, Label, Node, Prefab, tween, Vec3 } from 'cc';
import { coinDrop } from './coinDrop';
import { gameData, moneyType } from '../gameData';
const { ccclass, property } = _decorator;

@ccclass('coinDropManger')
export class coinDropManger extends Component {
    @property (Prefab)
    moneyPfb:Prefab = null;

    @property (Prefab)
    goldPfb:Prefab = null;

    @property(Node)
    from:Node = null;

    @property(Node)
    target:Node = null;

    @property(Node)
    target2:Node = null;

    @property(Label)
    moneyNumLabel:Label = null;

    @property(Label)
    goldNumLabel:Label = null;

    @property(Node)
    moneyAni:Node = null;

    @property(Node)
    goldAni:Node = null;

    moneyPosY:number = 0

    goldPosY:number = 0

    start() {
        this.moneyPosY = this.moneyAni.position.y;
        
        this.goldPosY = this.goldAni.position.y;

        this.refresh();

        this.moneyAni.active= false;
        this.goldAni.active = false;
    }

    refresh(){
        //this.moneyNumLabel.string =  gameData.getShowMoney(false).toString();

        //this.goldNumLabel.string =  gameData.getShowGolde(false).toString();
    }

    drop(type:number,coinNum:number, isSave:boolean = true, isPass:boolean = false){
        var pfb :Prefab;
        var target:Node;
        if (type == moneyType.money){
            gameData.saveData.addMoney += coinNum
            pfb = this.moneyPfb;
            target = this.target;
        }else{
            gameData.saveData.addGold += coinNum;
            pfb = this.goldPfb
            target = this.target2;
        }
        gameData.setGold()
        if (pfb && target){
            var prefab = instantiate(pfb);
            prefab.parent = this.node;
            prefab.getComponent(coinDrop)?.drop(this.from, target, () => {

                this.moneyAni.position.set( this.moneyAni.position.x, this.moneyPosY, this.moneyAni.position.z)
                this.goldAni.position.set( this.goldAni.position.x, this.goldPosY, this.goldAni.position.z)
                if (type == moneyType.money){
                    //this.moneyAni.getChildByName("Label").getComponent(Label).string = "+" + coinNum;
                    this.scaleAnimation(this.target);
                    this.upAnimation(this.moneyAni);
                }else{
                    this.scaleAnimation(this.target2);
                    //this.goldAni.getChildByName("Label").getComponent(Label).string = "+" + (coinNum * 1000);
                    this.upAnimation(this.goldAni);
                }
                this.refresh();
            })
        }

        if (isPass){
            gameData.saveDataClick(2);
        }else if (isSave){
            gameData.saveDataClick(1);
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

