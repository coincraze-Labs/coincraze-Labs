import { _decorator, Component, Label, Node} from 'cc';
import { UIManager } from '../UIManager';
import { LanauageManager, ShopItemData } from '../LanauageManager';
import { gameData } from '../gameData';
import { EventManger } from '../EventManger';
import { HttpClient } from '../net/HttpClient';
import { GameFi,beginCell, Cell,TonConnectUI,SendTransactionRequest, Address , toNano ,TonClient } from '@ton/cocos-sdk';
const { ccclass, property } = _decorator;

@ccclass('popupBuyItem')
export class popupBuyItem extends Component {

    @property(Label)  
    titllab1: Label = null; 

    @property(Label)  
    btn1_lab1: Label = null; 

    @property(Label)  
    btn1_lab2: Label = null; 

    @property(Label)  
    btn1_lab3: Label = null; 

    @property(Label)  
    btn2_lab1: Label = null; 

    @property(Label)  
    btn2_lab2: Label = null; 

    @property(Label)  
    btn2_lab3: Label = null; 

    @property(Label)  
    btn3_lab1: Label = null; 

    private itemData:ShopItemData;

    private buyNum:number = 0;
    private _cocosGameFi: GameFi;

    private _connectUI: TonConnectUI;
    private client: TonClient;
    private _bnt1Num:number = 0;
    private _bnt2Num:number = 0;

    private RECEIVER:string = "UQBfpRJFEr3__8uIvfXnkxWPf1cOsT8UwaM-mprM7XjFD6Vj"


    protected start(): void {
        
        EventManger.eventTarget.on(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
    }

    onEnable() {
        HttpClient.getInstance().sendTonPrice();
        this.refresh()
    }

    refresh(){
        
        this._cocosGameFi = gameData.cocosGameFi;
        if(this._cocosGameFi){
            this._connectUI =this._cocosGameFi.walletConnector;  
        }
        this.itemData = gameData.curBuyShopData;
        this.buyNum = gameData.curBuyCount;
        this.client = new TonClient({
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        });
        if (!this.itemData){
            return;
        }

        let coin = this.itemData.coin_num * this.buyNum;
        this._bnt1Num = coin*0.9*gameData.saveData.tonPrice;
        this._bnt2Num = coin*0.9;

        this.titllab1.string = LanauageManager.getDesStrById(65);

        this.btn3_lab1.string = LanauageManager.getDesStrById(gameData.isBindWallet ? 63: 62 )

        this.btn1_lab1.string = LanauageManager.getCoinNumString(this._bnt1Num) + " " + LanauageManager.getDesStrById(105);
        console.log(this.btn1_lab1.string)
        this.btn1_lab2.string = LanauageManager.getCoinNumString(coin)  + LanauageManager.getDesStrById(105);
        //this.btn1_lab3.string = "10%" + LanauageManager.getDesStrById(107);

        this.btn2_lab1.string = LanauageManager.getCoinNumString(this._bnt2Num) + " " +  LanauageManager.getDesStrById(106);
        this.btn2_lab2.string = LanauageManager.getCoinNumString(coin)  +  LanauageManager.getDesStrById(106);
        //this.btn2_lab3.string = "10%" + LanauageManager.getDesStrById(107);

        this.btn3_lab1.string = LanauageManager.getCoinNumString(coin*71) + " " +  LanauageManager.getDesStrById(106);
    }

    onCloseClick(){
        UIManager.close(this.node);
    }

    onBtn1Click(){
        LanauageManager.playSound();
        this.onTransferTon()
    }

    onBtn2Click(){
        LanauageManager.playSound();
        this.onTransferJetton()
    }

    onBtn3Click(){
        LanauageManager.playSound();
    }
    async  getUserWalletAddress(userAddress, jettonMasterAddress) {
       
        const userAddressCell = beginCell().storeAddress(userAddress).endCell()
        const response = await this.client.runMethod(jettonMasterAddress, "get_wallet_address", [
            {type: "slice", cell: userAddressCell}
        ])
        return response.stack.readAddress()
    } 
    async onTransferTon() {
        if (this._cocosGameFi && this._cocosGameFi.walletConnector?.connected) {
        const transaction = {
            validUntil:Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: this.RECEIVER, 
                    amount: toNano(this._bnt1Num).toString()
                }
            ]
        }
        const result = await this._connectUI.sendTransaction(transaction as SendTransactionRequest)  
        const hash = Cell.fromBase64(result.boc)
        .hash()
        .toString("base64");

    }
    }
    async  onTransferJetton() {
        if (this._cocosGameFi && this._cocosGameFi.walletConnector?.connected) {
            const userAddress = Address.parse(this._connectUI.account.address)
            const body = beginCell()
            .storeUint(0xf8a7ea5, 32)     
            .storeUint(0, 64)           
            .storeCoins(toNano(this._bnt2Num/1000))  
            .storeAddress(Address.parse(this.RECEIVER)) 
            .storeAddress(Address.parse(this.RECEIVER)) 
            .storeMaybeRef(null)        
            .storeCoins(1)
            .storeMaybeRef(null)       
            .endCell(); 
            const jettonMasterAddress = Address.parse("EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs")
            const jettonWalletAddress = await this.getUserWalletAddress(userAddress, jettonMasterAddress)
            
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: jettonWalletAddress.toString(), 
                    amount: toNano("0.1").toString(), 
                    payload: body.toBoc().toString("base64") 
                }
            ]
        }
        const result = await this._connectUI.sendTransaction(transaction as SendTransactionRequest)
        console.log(`Send tx result: ${JSON.stringify(result)}`);
        }
    }
}

