import { _decorator, Asset, Component, director, instantiate, Node, Prefab, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager {

    public static uiNamePath = {
        popupLabel: "popupLabel",
        popupSeting: "popupSeting",
        popupShopBtn: "popupshopBtn",
        popupBuyItem: "popupBuyItem",
        popupUseBtn: "popupUseBtn",
        popupCommonBtn: "popupCommon",
        popupShare: "popupShare",
        shopView: "shopView",
        challengeFail: "challengeFail",
        challengeSuccess: "challengeSuccess",
        levelUp: "levelUp",
        rankView: "rankView",
        taskView: "taskView",
    }

     public static EEventName = {
        OPEN_UI: 'OPEN_UI',
        CLOSE_UI: 'CLOSE_UI',
    };

    public static preloadPrefabs() {  
         resources.preloadDir("ui", ()=>{
            console.log("preload success")
         })
    }  

    private static instances = {};

    private static assets = {};

    public static async open(uiName: string, callback?: Function) {
        if (!uiName || uiName === '') {return;}

        const uiPath = uiName;
        const arr = uiName.split('/');
        uiName = arr[arr.length - 1];
        console.log("openUI  " + uiName);
        try {
            
            let node: Node = UIManager.instances[uiName];
            if (node && node.getComponent && (node as any)._components) {
                node.active = true;
                UIManager.reshow(node, uiName);
                callback && callback(undefined, node);
                return node;
            }

            const asset: any = UIManager.assets[uiName] || await UIManager.loadRes(`ui/${uiPath}`, Prefab);
            UIManager.assets[uiName] = asset;
            node = instantiate(asset);
            UIManager.reshow(node, uiName);
            node.active = true;
            UIManager.instances[uiName] = node;
            callback && callback(undefined, node);
            return node;
        } catch (error) {
            callback ? callback(error) : console.error(error);
        }
    }

    public static close(uiName: string | Node, isDestroy: boolean = false) {
        let node: Node;

        if (typeof uiName === 'string') {
            const arr = uiName.split('/');
            uiName = arr[arr.length - 1];
            node = UIManager.instances[uiName];
        } else {
            node = uiName;
            uiName = node.name;
        }

        if (!node) {return null;}

        node.active = !1;
        node.parent = null;
        if (isDestroy) {
            UIManager.instances[uiName] = undefined;
            node.destroy();
        }
        
        return isDestroy ? null : node;
    }
    
    static loadRes(path: string, assetType: typeof Asset): Promise<Asset> {
        return new Promise((resolve, reject)=>{
            resources.load(path, assetType, (err, res)=>{
                if (err) {return reject(err);}
                return resolve(res);
            });
        });
    }

    static async loadResPanel(uiName: string, assetType: typeof Asset = Prefab): Promise<Asset> {
        const uiPath = uiName;
        const arr = uiName.split('/');
        uiName = arr[arr.length - 1];

        if (UIManager.assets[uiName]) { return UIManager.assets[uiName];}
        UIManager.assets[uiName] = await UIManager.loadRes(`ui/${uiPath}`, assetType);

        return UIManager.assets[uiName];
    }

    private static reshow(node: Node, uiName: string) {
        node.parent = director.getScene().getChildByName('Canvas').getChildByName("viewContent");
        //node.zIndex = 0;
    }
}


