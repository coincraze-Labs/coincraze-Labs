import { _decorator, Component, EventTarget, Node, resources, Sprite, SpriteFrame } from 'cc';
import { coinType, gameData } from './gameData';
const { ccclass, property } = _decorator;

@ccclass('LanauageManager')
export class LanauageManager {

    public static languageType:number = 2;

    public static popupLabelType:number = 1;

    public static popupCommonlType:number = 1;

    public static languageData = [{"id":1,"chinese":"在不远的未来，数字货币已经成为全球经济的核心，这里是数字货币交易中心，每一位数字货币狂热爱好者都汇聚到了这里，应对各种挑战，收集更多的数字资产，成为数字货币大亨。","english":"In the not-so-distant future, digital currency has become the core of the global economy. This is the digital currency trading center, where every digital currency enthusiast has come together to face various challenges, collect more digital assets, and become a digital currency tycoon."},{"id":2,"chinese":"加载中...玩赚空投","english":"loading...play for airdrops"},{"id":3,"chinese":"开始挑战","english":"Start challenging"},{"id":4,"chinese":"任务","english":"Task"},{"id":5,"chinese":"排行","english":"Ranking"},{"id":6,"chinese":"分享","english":"Share"},{"id":7,"chinese":"商店","english":"Shop"},{"id":8,"chinese":"设置","english":"Setting"},{"id":9,"chinese":"背包","english":"BackPack"},{"id":10,"chinese":"日常挑战","english":"daily challenge"},{"id":11,"chinese":"移出道具","english":"move out"},{"id":12,"chinese":"撤回","english":"revoke"},{"id":13,"chinese":"洗牌","english":"Rearrange"},{"id":14,"chinese":"当前收益率：0.01%/5金币将根据您在线时的收益率而增加。水平越高，收益率越高。","english":"CURRENT EARNING RATE :0.01%/5COINS WILL INCREASE ACCORDING TOTHE EARNING RATE WHEN YOUR AREONLINE.HIGHER THE LEVEL ,HIGHER THE EARNINGRATE."},{"id":15,"chinese":"音乐","english":"Music"},{"id":16,"chinese":"音效","english":"Sound"},{"id":17,"chinese":"访问官网","english":"VISIT OUR WEBSITE"},{"id":18,"chinese":"规则说明","english":"RULE SPECIFICATION"},{"id":19,"chinese":"你将获得一张“离线卡”，它能在你离开游戏时提升你的金币。通过完成每日挑战可以获得这张卡。每日挑战将在00:00 UTC刷新，每天只能完成一次。","english":"YOU WILL GET AN AFK CARD THAT BOOSTSYOUR COINS UP WHILE YOU'RE AWAY FROMTHE GAME BY PASSING DAILY CHALLENGE\nDAILY CHALLENGE WILL BE REFRESHED AT00:0O UTC AND YOU CAN ONLY COMPLETETHE DAILY CHALLENGE ONCE EACH DAY"},{"id":20,"chinese":"BOSS关卡","english":"BOSS'Attack"},{"id":21,"chinese":"硬币","english":"coin"},{"id":22,"chinese":"体力","english":"Live"},{"id":23,"chinese":"离线收益卡","english":"Offline Card"},{"id":24,"chinese":"在你离线后，你的金币将继续增加，持续4小时。","english":"After you going offline, your coins will continue to increase for a duration of 4 hours."},{"id":25,"chinese":"在线收益卡","english":"Boost Card"},{"id":26,"chinese":"当你在线时，你的金币收入速率将在2小时内翻倍。","english":"when you are online, your coin's earning rate will be doubled  for a duration of 2 hours."},{"id":27,"chinese":"返回","english":"Back"},{"id":28,"chinese":"资产","english":"Assets"},{"id":29,"chinese":"邀请","english":"Invitation"},{"id":30,"chinese":"每日挑战","english":"Daily Challenge"},{"id":31,"chinese":"关卡","english":"Stage"},{"id":32,"chinese":"确认使用道具吗?","english":"CONFIRM THE USE OF PROPS?"},{"id":33,"chinese":"确认","english":"YES"},{"id":34,"chinese":"取消","english":"NO"},{"id":35,"chinese":"难度升级","english":"OIFECULTYUPGRADE","chinese_1":"PURCHASE ITEMS"},{"id":36,"chinese":"挑战成功","english":"CHALLENGE SUCCESS"},{"id":37,"chinese":"用时","english":"TIME TAKEN"},{"id":38,"chinese":"恭喜你获胜","english":"CONGRATULATIONS ON WINNING"},{"id":39,"chinese":"经验","english":"EXP"},{"id":40,"chinese":"挑战失败","english":"CHALLENGE FAILEO"},{"id":41,"chinese":"再试一次","english":"TRY AGAIN"},{"id":42,"chinese":"每日任务","english":"DAILY TASK"},{"id":43,"chinese":"特殊任务","english":"SPECIAL TASK"},{"id":44,"chinese":"领取","english":"CLAIM"},{"id":45,"chinese":"已领取","english":"CLAIMEO"},{"id":46,"chinese":"未完成","english":"NOT YET ACHIEVED"},{"id":47,"chinese":"每日登录","english":"DAILY LOGIN"},{"id":48,"chinese":"每日完成","english":"DAILY COMPLETION"},{"id":49,"chinese":"每日购买","english":"DAILY PURCHASE"},{"id":50,"chinese":"每日邀请","english":"DAILY INVITATION"},{"id":51,"chinese":"加入 CoineraZe!收集加密货币","english":"JOIN COINERAZE!COLLECTING CRYPTO-COINS."},{"id":52,"chinese":"恭喜!你征服了每日挑战","english":"CONGRATULATIONS!YOU CONQUEREDDAILY CHALLENGE"},{"id":53,"chinese":"用时&2","english":"TIME TAKEN&2"},{"id":54,"chinese":"购买物品","english":"PURCHASE ITEM"},{"id":55,"chinese":"每次游戏消耗1条体力","english":"EACH PLAYING CONSUMES 1 LIVE"},{"id":56,"chinese":"你每天将获得10条初始体力，每在线30分钟，你将获得额外1条体力。体力也可以通过完成任务或在商店中购买获得。","english":"YOU WILL RECEIVE 1O INITIAL LIVES EACHDAY, AND FOR EVERY 30 MINUTES SPENTONLINE, YOU WILL GAIN AN ADDITIONAL 1LIVE.\nLIVES CAN ALSO BE OBTAINED THROUGHCOMPLETING TASKS OR PURCHASE INSHOP."},{"id":57,"chinese":"每日挑战将在小时分钟后重置","english":"DAILY CHALLENGEWILL BE RESET AFTER H:M"},{"id":58,"chinese":"完成挑战时间最短的玩家将进入排行榜，并且完成挑战可以获得物品奖励。","english":"THE PLAYER WITH THE SHORTEST COMPLETION TIME WILL ENTER THE LEAD-ERBOARD,COMPLETE CHALLENGES TOEARN ITEM REWARDS."},{"id":59,"chinese":"创建等级提升到","english":"CREATE LEVEL UP T"},{"id":60,"chinese":"每日挑战将在&1后重置。","english":"DAILY CHALLENGEWILL BE RESET AFTER 10H:10M"},{"id":61,"chinese":"完成时间最短的玩家将进入排行榜，完成挑战以获得物品奖励。","english":"THE PLAYER WITH THE SHORTEST COM-PLETION TIME WILL ENTER THE LEAD-ERBOARD,COMPLETE:CHALLENGES TOEARN ITEM REWARDS."},{"id":62,"chinese":"绑定","english":"CONNECT"},{"id":63,"chinese":"解锁绑定","english":"DISCONNECT"},{"id":64,"chinese":"金币收益","english":"GOLD YIELD"},{"id":65,"chinese":"购买物品","english":"PURCHASE ITEMS"},{"id":66,"chinese":"提示","english":"TIP"},{"id":67,"chinese":"购买二级提示","english":"SHIFT ITEM"},{"id":68,"chinese":"金币不足","english":"Insufficient gold coins"},{"id":69,"chinese":"道具无法使用","english":"Item cannot be used"},{"id":70,"chinese":"退出关卡","english":"Exit the level"},{"id":71,"chinese":"体力不足","english":"Insufficient stamina"},{"id":72,"chinese":"购买后立即获得&3硬币","english":"Receive &3 coins immediately after purchase"},{"id":73,"chinese":"移出一个图形","english":"Remove a shape"},{"id":74,"chinese":"撤回上一个图形","english":"Undo the last shape"},{"id":75,"chinese":"重新打乱图形","english":"Reshuffle the shapes"},{"id":76,"chinese":"下一关","english":"NEXT"}]
    public static getDesStrById(id:number){
        let lang = LanauageManager.languageData[id-1];
        let str:string = "";
        if (lang){
            if (LanauageManager.languageType == 1){
                str = lang.english;
            }
            else if (LanauageManager.languageType == 2){
                str = lang.chinese;
            }
        }
        return str;
    }

