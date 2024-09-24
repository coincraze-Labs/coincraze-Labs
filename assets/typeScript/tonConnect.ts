import { Address, GameFi, toNano, TonConnectUI, TonTransferRequest, WalletConnector } from '@ton/cocos-sdk';
import { _decorator, Component, Label, Node } from 'cc';
import { EventManger } from './EventManger';
import { LanauageManager } from './LanauageManager';
import { gameData } from './gameData';
import { TelegramWebApp } from '../cocos-telegram-miniapps/scripts/telegram-web';
import { TgManager, TonAddressConfig } from './TgManager';
import { HttpClient } from './net/HttpClient';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('tonConnect')
export class tonConnect extends Component{
    @property(Label)
    connectLabel:Label = null;

    private _bTonInit: boolean = false;

    private _cocosGameFi: GameFi;
    private _connectUI: WalletConnector;

    public init(): void {
        TelegramWebApp.Instance.init().then(res => {
            console.log("telegram web app init : ", res.success);
        });

        fetch("https://tg-cc.image-bot.com/config", { method: 'GET' }).then(response => {
            return response.json();
        }).then(value => {
            console.log("config : ", value);
            if (value.ok) {

                const addressConfig = {
                    tonAddress: value.tokenRecipient,
                    jettonAddress: value.jettonMaster
                } as TonAddressConfig;

                gameData.tonAddressConfig = addressConfig;
            } else {
                console.error('request config failed!');
            }
        });
        this._initTonUI();

        EventManger.eventTarget.on(EventManger.EEventName.OPEN_TON_CONNNECT, this.openTonconnect, this);

        EventManger.eventTarget.on(EventManger.EEventName.OPEN_STAR_BUY, this.buyWithStars, this);
    }

