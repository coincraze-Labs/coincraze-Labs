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
export class tonConnect  extends Component{
    @property(Label)
    connectLabel:Label = null;

    private _bTonInit: boolean = false;

    private _cocosGameFi: GameFi;
    private _connectUI: WalletConnector;

    protected start(): void {
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
                {"name":"OpenMask","appName":"openmask","imageUrl":"https://raw.githubusercontent.com/OpenProduct/openmask-extension/main/public/openmask-logo-288.png","aboutUrl":"https://www.openmask.app/","platforms":["chrome"],"jsBridgeKey":"openmask",},
                {"name":"Tonhub","appName":"tonhub","imageUrl":"https://tonhub.com/tonconnect_logo.png","aboutUrl":"https://tonhub.com","platforms":["ios","android"],"jsBridgeKey":"tonhub","bridgeUrl":"https://connect.tonhubapi.com/tonconnect","universalLink":"https://tonhub.com/ton-connect"},
                {"name":"DeWallet","appName":"dewallet","imageUrl":"https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png","aboutUrl":"https://delabwallet.com","platforms":["ios","android","macos","windows","linux"],"bridgeUrl":"https://bridge.dewallet.pro/bridge","universalLink":"https://t.me/dewallet?attach=wallet"},
                {"name":"XTONWallet","appName":"xtonwallet","imageUrl":"https://xtonwallet.com/assets/img/icon-256-back.png","aboutUrl":"https://xtonwallet.com","platforms":["chrome","firefox"],"jsBridgeKey":"xtonwallet",},
                {"name":"TON Wallet","appName":"tonwallet","imageUrl":"https://wallet.ton.org/assets/ui/qr-logo.png","aboutUrl":"https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd","platforms":["chrome"],"jsBridgeKey":"tonwallet",},
                {"name":"Bitget Wallet","appName":"bitgetTonWallet","imageUrl":"https://raw.githubusercontent.com/bitkeepwallet/download/main/logo/png/bitget_wallet_logo_0_gas_fee.png","aboutUrl":"https://web3.bitget.com","platforms":["ios","android","chrome"],"jsBridgeKey":"bitgetTonWallet","bridgeUrl":"https://ton-connect-bridge.bgwapi.io/bridge","universalLink":"https://bkcode.vip/ton-connect","deepLink":"bitkeep://"},
                {"name":"SafePal","appName":"safepalwallet","imageUrl":"https://s.pvcliping.com/web/public_image/SafePal_x288.png","aboutUrl":"https://www.safepal.com","tondns":"","platforms":["ios","android","chrome","firefox"],"bridgeUrl":"https://ton-bridge.safepal.com/tonbridge/v1/bridge","universalLink":"https://link.safepal.io/ton-connect","deepLink":"safepal-tc://","jsBridgeKey":"safepalwallet",},
                {"name":"OKX Wallet","appName":"okxTonWallet","imageUrl":"https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png","aboutUrl":"https://www.okx.com/web3","platforms":["chrome","safari","firefox","ios","android"],"jsBridgeKey":"okxTonWallet","bridgeUrl":"https://www.okx.com/tonbridge/discover/rpc/bridge","universalLink":"https://www.okx.com/download?appendQuery=true&deeplink=okx://web3/wallet/tonconnect"},
                {"name":"OKX TR Wallet","appName":"okxTonWalletTr","imageUrl":"https://static.okx.com/cdn/assets/imgs/247/587A8296F0BB640F.png","aboutUrl":"https://tr.okx.com/web3","platforms":["chrome","safari","firefox","ios","android"],"jsBridgeKey":"okxTonWallet","bridgeUrl":"https://www.okx.com/tonbridge/discover/rpc/bridge","universalLink":"https://tr.okx.com/download?appendQuery=true&deeplink=okxtr://web3/wallet/tonconnect"},
                {"name":"HOT","appName":"hot","imageUrl":"https://raw.githubusercontent.com/hot-dao/media/main/logo.png","aboutUrl":"https://hot-labs.org/","platforms":["ios","android","macos","windows","linux"],"bridgeUrl":"https://sse-bridge.hot-labs.org","universalLink":"https://t.me/herewalletbot?attach=wallet","jsBridgeKey":"hotWallet",},
                {"name":"Bybit Wallet","appName":"bybitTonWallet","imageUrl":"https://s1.bycsi.com/bybit/deadpool/image-ac5bf003d25c4ae0bd21f3725694a850.png","aboutUrl":"https://www.bybit.com/web3","platforms":["ios","android","chrome"],"jsBridgeKey":"bybitTonWallet","bridgeUrl":"https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge","universalLink":"https://app.bybit.com/ton-connect","deepLink":"bybitapp://"}
                    // {
                    //   appName: "tonwallet",
                    //   name: "TON Wallet",
                    //   imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                    //   aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                    //   universalLink: "https://wallet.ton.org/ton-connect",
                    //   jsBridgeKey: "tonwallet",
                    //   bridgeUrl: "https://bridge.tonapi.io/bridge",
                    //   platforms: ["chrome", "android"]
                    // }, {
                    //     appName: "nicegramWallet",
                    //     name: "Nicegram Wallet",
                    //     imageUrl: "https://static.nicegram.app/icon.png",
                    //     aboutUrl: "https://nicegram.app",
                    //     universalLink: "https://nicegram.app/tc",
                    //     deepLink: "nicegram-tc://",
                    //     jsBridgeKey: "nicegramWallet",
                    //     bridgeUrl: "https://bridge.tonapi.io/bridge",
                    //     platforms: ["ios", "android"]
                    //   },
                    //   {
                    //     appName: "binanceWeb3TonWallet",
                    //     name: "Binance Web3 Wallet",
                    //     imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
                    //     aboutUrl: "https://www.binance.com/en/web3wallet",
                    //     deepLink: "bnc://app.binance.com/cedefi/ton-connect",
                    //     bridgeUrl: "https://bridge.tonapi.io/bridge",
                    //     jsBridgeKey: "binancew3w",
                    //     platforms: ["chrome", "safari", "ios", "android"],
                    //     universalLink: "https://app.binance.com/cedefi/ton-connect"
                    //   },
                    //   {
                    //     appName: "fintopio-tg",
                    //     name: "Fintopio Telegram",
                    //     imageUrl: "https://fintopio.com/tonconnect-icon.png",
                    //     aboutUrl: "https://fintopio.com",
                    //     universalLink: "https://t.me/fintopio?attach=wallet",
                    //     bridgeUrl: "https://wallet-bridge.fintopio.com/bridge",
                    //     platforms: ["ios", "android", "macos", "windows", "linux"]
                    //   },
                    //   {
                    //     appName: "GateWallet",
                    //     name: "GateWallet",
                    //     imageUrl: "https://www.gate.io/images/login/qrcode_center_icon.svg",
                    //     aboutUrl: "https://www.gate.io/",
                    //     bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
                    //     jsBridgeKey: "gatetonwallet",
                    //     platforms: ["ios", "android", "chrome"],
                    //     universalLink: "https://gateio.onelink.me/DmA6/web3"
                    //   },
                    //   {
                    //     appName: "tokenpocket",
                    //     name: "TokenPocket",
                    //     imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
                    //     aboutUrl: "https://tokenpocket.pro",
                    //     jsBridgeKey: "tokenpocket",
                    //     platforms: ["ios", "android"]
                    //   },
                    //   {
                    //     appName: "dewallet",
                    //     name: "DeWallet",
                    //     imageUrl: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
                    //     aboutUrl: "https://delabwallet.com",
                    //     universalLink: "https://t.me/dewallet?attach=wallet",
                    //     bridgeUrl: "https://bridge.dewallet.pro/bridge",
                    //     platforms: ["ios", "android", "macos", "windows", "linux"]
                    //   },
                    //   {
                    //     appName: "BitgetWeb3",
                    //     name: "BitgetWeb3",
                    //     imageUrl: "https://img.bitgetimg.com/image/third/1723701408284.png",
                    //     aboutUrl: "https://www.bitget.com",
                    //     universalLink: "https://t.me/BitgetOfficialBot?attach=wallet",
                    //     bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
                    //     platforms: ["ios", "android", "windows", "macos", "linux"]
                    //   }
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
            this.onBuyWithTon(coin);
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
            this._cocosGameFi.walletAccount;
            gameData.isBindWallet = true;
            gameData.bindWalletName = Address.parseRaw(address).toString({ testOnly: true, bounceable: false });
            //this.connectLabel.string = Address.parseRaw(address).toString({ testOnly: true, bounceable: false }).substring(0, 6) + '...';
        } else {
            //this.connectLabel.string = "Connect";
            gameData.bindWalletName = "";
            gameData.isBindWallet = false;
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