    public static shopItemList = [{"id":1,"tip":"boost","nameId":25,"desId":24,"icon":"bosst","coinNum":100,"coinType":1,"canUse":true,"is_shop":true},{"id":2,"tip":"offline","nameId":23,"desId":26,"icon":"offline","coinNum":200,"coinType":1,"canUse":true,"is_shop":true},{"id":3,"tip":"体力","nameId":22,"desId":55,"icon":"hpIcon","coinNum":300,"coinType":1,"canUse":false,"is_shop":true},{"id":4,"tip":"coin","nameId":21,"desId":72,"icon":"coinIcon","coinNum":400,"coinType":1,"canUse":false,"is_shop":true},{"id":5,"tip":"移出道具","nameId":11,"desId":73,"icon":"moveout","coinNum":500,"coinType":2,"canUse":false,"is_shop":true},{"id":6,"tip":"撤回","nameId":12,"desId":74,"icon":"revoke","coinNum":600,"coinType":2,"canUse":false,"is_shop":true},{"id":7,"tip":"洗牌","nameId":13,"desId":75,"icon":"Rearrange","coinNum":700,"coinType":2,"canUse":false,"is_shop":true},{"id":8,"tip":"金币","nameId":21,"desId":"","icon":"coin1","coinNum":"","coinType":"","canUse":"","is_shop":false},{"id":9,"tip":"经验","nameId":39,"desId":"","icon":"exp","coinNum":"","coinType":"","canUse":"","is_shop":false}]