    async _initTonUI() {

        // this.toolView.node.active = false;
        // fetch('https://www.coincraze.ai/tonconnect-manifest.json')  
        // .then(response => {  
        //     if (!response.ok) {  
        //         throw new Error('Network response was not ok');  
        //     }  
        //     return response.json(); // 解析JSON  
        // })  
        // .then(data => {  
        //     console.log("manifest:", data);  
        // })  
        // .catch(error => {  
        //     console.error('There was a problem with your fetch operation:', error);  
        // }); 

        let uiconnector = new TonConnectUI({

            //manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json',
            manifestUrl: "https://www.coincraze.ai/tonconnect-manifest.json",
            walletsListConfiguration: {
                includeWallets: [   
                {"name":"Wallet","appName":"telegram-wallet","imageUrl":"https://wallet.tg/images/logo-288.png","aboutUrl":"https://wallet.tg/","platforms":["ios","android","macos","windows","linux"],"bridgeUrl":"https://bridge.ton.space/bridge","universalLink":"https://t.me/wallet?attach=wallet&mode=compact"},
                {"name":"Tonkeeper","appName":"tonkeeper","imageUrl":"https://tonkeeper.com/assets/tonconnect-icon.png","aboutUrl":"https://tonkeeper.com","tondns":"tonkeeper.ton","platforms":["ios","android","chrome","firefox","macos"],"bridgeUrl":"https://bridge.tonapi.io/bridge","universalLink":"https://app.tonkeeper.com/ton-connect","deepLink":"tonkeeper-tc://","jsBridgeKey":"tonkeeper",},
                {"name":"MyTonWallet","appName":"mytonwallet","imageUrl":"https://static.mytonwallet.io/icon-256.png","aboutUrl":"https://mytonwallet.io","platforms":["chrome","windows","macos","linux","ios","android","firefox"],"jsBridgeKey":"mytonwallet","bridgeUrl":"https://tonconnectbridge.mytonwallet.org/bridge/","universalLink":"https://connect.mytonwallet.org"},
                //{"name":"OpenMask","appName":"openmask","imageUrl":"https://raw.githubusercontent.com/OpenProduct/openmask-extension/main/public/openmask-logo-288.png","aboutUrl":"https://www.openmask.app/","platforms":["chrome"],"jsBridgeKey":"openmask",},
                {"name":"Tonhub","appName":"tonhub","imageUrl":"https://tonhub.com/tonconnect_logo.png","aboutUrl":"https://tonhub.com","platforms":["ios","android"],"jsBridgeKey":"tonhub","bridgeUrl":"https://connect.tonhubapi.com/tonconnect","universalLink":"https://tonhub.com/ton-connect"},
                {"name":"DeWallet","appName":"dewallet","imageUrl":"https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png","aboutUrl":"https://delabwallet.com","platforms":["ios","android","macos","windows","linux"],"bridgeUrl":"https://bridge.dewallet.pro/bridge","universalLink":"https://t.me/dewallet?attach=wallet"},
                //{"name":"XTONWallet","appName":"xtonwallet","imageUrl":"https://xtonwallet.com/assets/img/icon-256-back.png","aboutUrl":"https://xtonwallet.com","platforms":["chrome","firefox"],"jsBridgeKey":"xtonwallet",},
                {"name":"TON Wallet","appName":"tonwallet","imageUrl":"https://wallet.ton.org/assets/ui/qr-logo.png","aboutUrl":"https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd","platforms":["chrome"],"jsBridgeKey":"tonwallet",},
                {"name":"Bitget Wallet","appName":"bitgetTonWallet","imageUrl":"https://raw.githubusercontent.com/bitkeepwallet/download/main/logo/png/bitget_wallet_logo_0_gas_fee.png","aboutUrl":"https://web3.bitget.com","platforms":["ios","android","chrome"],"jsBridgeKey":"bitgetTonWallet","bridgeUrl":"https://ton-connect-bridge.bgwapi.io/bridge","universalLink":"https://bkcode.vip/ton-connect","deepLink":"bitkeep://"},
                {"name":"SafePal","appName":"safepalwallet","imageUrl":"https://s.pvcliping.com/web/public_image/SafePal_x288.png","aboutUrl":"https://www.safepal.com","tondns":"","platforms":["ios","android","chrome","firefox"],"bridgeUrl":"https://ton-bridge.safepal.com/tonbridge/v1/bridge","universalLink":"https://link.safepal.io/ton-connect","deepLink":"safepal-tc://","jsBridgeKey":"safepalwallet",},
                //{"name":"OKX Wallet","appName":"okxTonWallet","imageUrl":"https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png","aboutUrl":"https://www.okx.com/web3","platforms":["chrome","safari","firefox","ios","android"],"jsBridgeKey":"okxTonWallet","bridgeUrl":"https://www.okx.com/tonbridge/discover/rpc/bridge","universalLink":"https://www.okx.com/download?appendQuery=true&deeplink=okx://web3/wallet/tonconnect"},
                //{"name":"OKX TR Wallet","appName":"okxTonWalletTr","imageUrl":"https://static.okx.com/cdn/assets/imgs/247/587A8296F0BB640F.png","aboutUrl":"https://tr.okx.com/web3","platforms":["chrome","safari","firefox","ios","android"],"jsBridgeKey":"okxTonWallet","bridgeUrl":"https://www.okx.com/tonbridge/discover/rpc/bridge","universalLink":"https://tr.okx.com/download?appendQuery=true&deeplink=okxtr://web3/wallet/tonconnect"},
                {"name":"HOT","appName":"hot","imageUrl":"https://raw.githubusercontent.com/hot-dao/media/main/logo.png","aboutUrl":"https://hot-labs.org/","platforms":["ios","android","macos","windows","linux"],"bridgeUrl":"https://sse-bridge.hot-labs.org","universalLink":"https://t.me/herewalletbot?attach=wallet","jsBridgeKey":"hotWallet",},
                {"name":"Bybit Wallet","appName":"bybitTonWallet","imageUrl":"https://s1.bycsi.com/bybit/deadpool/image-ac5bf003d25c4ae0bd21f3725694a850.png","aboutUrl":"https://www.bybit.com/web3","platforms":["ios","android","chrome"],"jsBridgeKey":"bybitTonWallet","bridgeUrl":"https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge","universalLink":"https://app.bybit.com/ton-connect","deepLink":"bybitapp://"}
                ]
            }
        });

        
        this._cocosGameFi = await GameFi.create({
            connector: uiconnector,
            merchant: {  
                tonAddress: "UQBfpRJFEr3__8uIvfXnkxWPf1cOsT8UwaM-mprM7XjFD6Vj"  
              }, 
        });
        this._connectUI = this._cocosGameFi.walletConnector;


        const unsubscribeModal = this._connectUI.onModalStateChange(state => {
            console.log("model state changed! : ", state);
            //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, state);
            this.updateConnect();
        });

        const unsubscribeConnectUI = this._connectUI.onStatusChange(info => {
            console.log("wallet info status changed : ", info);
            //EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, info);

            this.updateConnect();
        });

        this._bTonInit = true;
        this.updateConnect();
    }

