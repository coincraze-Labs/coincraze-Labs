import { _decorator, Component, EventTarget, Node, resources, Sprite, SpriteFrame } from 'cc';
import { coinType, gameData, popupCommonType } from './gameData';
import { HttpClient } from './net/HttpClient';
import { EventManger } from './EventManger';
import { LanauageManager } from './LanauageManager';
import { UIManager } from './UIManager';
// import { TonTransferRequest } from '../plugin/package/dist/common/game-fi';
// import { GameFi } from '../plugin/package/dist/cocos/src';
// import { Address, toNano, TonConnectUI } from '../plugin/package/dist';
const { ccclass, property } = _decorator;

export interface TonAddressConfig {
    tonAddress: string,
    jettonAddress?: string;
}

@ccclass('TgManager')
export class TgManager {

    public static shareUrl0 = "https://t.me/share/url?url=";

    public static shareUrl =  "https://t.me/coin_craze_bot/coincraze?startapp=" //"https://t.me/szxsssBot/coinapp?startapp=";

    public static channelUrl = "https://t.me/Coincraze_Ann";

    public static wibsiteUrl = "https://www.coincraze.ai/";

    public static teVipUrl = "https://t.me/premium"

    public static followTwitterUrl = "https://x.com/intent/follow?screen_name=coincraze_labs";

    public static connectTwitterUrl = "https://twitter.com/i/oauth2/authorize?client_id=MTYxV093bkVDb0ZsN3ZOWlBlUkI6MTpjaQ&code_challenge=J4iC-7aBZccUpaVPpt0yWGjPvOxr-XtxYGOu15RvNjY&code_challenge_method=S256&redirect_uri=https%3A%2F%2Fapi.coincraze.ai%2Fapi%2Fcallback&response_type=code&scope=users.read+tweet.read&state=K2V7mvaEoFvaZHi1LD0l2VHVr75alt40Y2xqa5DBZBA___C1_7291599119___"

    public static repostTwitterUrl = "https://x.com/intent/retweet?tweet_id=1563171880046981123";
    // private static _gameFi: GameFi;
    // private static _tonAddressConfig: TonAddressConfig;

    public static connectTwitter(){
        LanauageManager.playSound();

        window.open(TgManager.connectTwitterUrl + gameData.saveData.user_id);

        HttpClient.getInstance().sendTwiteer(1);
    }

    public static disConnectTwitter(isSend:boolean = false){
        LanauageManager.playSound();

        HttpClient.getInstance().sendTwiteer(5);
    }

    public static followTwitter(){
        // if (!gameData.isBindTwitter){
        //     LanauageManager.popupCommonlType = popupCommonType.connectTwitter;
        //     UIManager.open(UIManager.uiNamePath.popupCommonBtn);
        //     return;
        // }
        LanauageManager.playSound();
        let url = TgManager.followTwitterUrl;
        window.open(url);

        HttpClient.getInstance().sendTwiteer(2);
    }

