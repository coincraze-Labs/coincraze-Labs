import { _decorator, CCInteger, Component, instantiate, Node, Prefab, randomRange, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('coinDrop')
export class coinDrop extends Component {

    @property({type: CCInteger})
    coinCount = 8 

    @property({type: CCInteger})
    minRadius = 50

    @property({type:CCInteger})
    maxRadius = 150

    @property({type:CCInteger})
    duration1 = 0.3

    @property({type:CCInteger})
    duration2 = 0.8


    drop(from:Node, targert:Node, callback:Function){
        return;
        let count = this.coinCount;
        let finshCount = 0;

        var dropGroup = [];
        var pre = this.node.children[0];
        pre.setPosition(from.position);
        dropGroup.push(pre);

        for (var i = 1, node: Node; i < count; ++i) {
            var preClone = instantiate(pre);
            preClone.parent = pre.parent;
            preClone.setPosition(from.position);
            dropGroup.push(preClone);
        }

        
       
        for (var i = 0; i < count; ++i) {
            var angle = randomRange(i*360/count, (i+1)*360/count);
            var radius = randomRange(this.minRadius,this.maxRadius);
            var randX = from.position.x + radius * Math.cos(angle);
            var randY = from.position.y + radius * Math.sin(angle);

            tween(dropGroup[i])
                .to(this.duration1, {position: new Vec3(randX, randY , 0)}, {easing: "smooth"})
                .to(this.duration2, {worldPosition: targert.worldPosition}, {easing: "smooth"})
                .call(() => {
                    finshCount++
                    if(finshCount >= count){
                        if (callback){callback()}
                        this.node.destroy();
                    }
                })
                .start();
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

