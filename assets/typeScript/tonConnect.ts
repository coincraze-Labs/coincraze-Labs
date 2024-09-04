import { GameFi, TonConnectUI, WalletConnector } from '@ton/cocos-sdk';
import { _decorator, Component, Label, Node } from 'cc';
import { EventManger } from './EventManger';
import { LanauageManager } from './LanauageManager';
import { gameData } from './gameData';
const { ccclass, property } = _decorator;

@ccclass('tonConnect')
export class tonConnect  extends Component{
    @property(Label)
    connectLabel:Label = null;

    private _bTonInit: boolean = false;

    private _cocosGameFi: GameFi;
    private _connectUI: WalletConnector;

    protected start(): void {
        this._initTonUI();

        EventManger.eventTarget.on(EventManger.EEventName.OPEN_TON_CONNNECT, this.openTonconnect, this);
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
            manifestUrl: "https://www.coincraze.ai/",
        });
        this._cocosGameFi = await GameFi.create({
            connector: uiconnector
        });
        this._connectUI = this._cocosGameFi.walletConnector;

        const unsubscribeModal = this._connectUI.onModalStateChange(state => {
            console.log("model state changed! : ", state);
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, state);

            this.updateConnect();
        });

        const unsubscribeConnectUI = this._connectUI.onStatusChange(info => {
            console.log("wallet info status changed : ", info);
            EventManger.eventTarget.emit(EventManger.EEventName.SHOW_TIP, info);

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

    public openTonconnect(){
        this.openModal();
    }

    public async openModal() {
        if (!this._bTonInit) return;

        if (this.isConnected()) {
            this._connectUI.disconnect();
        } else {
            this._connectUI.openModal();
        }
    }

    private updateConnect() {
        if (this.isConnected()) {
            const address = this._connectUI.account.address;
            gameData.isBindWallet = true;
            //this.connectLabel.string = Address.parseRaw(address).toString({ testOnly: true, bounceable: false }).substring(0, 6) + '...';
        } else {
            //this.connectLabel.string = "Connect";
            gameData.isBindWallet = false;
        }
        EventManger.eventTarget.emit(EventManger.EEventName.REFRESH_GAME)
       
    }
}

