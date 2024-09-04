import { _decorator, Component, EventTarget, Node, resources, Sprite, SpriteFrame } from 'cc';
import { coinType, gameData } from './gameData';
import { EventManger } from './EventManger';
import { TgManager } from './TgManager';
const { ccclass, property } = _decorator;

@ccclass('LanauageManager')
export class LanauageManager {

    public static languageType:number = 2;

    public static popupLabelType:number = 1;

    public static popupCommonlType:number = 1;

    public static shopConfig = []

    public static taskConfig = [];

    public static languageConfig = [{"id":1,"chinese":"在不远的未来，数字货币已经成为全球经济的核心，这里是数字货币交易中心，每一位数字货币狂热爱好者都汇聚到了这里，应对各种挑战，收集更多的数字资产，成为数字货币大亨。","english":"In the not-so-distant future, digital currency has become the core of the global economyTelegramlegrams the digital currency trading center, where every digital currency enthusiast has come together to face various challenges, collect more digital assets, and become a digital currency tTelegram","notes":"NA"},{"id":2,"chinese":"loading...Play to Airdrop","english":"loading...Play to Airdrop","notes":""},{"id":3,"chinese":"Start Collecting","english":"Start Collecting","notes":""},{"id":4,"chinese":"任务","english":"Task","notes":""},{"id":5,"chinese":"排行","english":"Rank","notes":""},{"id":6,"chinese":"分享","english":"Share","notes":""},{"id":7,"chinese":"商店","english":"Shop","notes":""},{"id":8,"chinese":"设置","english":"Setting","notes":""},{"id":9,"chinese":"背包","english":"Bag","notes":""},{"id":10,"chinese":"每日挑战","english":"Daily Challenge","notes":""},{"id":11,"chinese":"移出","english":"MoveOut","notes":""},{"id":12,"chinese":"撤销","english":"Revoke","notes":""},{"id":13,"chinese":"重排","english":"Rearrange","notes":""},{"id":14,"chinese":"- 当前收益率：&0.01% / s\\n- 在线即可自动产出金币，收入 = 金币 × 收益率\\n- 玩家等级越高，收益率越高","english":"- Current earning rate: &0.01% / s\\n- Keep online to auto-earn coins, income = coin * earning rate\\n- higher your level, higher the earning rate","notes":""},{"id":15,"chinese":"音乐","english":"Music","notes":""},{"id":16,"chinese":"音效","english":"Sound","notes":""},{"id":17,"chinese":"访问官网","english":"Visit Our Website","notes":""},{"id":18,"chinese":"每日挑战","english":"Daily Challenge","notes":"NA"},{"id":19,"chinese":"- 每日挑战将在&13:32:37后重置\\n- 通关每日挑战可以获得加速卡和离线卡道具。","english":"- The daily challenge stage will reset in &13:32:37\\n- Complete the daily challenge stage to earn boost Cards and Offline Cards","notes":"NA"},{"id":20,"chinese":"Boss Attack","english":"Boss Attack","notes":""},{"id":21,"chinese":"金币","english":"Coin","notes":""},{"id":22,"chinese":"体力","english":"Life","notes":"复数lives"},{"id":23,"chinese":"离线卡","english":"Offline Card","notes":""},{"id":24,"chinese":"在你离线后，你的金币将继续增加，持续4小时。","english":"After going offline, your will continue to earn coins for 4 hours.","notes":""},{"id":25,"chinese":"加速卡","english":"Boost Card","notes":""},{"id":26,"chinese":"当你在线时，你的金币收益率将翻倍，持续4小时。","english":"When you are online, your coin's earning rate will be doubled for 4 hours.","notes":""},{"id":27,"chinese":"返回","english":"Back","notes":""},{"id":28,"chinese":"资产","english":"Assets","notes":""},{"id":29,"chinese":"邀请","english":"Invites","notes":""},{"id":30,"chinese":"每日挑战","english":"Daily Challenge","notes":""},{"id":31,"chinese":"关卡","english":"Stage","notes":""},{"id":32,"chinese":"确认使用道具吗?","english":"Confirm to use this item？","notes":""},{"id":33,"chinese":"确认","english":"YES","notes":""},{"id":34,"chinese":"取消","english":"NO","notes":""},{"id":35,"chinese":"难度升级","english":"Difficulty Upgrade","notes":"","__EMPTY_1":"PURCHASE ITEMS"},{"id":36,"chinese":"挑战成功","english":"Challenge Succeed","notes":""},{"id":37,"chinese":"用时","english":"Time Taken","notes":""},{"id":38,"chinese":"恭喜你获胜","english":"Congratulations on Winning","notes":""},{"id":39,"chinese":"经验","english":"EXP","notes":""},{"id":40,"chinese":"挑战失败","english":"Challenge Failed","notes":""},{"id":41,"chinese":"再试一次","english":"Try Again","notes":""},{"id":42,"chinese":"每日任务","english":"Daily Tasks","notes":""},{"id":43,"chinese":"特殊任务","english":"Special Tasks","notes":""},{"id":44,"chinese":"领取","english":"Claim","notes":""},{"id":45,"chinese":"已领取","english":"Claimed","notes":""},{"id":46,"chinese":"未完成","english":"Incompleted","notes":""},{"id":47,"chinese":"每日登录","english":"Daily Login","notes":""},{"id":48,"chinese":"每日通关","english":"Daily Complition","notes":""},{"id":49,"chinese":"每日购买","english":"Daily Purchase","notes":""},{"id":50,"chinese":"每日邀请","english":"Daily Invitation","notes":""},{"id":51,"chinese":"Join Coincraze,collecting crypto-coins!","english":"Join Coincraze,collecting crypto-coins!","notes":""},{"id":52,"chinese":"Congratulations!You conquered dauly challenge.","english":"Congratulations!You conquered dauly challenge.","notes":""},{"id":53,"chinese":"用时: &30 s","english":"Time Taken: &30 s","notes":""},{"id":54,"chinese":"购买","english":"Purchase","notes":""},{"id":55,"chinese":"每次游戏消耗1点体力","english":"Each play consumes 1 life","notes":""},{"id":56,"chinese":"- 每天10点免费体力\\n- 每在线10分钟获得1点体力\\n- 完成任务可领取大量体力\\n- 商店可以购买体力","english":"- 10 free lives daily\\n- Earn 1 life for every 10 minutes online\\n- Complete tasks to claim more lives\\n- lives can be purchased in the shop","notes":""},{"id":57,"chinese":"每日挑战将在小时分钟后重置","english":"DAILY CHALLENGEWILL BE RESET AFTER H:M","notes":"NA"},{"id":58,"chinese":"完成挑战时间最短的玩家将进入排行榜，并且完成挑战可以获得物品奖励。","english":"THE PLAYER WITH THE SHORTEST COMPLETION TIME WILL ENTER THE LEAD-ERBOARD,COMPLETE CHALLENGES TOEARN ITEM REWARDS.","notes":"NA"},{"id":59,"chinese":"Great!\\nLevel up to &5","english":"Great!\\nLevel up to &5","notes":""},{"id":60,"chinese":"每日挑战将在&13:32:37后重置","english":"The daily challenge stage will reset in &13:32:37","notes":""},{"id":61,"chinese":"通关每日挑战可以获得加速卡和离线卡道具,并进入每日挑战排行榜。","english":"Completing the daily challenge earns you Boost Cards and Offline Cards, and you enter the daily challenge Rank.","notes":""},{"id":62,"chinese":"绑定","english":"Connect","notes":""},{"id":63,"chinese":"解绑","english":"Disconnect","notes":""},{"id":64,"chinese":"金币收益","english":"Coin Earning","notes":""},{"id":65,"chinese":"购买物品","english":"Purchase","notes":""},{"id":66,"chinese":"提示","english":"Tips","notes":""},{"id":67,"chinese":"购买二级提示","english":"SHIFT ITEM","notes":"不知道是用在哪里"},{"id":68,"chinese":"金币不足","english":"Insufficient coins","notes":""},{"id":69,"chinese":"道具无法使用","english":"Item cannot be used","notes":""},{"id":70,"chinese":"退出关卡","english":"Exit the stage","notes":""},{"id":71,"chinese":"体力不足","english":"Insufficient lives","notes":""},{"id":72,"chinese":"购买后立即获得1000硬币","english":"Receive 1000 coins immediately after purchase","notes":""},{"id":73,"chinese":"移出一个图标","english":"Move a icon out","notes":""},{"id":74,"chinese":"撤销上一个动作","english":"Undo the last action","notes":""},{"id":75,"chinese":"重新排列图标区","english":"Rearrange the icon pool","notes":""},{"id":76,"chinese":"Next","english":"Next","notes":""},{"id":77,"chinese":"X","english":"X","notes":""},{"id":78,"chinese":"Telegram","english":"Telegram","notes":""},{"id":79,"chinese":"邀请链接","english":"Invite link","notes":""},{"id":80,"chinese":"邀请数","english":"Invites","notes":""},{"id":81,"chinese":"通关时间","english":"Time Taken","notes":""},{"id":82,"chinese":"击败全球&1的玩家","english":"Defeat &1 of players worldwide","notes":""},{"id":83,"chinese":"道具次数已用完","english":"Item usage limit reached","notes":""},{"id":84,"chinese":"道具不足","english":"Insufficient items","notes":""},{"id":85,"chinese":"每日分享","english":"Daily Share","notes":""},{"id":86,"chinese":"未完成","english":"Incomplete","notes":""},{"id":87,"chinese":"已完成","english":"Completed","notes":""},{"id":88,"chinese":"未达成","english":"Not Achieved","notes":""},{"id":89,"chinese":"去分享","english":"Go Share","notes":""},{"id":90,"chinese":"绑定钱包","english":"Connect Wallet","notes":""},{"id":91,"chinese":"加入TG频道","english":"Join TG Channel","notes":""},{"id":92,"chinese":"绑定X账号","english":"Connect X","notes":""},{"id":93,"chinese":"关注官方X","english":"Follow our X","notes":""},{"id":94,"chinese":"首次充值","english":"First Purchase","notes":""},{"id":95,"chinese":"访问官网","english":"Visit Website","notes":""},{"id":96,"chinese":"成为TG会员","english":"Become TG Premium","notes":""},{"id":97,"chinese":"每日登录","english":"Daily Login","notes":""},{"id":98,"chinese":"每日通关","english":"Daily Completion","notes":""},{"id":99,"chinese":"每日消费","english":"Daily Purchase","notes":""},{"id":100,"chinese":"每日邀请","english":"Daily Invite","notes":""},{"id":101,"chinese":"每日分享","english":"Daily Share","notes":""},{"id":102,"chinese":"每日挑战","english":"Daily Challenge","notes":""},{"id":103,"chinese":"打败全球&1%的玩家","english":"Defeat &1% of players worldwide","notes":""},{"id":104,"chinese":"去完成","english":"Go Complete","notes":""},{"id":105,"chinese":"TON","english":"TON","notes":""},{"id":106,"chinese":"USDT","english":"USDT","notes":""},{"id":107,"chinese":"优惠","english":"Discount","notes":""},{"id":108,"chinese":"购买成功","english":"Purchase Succeed","notes":""},{"id":109,"chinese":"&1 生效中，无法使用道具","english":"&1 active, unable to use another","notes":""},{"id":110,"chinese":"基础任务","english":"Basic task","notes":"NA"},{"id":111,"chinese":"每日转发","english":"Repost","notes":""},{"id":112,"chinese":"转发我们的最新的X帖子","english":"Repost our latest X post","notes":"（每日转发这个功能，从X API获得我们最新\n推文链接 ,只要这篇推文是被用户所绑定的X账户repost状态，用户每天都可以领取这个奖励，如果不是就提示去完成，点击后跳转到我们的推文链接如：https://x.com/coincraze_labs/status/1829447307651424360）"},{"id":113,"chinese":"绑定你的加密钱包,未来可领取空投","english":"Connect your crypto wallet to receive future airdrops","notes":""},{"id":114,"chinese":"加入Telegram社区","english":"Join our Telegram community","notes":""},{"id":115,"chinese":"连接你的X账户","english":"Connect your X accout","notes":""},{"id":116,"chinese":"在X上关注我们","english":"Follow us on X","notes":""},{"id":117,"chinese":"在商店完成首次USD购买","english":"Complete first purchase with USD in the shop","notes":""},{"id":118,"chinese":"访问我们的官方网站了解更多信息","english":"Visit our official website to learn more","notes":""},{"id":119,"chinese":"获取Telegram会员","english":"Upgrade your Telegram to premium","notes":""},{"id":120,"chinese":"通过任意关卡 &1","english":"Complete any stage &1","notes":"有三阶段 1/1  5/5   10/10,完成后进入下一阶段"},{"id":121,"chinese":"在商店用USD购买道具","english":"Purchase USD items in the shop","notes":""},{"id":122,"chinese":"发送邀请链接给好友 &1","english":"Send your invite link to friends &1","notes":"有三阶段 1/1  5/5   10/10,完成后进入下一阶段"},{"id":123,"chinese":"邀请：将你的邀请链接发送到 Telegram&1","english":"invite: Send your invitation link to Telegram&1","notes":"NA"},{"id":124,"chinese":"邀请：将你的邀请链接发送到 Telegram&1","english":"invite: Send your invitation link to Telegram&1","notes":"NA"},{"id":125,"chinese":"将你的海报分享到X","english":"Share your profile to X","notes":""},{"id":126,"chinese":"完成每日挑战","english":"Complete daily challenge","notes":""},{"id":127,"chinese":"道具使用成功","english":"Item use successful","notes":""},{"id":128,"chinese":"领取离线金币收益&1","english":"Claim offline coin earnings &1","notes":""},{"id":129,"chinese":"当前等级：&1\\n经验值通过消除图标和通过关卡获得","english":"Current level:&1 \\ n Experience points obtained by eliminating icons and passing levels","notes":""},{"id":130,"chinese":"道具不足，去购买","english":"Item insufficient, go to shop","notes":""},{"id":131,"chinese":"你已经通关每日挑战，请等待重置","english":"You have completed the daily challenge, please wait for the reset。","notes":""},{"id":132,"chinese":"是否前往绑定X","english":"Do you want to go and bind X","notes":"NA"}]
   
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
        return str.replace(/\\n/g, "\n");
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
        let unitIndex = 0;   

