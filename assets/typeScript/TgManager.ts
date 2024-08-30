import { _decorator, Component, EventTarget, Node, resources, Sprite, SpriteFrame } from 'cc';
import { coinType, gameData } from './gameData';
import { HttpClient } from './net/HttpClient';
import { EventManger } from './EventManger';
import { LanauageManager } from './LanauageManager';
const { ccclass, property } = _decorator;

@ccclass('TgManager')
export class TgManager {

    public static shareUrl0 = "https://t.me/share/url?url=";

    public static shareUrl = "https://t.me/szxsssBot/coinapp?startapp=";

    public static channelUrl = "https://t.me/Coincraze_Ann";

    public static wibsiteUrl = "https://www.coincraze.ai/";

    public static followTwitterUrl = "https://x.com/coincraze_labs";

    public static connectTwitter(){

    }

    public static disConnectTwitter(){
        
    }

    public static followTwitter(){
        let url = TgManager.followTwitterUrl;
        window.open(url);
    }

    public static connectWallet(){

    }

    public static disConnectWalletr(){
        
    }

    public static addTelegramChannel(){
        let url = TgManager.channelUrl;

        window.location.href = url;
    }

    public static visitWebsite(){
        let url = TgManager.wibsiteUrl;
        window.open(url);

        HttpClient.getInstance().sendVisitwebsite();
    }

    public static shareTelegram(){
        //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("shareTelegram"))

        let url = TgManager.shareUrl0 + TgManager.shareUrl + gameData.saveData.inivitId +"&text=welcome to play"
        let web = window.open(url);

        //window.location.href = url;
        //web.close()

        HttpClient.getInstance().sendDailyshare();
    }

    public static shareTwitter(){

    }

    public static invite(){
        let url = TgManager.shareUrl0 + TgManager.shareUrl + gameData.saveData.inivitId +"&text=welcome to play"
        window.open(url);

        HttpClient.getInstance().sendDailyinvite();
    }

    public static repostTwitter(){
        let url = "tg://msg_url?url=https://t.me/szxsssBot/coinapp?startapp=" + gameData.saveData.inivitId +"&text=welcome to play";
        window.open(url);

        HttpClient.getInstance().sendDailyrepost();
    }

    public static processURLParameters() {  
        let url = window.location.href;  
        //url = "https://game.coincraze.ai/#tgWebAppData=query_id%3DAAHR46gxAwAAANHjqDF-Xcai%26user%3D%257B%2522id%2522%253A7275602897%252C%2522first_name%2522%253A%2522s%2522%252C%2522last_name%2522%253A%2522zx%2522%252C%2522language_code%2522%253A%2522zh-hans%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1724744537%26hash%3Db1e85e9f88b8b8721af7bb976f35a86912cacf3f24b3edc7bcf5051fbefecd7b&tgWebAppVersion=7.8&tgWebAppPlatform=tdesktop&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%23168acd%22%2C%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23d14e4e%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22secondary_bg_color%22%3A%22%23f1f1f1%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%23168acd%22%2C%22section_separator_color%22%3A%22%23e7e7e7%22%2C%22subtitle_text_color%22%3A%22%23999999%22%2C%22text_color%22%3A%22%23000000%22%7D"
        
        const startParam = TgManager.getQueryParam(url, 'tgWebAppStartParam'); 
        console.log(startParam);
        //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("shareid " + startParam))

        //TgManager.downloadTextFile("url", url);
        const queryString = url.split('#')[1] || ''; 
        const userData:any = TgManager.parseFragment(queryString);

        if (userData && userData.user && userData.user.id){
            if (userData.user.language_code == "zh-hans"){
                LanauageManager.languageType = 2;
            }
            //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, ("userid success" + userData.user.id))
            HttpClient.getInstance().sendLogin(userData.user.id, userData.user.first_name, userData.user.last_name, startParam);
        }else{
            HttpClient.getInstance().sendLogin();
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
    
    static downloadTextFile(filename, text) {  
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