    public static async connectWallet(){
        LanauageManager.playSound();

        EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT);
    }

    public static disConnectWalletr(){
        LanauageManager.playSound();
        EventManger.eventTarget.emit(EventManger.EEventName.OPEN_TON_CONNNECT);
    }

    public static addVip(){
        LanauageManager.playSound();
        let url = TgManager.teVipUrl;
        window.open(url);
    }

    public static addTelegramChannel(){
        LanauageManager.playSound();
        let url = TgManager.channelUrl;

        window.location.href = url;

        HttpClient.getInstance().sendJoinCommunity();
    }

    public static visitWebsite(){
        LanauageManager.playSound();
        let url = TgManager.wibsiteUrl;
        window.open(url);

        HttpClient.getInstance().sendVisitwebsite();
    }

    public static shareTelegram(){
        LanauageManager.playSound();
        //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("shareTelegram"))

        let url = TgManager.shareUrl0 + TgManager.shareUrl + gameData.saveData.invitId // +"&text=Join Coincraze, collecting crypto coins!"
        let web = window.open(url,'_blank');

       // HttpClient.getInstance().sendDailyshare();
    }

    public static invite(){
        LanauageManager.playSound();
        let url = TgManager.shareUrl0 + TgManager.shareUrl + gameData.saveData.invitId //+"&text=Join Coincraze, collecting crypto coins!"
        window.open(url, '_blank');

        HttpClient.getInstance().sendDailyinvite();
    }

    public static shareTwitter(){
        LanauageManager.playSound();
        var text = "Join Coincraze, collecting crypto coins!";  
        var url = TgManager.shareUrl + gameData.saveData.invitId; // 当前游戏的URL    
    
        var twitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) +   
                        "&url=" + encodeURIComponent(url)// +   
                        // "&via=yourTwitterHandle&" +  
                        // "related=yourTwitterHandle&" +  
                        // "hashtags=YourGameHashtag&" +  
                        // "tw_p=tweetbutton";  
     
        window.open(twitterUrl);  

        HttpClient.getInstance().sendTwiteer(3);

        HttpClient.getInstance().sendDailyshare();
    }

    public static repostTwitter(){
        LanauageManager.playSound();

        let url = TgManager.repostTwitterUrl;
        window.open(url);
        HttpClient.getInstance().sendTwiteer(4);
    }

    public static processURLParameters() {  
        let url = window.location.href;  
        //url = "https://game.coincraze.ai/#tgWebAppData=query_id%3DAAHR46gxAwAAANHjqDF-Xcai%26user%3D%257B%2522id%2522%253A7275602897%252C%2522first_name%2522%253A%2522s%2522%252C%2522last_name%2522%253A%2522zx%2522%252C%2522language_code%2522%253A%2522zh-hans%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1724744537%26hash%3Db1e85e9f88b8b8721af7bb976f35a86912cacf3f24b3edc7bcf5051fbefecd7b&tgWebAppVersion=7.8&tgWebAppPlatform=tdesktop&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%23168acd%22%2C%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23d14e4e%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22secondary_bg_color%22%3A%22%23f1f1f1%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%23168acd%22%2C%22section_separator_color%22%3A%22%23e7e7e7%22%2C%22subtitle_text_color%22%3A%22%23999999%22%2C%22text_color%22%3A%22%23000000%22%7D"
        //url = "https://game.coincraze.ai/#tgWebAppData=query_id%3DAAHA1316AgAAAMDXfXqozsOb%26user%3D%257B%2522id%2522%253A6350034880%252C%2522first_name%2522%253A%2522Coincraze_support%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522Coincraze_support%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1725614808%26hash%3D83132eab6d02abfbe9b683e878be26812ee495a3bf82d147ce11ace23723d001&tgWebAppVersion=7.8&tgWebAppPlatform=tdesktop&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%23168acd%22%2C%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23d14e4e%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22secondary_bg_color%22%3A%22%23f1f1f1%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%23168acd%22%2C%22section_separator_color%22%3A%22%23e7e7e7%22%2C%22subtitle_text_color%22%3A%22%23999999%22%2C%22text_color%22%3A%22%23000000%22%7D"
        const startParam = TgManager.getQueryParam(url, 'tgWebAppStartParam'); 
        console.log(startParam);
        //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("shareid " + startParam))

        //TgManager.downloadTextFile("configurl", url);
        const queryString = url.split('#')[1] || ''; 
        const userData:any = TgManager.parseFragment(queryString);

        if (userData && userData.user && userData.user.id){
            if (userData.user.language_code.includes("zh")){
                //LanauageManager.languageType = 2;
            }
            console.log("language_code: " + userData.user.language_code);
            //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("userid success" + userData.user.id))
            gameData.saveData.user_id = userData.user.id;
            HttpClient.getInstance().sendLogin(userData.user.id, userData.user.first_name, userData.user.last_name, startParam);

            HttpClient.getInstance().sendPremium(userData.user.is_premium ? 1 : 0);
        }else{
            HttpClient.getInstance().sendLogin();

            HttpClient.getInstance().sendPremium(0);
        }
    } 

    static parseFragment(fragmentString) {  
        const params:any = {};  
        const regex = /([^&=]+)=([^&]*)/g;  
        let decoded;  
        let m;  
    
        while ((m = regex.exec(fragmentString)) !== null) {  
            if (m.index === regex.lastIndex) {  
                regex.lastIndex++;  
            }  
            decoded = decodeURIComponent(m[2]);  
            if (m[1] === 'tgWebAppData') {   
                const userDataStr = decoded.split('&').find(p => p.startsWith('user='))?.split('=')[1];  
                if (userDataStr) {  
                    try {  
                        const userData = JSON.parse(decodeURIComponent(userDataStr.replace(/%25/g, '%')));  
                        params.user = userData;  
                    } catch (e) {  
                        console.error('Failed to parse user data:', e);  
                    }  
                }  
            }  
        }  
  
    return params;  
} 

    static getQueryParam(url: string, paramName: string): string | null {  
        const urlObj = new URL(url, 'https://example.com');
     
        return urlObj.searchParams.get(paramName);  
    }  
    
    public static downloadTextFile(filename, text) {  
        const blob = new Blob([text], { type: 'text/plain' });  
        const url = URL.createObjectURL(blob);  
      
        const a = document.createElement('a');  
        a.style.display = 'none';  
        a.href = url;  
        a.download = filename;  
      
        document.body.appendChild(a);  
        a.click();  
      
        document.body.removeChild(a);  
        URL.revokeObjectURL(url);  
    }  

}