        const units = ['', 'k', 'm', 'b'];  
        let num1 = 1000;
        if (num > 9999999999999.99){
            unitIndex = 3
            num1 = 1000000000;
        }else if (num > 9999999999.99){
            unitIndex = 2
            num1 = 1000000;
        }else if (num > 9999999.99){
            unitIndex = 1
            num1 = 1000;
        }else{
            return LanauageManager.roundToTwoDecimals(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        num = Number(LanauageManager.roundToTwoDecimals(num/num1).toString());  
        let  goldNum = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return goldNum + units[unitIndex]; 
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
        // if (data.is_daily){
            if (gameData.saveData.daily_task_isRecive.indexOf(data.id) >= 0){
                return 3
            }else if (gameData.saveData.daily_task.indexOf(data.id) >= 0){
                return 2
            }
        // }else{
            if (gameData.saveData.detail_task_isRecive.indexOf(data.id) >= 0){
                return 3
            }else if (gameData.saveData.detail_task.indexOf(data.id) >= 0){
                return 2
            }
        // }
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

    public static playSound(index:number = 0){
        EventManger.eventTarget.emit(EventManger.EEventName.PLAY_SOUND_INDEX, index)
    }

    public static copyText(str:string){
        LanauageManager.playSound();
        try {  
            var successful = document.execCommand(str);  
            var msg = successful ? 'successful' : 'unsuccessful';  
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("copy success")) 
        } catch (err) {  
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("copy fail"))   
        } 
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