    public static getShopItemData(id:number){
        for (let index = 0; index < LanauageManager.shopItemList.length; index++) {
            let element = LanauageManager.shopItemList[index];
            if (element.id == id){
                return element;
            }
        }
        return null;
    }

    public static loadImage(url: string, spr:Sprite) {   
        resources.load(url + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {  
            if (err) {  
                console.error(err);  
                return;  
            }  
            spr.spriteFrame = spriteFrame;
        });  
    } 

    public static getCoinNumString(coinNum:number = 0){
        let num = coinNum;

        if (num == 0){
            num = gameData.saveData.coin;
        }
        const units = ['', 'K', 'M', 'G', 'T', 'P', 'E'];  
        
        let unitIndex = 0;  
        while (num >= 1000 && unitIndex < units.length - 1) {  
            num /= 1000;  
            unitIndex++;  
        }  

        let coinStr = num.toFixed(3);

        num = Number(coinStr);

        return num.toString() + units[unitIndex]; 
    }

    public static getCoinNumByType(type:number){
        let num:number = 0
        if (type == coinType.coin1){
            num = gameData.saveData.coin;
        }
        else if (type == coinType.coin2){
            num = gameData.saveData.coin2;
        }
        else if (type == coinType.coin3){
            num = gameData.saveData.coin3;
        }
        return num;
    }
}

export class ShopItemData{

    id:number;

    nameId:number;

    desId:number;

    icon:string;

    coinNum:number;

    coinType:number;

    canUse:boolean;

    is_shop:boolean;
}

