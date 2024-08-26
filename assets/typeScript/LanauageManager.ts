import { _decorator, Component, EventTarget, Node, resources, Sprite, SpriteFrame } from 'cc';
import { coinType, gameData } from './gameData';
const { ccclass, property } = _decorator;

@ccclass('LanauageManager')
export class LanauageManager {

    public static languageType:number = 2;

    public static popupLabelType:number = 1;

    public static popupCommonlType:number = 1;

    public static shopConfig = []

    public static taskConfig = [];

    public static languageConfig = [{"id":1,"chinese":"在不远的未来，数字货币已经成为全球经济的核心，这里是数字货币交易中心，每一位数字货币狂热爱好者都汇聚到了这里，应对各种挑战，收集更多的数字资产，成为数字货币大亨。","english":"In the not-so-distant future, digital currency has become the core of the global economy. This is the digital currency trading center, where every digital currency enthusiast has come together to face various challenges, collect more digital assets, and become a digital currency tycoon."},{"id":2,"chinese":"加载中...玩赚空投","english":"loading...play for airdrops"},{"id":3,"chinese":"开始挑战","english":"Start challenging"},{"id":4,"chinese":"任务","english":"Task"},{"id":5,"chinese":"排行","english":"Ranking"},{"id":6,"chinese":"分享","english":"Share"},{"id":7,"chinese":"商店","english":"Shop"},{"id":8,"chinese":"设置","english":"Setting"},{"id":9,"chinese":"背包","english":"BackPack"},{"id":10,"chinese":"日常挑战","english":"daily challenge"},{"id":11,"chinese":"移出道具","english":"move out"},{"id":12,"chinese":"撤回","english":"revoke"},{"id":13,"chinese":"洗牌","english":"Rearrange"},{"id":14,"chinese":"当前收益率：0.01%/5金币将根据您在线时的收益率而增加。水平越高，收益率越高。","english":"CURRENT EARNING RATE :0.01%/5COINS WILL INCREASE ACCORDING TOTHE EARNING RATE WHEN YOUR AREONLINE.HIGHER THE LEVEL ,HIGHER THE EARNINGRATE."},{"id":15,"chinese":"音乐","english":"Music"},{"id":16,"chinese":"音效","english":"Sound"},{"id":17,"chinese":"访问官网","english":"VISIT OUR WEBSITE"},{"id":18,"chinese":"规则说明","english":"RULE SPECIFICATION"},{"id":19,"chinese":"你将获得一张“离线卡”，它能在你离开游戏时提升你的金币。通过完成每日挑战可以获得这张卡。每日挑战将在00:00 UTC刷新，每天只能完成一次。","english":"YOU WILL GET AN AFK CARD THAT BOOSTSYOUR COINS UP WHILE YOU'RE AWAY FROMTHE GAME BY PASSING DAILY CHALLENGE\nDAILY CHALLENGE WILL BE REFRESHED AT00:0O UTC AND YOU CAN ONLY COMPLETETHE DAILY CHALLENGE ONCE EACH DAY"},{"id":20,"chinese":"BOSS关卡","english":"BOSS'Attack"},{"id":21,"chinese":"硬币","english":"coin"},{"id":22,"chinese":"体力","english":"Live"},{"id":23,"chinese":"离线收益卡","english":"Offline Card"},{"id":24,"chinese":"在你离线后，你的金币将继续增加，持续4小时。","english":"After you going offline, your coins will continue to increase for a duration of 4 hours."},{"id":25,"chinese":"在线收益卡","english":"Boost Card"},{"id":26,"chinese":"当你在线时，你的金币收入速率将在2小时内翻倍。","english":"when you are online, your coin's earning rate will be doubled  for a duration of 2 hours."},{"id":27,"chinese":"返回","english":"Back"},{"id":28,"chinese":"资产","english":"Assets"},{"id":29,"chinese":"邀请","english":"Invitation"},{"id":30,"chinese":"每日挑战","english":"Daily Challenge"},{"id":31,"chinese":"关卡","english":"Stage"},{"id":32,"chinese":"确认使用道具吗?","english":"CONFIRM THE USE OF PROPS?"},{"id":33,"chinese":"确认","english":"YES"},{"id":34,"chinese":"取消","english":"NO"},{"id":35,"chinese":"难度升级","english":"OIFECULTYUPGRADE","chinese_1":"PURCHASE ITEMS"},{"id":36,"chinese":"挑战成功","english":"CHALLENGE SUCCESS"},{"id":37,"chinese":"用时","english":"TIME TAKEN"},{"id":38,"chinese":"恭喜你获胜","english":"CONGRATULATIONS ON WINNING"},{"id":39,"chinese":"经验","english":"EXP"},{"id":40,"chinese":"挑战失败","english":"CHALLENGE FAILEO"},{"id":41,"chinese":"再试一次","english":"TRY AGAIN"},{"id":42,"chinese":"每日任务","english":"DAILY TASK"},{"id":43,"chinese":"特殊任务","english":"SPECIAL TASK"},{"id":44,"chinese":"领取","english":"CLAIM"},{"id":45,"chinese":"已领取","english":"CLAIMEO"},{"id":46,"chinese":"未完成","english":"NOT YET ACHIEVED"},{"id":47,"chinese":"每日登录","english":"DAILY LOGIN"},{"id":48,"chinese":"每日通关","english":"DAILY COMPLETION"},{"id":49,"chinese":"每日购买","english":"DAILY PURCHASE"},{"id":50,"chinese":"每日邀请","english":"DAILY INVITATION"},{"id":51,"chinese":"加入 CoineraZe!收集加密货币","english":"JOIN COINERAZE!COLLECTING CRYPTO-COINS."},{"id":52,"chinese":"恭喜!你征服了每日挑战","english":"CONGRATULATIONS!YOU CONQUEREDDAILY CHALLENGE"},{"id":53,"chinese":"用时&2","english":"TIME TAKEN&2"},{"id":54,"chinese":"购买物品","english":"PURCHASE ITEM"},{"id":55,"chinese":"每次游戏消耗1条体力","english":"EACH PLAYING CONSUMES 1 LIVE"},{"id":56,"chinese":"你每天将获得10条初始体力，每在线30分钟，你将获得额外1条体力。体力也可以通过完成任务或在商店中购买获得。","english":"YOU WILL RECEIVE 1O INITIAL LIVES EACHDAY, AND FOR EVERY 30 MINUTES SPENTONLINE, YOU WILL GAIN AN ADDITIONAL 1LIVE.\nLIVES CAN ALSO BE OBTAINED THROUGHCOMPLETING TASKS OR PURCHASE INSHOP."},{"id":57,"chinese":"每日挑战将在小时分钟后重置","english":"DAILY CHALLENGEWILL BE RESET AFTER H:M"},{"id":58,"chinese":"完成挑战时间最短的玩家将进入排行榜，并且完成挑战可以获得物品奖励。","english":"THE PLAYER WITH THE SHORTEST COMPLETION TIME WILL ENTER THE LEAD-ERBOARD,COMPLETE CHALLENGES TOEARN ITEM REWARDS."},{"id":59,"chinese":"创建等级提升到","english":"CREATE LEVEL UP T"},{"id":60,"chinese":"每日挑战将在&1后重置。","english":"DAILY CHALLENGEWILL BE RESET AFTER 10H:10M"},{"id":61,"chinese":"完成时间最短的玩家将进入排行榜，完成挑战以获得物品奖励。","english":"THE PLAYER WITH THE SHORTEST COM-PLETION TIME WILL ENTER THE LEAD-ERBOARD,COMPLETE:CHALLENGES TOEARN ITEM REWARDS."},{"id":62,"chinese":"绑定","english":"CONNECT"},{"id":63,"chinese":"解锁绑定","english":"DISCONNECT"},{"id":64,"chinese":"金币收益","english":"GOLD YIELD"},{"id":65,"chinese":"购买物品","english":"PURCHASE ITEMS"},{"id":66,"chinese":"提示","english":"TIP"},{"id":67,"chinese":"购买二级提示","english":"SHIFT ITEM"},{"id":68,"chinese":"金币不足","english":"Insufficient gold coins"},{"id":69,"chinese":"道具无法使用","english":"Item cannot be used"},{"id":70,"chinese":"退出关卡","english":"Exit the level"},{"id":71,"chinese":"体力不足","english":"Insufficient stamina"},{"id":72,"chinese":"购买后立即获得1000硬币","english":"Receive 1000 coins immediately after purchase"},{"id":73,"chinese":"移出一个图形","english":"Remove a shape"},{"id":74,"chinese":"撤回上一个图形","english":"Undo the last shape"},{"id":75,"chinese":"重新打乱图形","english":"Reshuffle the shapes"},{"id":76,"chinese":"下一关","english":"NEXT"},{"id":77,"chinese":"推特","english":"TWITTER"},{"id":78,"chinese":"电报","english":"TELERRAM"},{"id":79,"chinese":"邀请链接","english":"INVITATION LINK"},{"id":80,"chinese":"邀请数量","english":"number of invitations"},{"id":81,"chinese":"通关时间","english":"clearance time"},{"id":82,"chinese":"击败全国&1的玩家","english":"Defeat &1 of players nationwide"},{"id":83,"chinese":"该道具已达使用上限","english":"This item has reached its usage limit"},{"id":84,"chinese":"道具不足","english":"Insufficient items"},{"id":85,"chinese":"每日分享","english":"Daily share"},{"id":86,"chinese":"未完成","english":"Incomplete"},{"id":87,"chinese":"已完成","english":"Completed"},{"id":88,"chinese":"未达成","english":"Not achieved"},{"id":89,"chinese":"去分享","english":"Go share"},{"id":90,"chinese":"绑定钱包","english":"connectwallet"},{"id":91,"chinese":"加入TG频道","english":"Join Channel"},{"id":92,"chinese":"关联twitter","english":"Connect Twitter"},{"id":93,"chinese":"关注twitter官方账号","english":"Follow Twitter"},{"id":94,"chinese":"首次充值消费","english":"First purchase"},{"id":95,"chinese":"访问官网","english":"Visit website"},{"id":96,"chinese":"成为tg会员","english":"Telegram Premium"},{"id":97,"chinese":"每日登录","english":"login"},{"id":98,"chinese":"每日通关","english":"completion"},{"id":99,"chinese":"每日消费","english":"purchase"},{"id":100,"chinese":"每日邀请好友","english":"invite"},{"id":101,"chinese":"每日分享TG","english":"share TG"},{"id":102,"chinese":"每日挑战","english":"challenge"},{"id":103,"chinese":"超过全球&1%的玩家","english":"Top &1% of players worldwide"},{"id":104,"chinese":"去完成","english":"Go complete"},{"id":105,"chinese":"TON","english":"TON"},{"id":106,"chinese":"USDT","english":"USDT"},{"id":107,"chinese":"优惠","english":"OFF"},{"id":108,"chinese":"购买成功","english":"Purchase successful"},{"id":109,"chinese":"&1生效中，无法使用道具","english":"&1Currently effective, unable to use items"},{"id":110,"chinese":"基础任务","english":"Basic task"},{"id":111,"chinese":"每日转发","english":"repost"},{"id":112,"chinese":"转发我们的 Twitter 帖子","english":"repost our Twitter posts"},{"id":113,"chinese":"连接你的加密钱包地址以领取空投","english":"connectyour crypto wallet address to claim airdrop"},{"id":114,"chinese":"加入我们的 Telegram 频道","english":"Join our Telegram Channel"},{"id":115,"chinese":"连接你的 Twitter 账户","english":"Connect your Twitter accout"},{"id":116,"chinese":"在 Twitter 上关注我们","english":"Follow us on Twitter"},{"id":117,"chinese":"在商店完成首次用 USD 的购买","english":"Complete first purchase with USD in the shop"},{"id":118,"chinese":"访问我们的官方网站了解更多信息","english":"visit our official website to learn more"},{"id":119,"chinese":"升级你的 Telegram 账户","english":"upgrade your telegram account"},{"id":120,"chinese":"每日完成阶段&1","english":"daily completed stage&1"},{"id":121,"chinese":"每日在商店用 USD 购买","english":"daily purchase with USD in the shop"},{"id":122,"chinese":"邀请：将你的邀请链接发送到 Telegram &1","english":"invite: Send your invitation link to Telegram &1"},{"id":123,"chinese":"邀请：将你的邀请链接发送到 Telegram &1","english":"invite: Send your invitation link to Telegram &1"},{"id":124,"chinese":"邀请：将你的邀请链接发送到 Telegram &1","english":"invite: Send your invitation link to Telegram&1"},{"id":125,"chinese":"将你的海报分享到 Twitter","english":"share your poster to twitter"},{"id":126,"chinese":"完成每日挑战阶段","english":"complete daily challenge stage"},{"id":127,"chinese":"道具使用成功","english":"Prop successfully used"},{"id":128,"chinese":"领取离线奖励&1","english":"Claim offline rewards &1"}]
    