    public isConnected(): boolean {
        if (!this._connectUI) {
            console.error("ton ui not inited!");
            return false;
        }
        return this._connectUI.connected;
    }

    public openTonconnect(type:number = 0, coin:number = 0){
        if (type == 1){
            this.onBuyWithStars();
        }else if (type == 2){
            //this.onBuyWithTon(coin);
        }
        else{
            this.openModal();
        }
    }

    public async openModal() {
        if (!this._bTonInit) return;

        if (this.isConnected()) {
            this._connectUI.disconnect();
        } else {
            this._connectUI.openModal();
        }



        const walletsList = await this._connectUI.getWallets();
        //TgManager.downloadTextFile("wallets", JSON.stringify(walletsList));
        console.log("walleteList: ", walletsList);
    }

    private updateConnect() {
        if (this.isConnected()) {
            const address = this._connectUI.account.address;
            gameData.isBindWallet = true;
            gameData.cocosGameFi = this._cocosGameFi;
            gameData.bindWalletName = Address.parseRaw(address).toString({ testOnly: false, bounceable: false });
            HttpClient.getInstance().sendWallet(1,  gameData.bindWalletName);
            //this.connectLabel.string = Address.parseRaw(address).toString({ testOnly: true, bounceable: false }).substring(0, 6) + '...';
        } else {
            //this.connectLabel.string = "Connect";
            gameData.bindWalletName = "";
            gameData.isBindWallet = false;
            HttpClient.getInstance().sendWallet(2);
        }
        
        EventManger.eventTarget.emit(EventManger.EEventName.REFRESH_GAME)
       
    }

    public onBuyWithStars() {
        fetch("https://tg-cc.image-bot.com/create-stars-invoice", { method: 'POST' }).then(response => {
            return response.json();
        }).then(value => {
            console.log("starts invoice : ", value);
            if (value.ok) {
                TelegramWebApp.Instance.openInvoice(value.invoiceLink, (result) => {
                    console.log("buy stars : ", result);
                });
            } else {
                console.error('request config failed!');
            }
        });
    }

    public buyWithStars(link:string){
        TelegramWebApp.Instance.openInvoice(link, (result) => {

            console.log("buy stars : ", result);
            if (result == "paid"){
                HttpClient.getInstance().sendBuyShopItem(gameData.curBuyShopData.id, gameData.curBuyCount);
                UIManager.close(UIManager.uiNamePath.popupBuyItem);
            }
        });
    }

    public onTransferTon(coin:number) {
        if (this._cocosGameFi && this._cocosGameFi.walletConnector?.connected) {
            const tonTransferReq = {
                to: Address.parse(gameData.tonAddressConfig.tonAddress),
                amount: toNano(0.01)
            } as TonTransferRequest;
            this._cocosGameFi.transferTon(tonTransferReq);
        }
    }

    public onBuyWithTon(coin:number) {
        const tonTransferReq = {
            amount: toNano(0.01)
        } as Omit<TonTransferRequest, "to">;
        this._cocosGameFi.buyWithTon(tonTransferReq);
    }
}