    public static getDesStrById(id:number){
        let lang = LanauageManager.languageConfig[id-1];
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

    public static getShopItemData(id:number){
        for (let index = 0; index < LanauageManager.shopConfig.length; index++) {
            let element = LanauageManager.shopConfig[index];
            if (element.id == id){
                return element;
            }
        }
        return null;
    }

    public static getItemNumById(id:number):number{
        for (let index = 0; index < gameData.saveData.backList.length; index++) {
            let element = gameData.saveData.backList[index];
            if (element.id == id){
                return element.num;
            }
        }
        return 0;
    }

    public static getTaskDataById(id:number):taskItemData{
        for (let index = 0; index < LanauageManager.taskConfig.length; index++) {
            let element = LanauageManager.taskConfig[index];
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

    public static roundToTwoDecimals(num: number): number {  
        return Math.floor(num * 100) / 100;  
    } 

    public static getCoinNumString(coinNum:number = 0){
        let num = coinNum;

        if (num == 0){
            num = gameData.saveData.coin;
        }
        if (num < 100000){
            
            return LanauageManager.roundToTwoDecimals(num).toString();
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
            num = gameData.saveData.coin2;
        }
        else if (type == coinType.coin2){
            num = gameData.saveData.coin;
        }
        else if (type == coinType.coin3){
            num = gameData.saveData.coin3;
        }
        return num;
    }

    //1 not, 2 complete ,3 received
    public static getTaskState(id:number):number{
        let data:taskItemData = LanauageManager.getTaskDataById(id);
        if (data.is_daily){
            if (gameData.saveData.daily_task_isRecive.indexOf(data.id) >= 0){
                return 3
            }else if (gameData.saveData.daily_task.indexOf(data.id) >= 0){
                return 2
            }
        }else{
            if (gameData.saveData.detail_task_isRecive.indexOf(data.id) >= 0){
                return 3
            }else if (gameData.saveData.detail_task.indexOf(data.id) >= 0){
                return 2
            }
        }
        return 1;
    }

    //1 not, 2 complete
    public static getTaskIsComplete(id:number):boolean{
        let data:taskItemData = LanauageManager.getTaskDataById(id);
        if (gameData.saveData.detail_task.indexOf(data.id) >= 0){
            return true
        }
        if (gameData.saveData.daily_task.indexOf(data.id) >= 0){
            return true
        }
        return false;
    }
}

export class ShopItemData{

    id:number;

    tip:string;

    proinfo:string;

    name_id:number;

    des_id:number;

    icon:string;

    coin_num:number;

    coin_type:number;

    can_use:boolean;

    is_shop:boolean;

    is_tip:boolean;
}

export class taskItemData{

    id:number;

    name_id:number;

    des_id:number;

    reward:number[];

    reward_num:number[];

    task_type:number;

    task_num:number;

    is_daily:boolean;

    btn_id:number = 0
}

export class randItemData{

    user_id:number;

    username:string;

    avatar:string;

    num:number;

    rank:number;
}

