import { _decorator, Component, Node, Prefab, instantiate, input, Input, EventTouch, UITransform, Vec3 , Vec2, Color, Sprite, tween, Label, AudioSource, AudioClip, sys, NodePool, random, randomRange, randomRangeInt, Size, EditBox, native, Button, Animation} from 'cc';
import { block } from './block';
import { gameData, getPanelType, moneyType, popupCommonType, SaveData } from './gameData';
import { WECHAT } from 'cc/env';
import { coinDropManger } from './animation/coinDropManger';
import { AndroidSdk } from './AndroidSdk';
import { EventManger } from './EventManger';
import { HttpClient } from './net/HttpClient';
import { levelView } from './ui/levelView';
import { UIManager } from './UIManager';
import { LanauageManager } from './LanauageManager';
import { mainView } from './ui/mainView';
import { tonConnect } from './tonConnect';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {

    @property({type:Prefab})
    preBlock = null

    @property({type:Node})
    parentBlocks = null

    @property({type:Node})
    parentBlocksDi = null

    @property({type:Node})
    nodeTip = null

    @property({type:Label})
    labelLevel = null

    @property({type:Node})
    layerOver = null

    @property({type:Node})
    parentEdit = null

    @property({type:Prefab})
    preBlockEdit = null

    @property({type:[Label]})
    arrLabelDJ = []

    @property({type:[AudioClip]})
    arrAudio = []

    @property({type:[AudioClip]})
    arrMusic = []

    @property({type:Node})
    getMoneyPanel = null

    @property({type:Node})
    luck100Panel = null

    @property({type:Node})
    luckGetPanel = null

    @property({type:Node})
    passGetPanel = null

    @property({type:Label})
    passGetLab = null

    @property({type:Label})
    passGetLevel = null

    @property({type:Label})
    passGetLevelNum = null

    @property({type:Node})
    tasktPanel = null

    @property({type:Node})
    wxOutPanel = null

    @property({type:Node})
    goldOutPanel = null

    @property({type:Node})
    goldOutTipPanel = null

    @property({type:Node})
    outSuccessPanel = null

    @property({type:Node})
    namePanel = null

    @property({type:EditBox})
    nameEdit = null

    @property({type:EditBox})
    idEdit = null

    @property({type:Node})
    timeTipPanel = null

    @property({type:Label})
    successLab = null

    @property({type:Label})
    wxNameLab = null

    @property({type:Node})
    commonLevel = null

    @property({type:Node})
    bossLevel = null

    @property({type:Node})
    chanllegeLevel = null

    @property({type:Node})
    levelmain:Node = null

    @property({type:Node})
    mainView = null

    @property({type:Node})
    rewardView = null

    @property({type:Node})
    loading:Node = null

    @property({type:Animation})
    passAni:Animation = null;

    numTouchStart: number;
    numTouchEnd: number;
    gameData: gameData;

    numLevel: number;

    itemSum:number=  0

    xiaochuNum:number = 0;

    open100Num:number;
    xxStartDi: number;
    xxDiOff: number = 85;
    yyBlockChu: number;
    gameType: number;

    audioSource: AudioSource;

    isEditing: boolean = false;
    numTypeEdit: number;
    numBlockEditMove: number;
    numTypeSuiJi: number;
    numSuiJi: number;
    bannerAd: any;
    wx: any;
    isWX: boolean;
    idBannerAD: any;
    interstitialAd: any;
    videoAd: any;
    numDJ: number;
    idChaPingAD: string;
    idJiLiShiPinAD: string;
    blockPool: NodePool;

    useArrNumDJ: number[] = [0,0,0];

    isLimit:boolean = false;

    onLoad() {
        if(AndroidSdk.isAndroid){
            native.bridge.sendToNative("playbanner", "defaultAdUrl");
        }
        if (AndroidSdk.isLocal){
            gameData.saveData = new SaveData();
        }
        this.loading.active = false;
        //UIManager.preloadPrefabs();
    }

    start() {
        if (gameData.saveData.offline_rewards > 10){
            LanauageManager.popupCommonlType = popupCommonType.offLineCoin;
            UIManager.open(UIManager.uiNamePath.popupCommonBtn);
        }
        // gameData.saveData.special_reward = [17,18,19];
        if (gameData.saveData.special_reward && gameData.saveData.special_reward.length > 0){
            this.rewardView.active = true;
        }

        this.levelmain.active = false;
        this.mainView.active = true;
        this.isWX = WECHAT
        this.wx = window['wx']
        this.idBannerAD = 'xxxx'
        this.idChaPingAD = 'xxxx'
        this.idJiLiShiPinAD = 'xxxx'

        this.blockPool = new NodePool();
        this.numLevel = gameData.saveData.curLevel 

        this.isEditing = false
        this.numTypeEdit = 1
        this.numTypeSuiJi = 2 
        this.numSuiJi = 200 

        this.numDJ = -1

        this.audioSource = this.node.getComponent(AudioSource)

        this.yyBlockChu = 120
        this.xxStartDi = 610 / 2 -280 -610 / 2 + 25
        this.gameData = this.node.getComponent(gameData)

        this.createBlocksEdit()
        this.newLevelReset();
        gameData.resetLevelData();
        this.schedule(this.updateCoinTime, 1);  
        this.init()

        if(AndroidSdk.isTempTest && AndroidSdk.isAndroid){
            this.namePanel.active = true;
        }
        
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        EventManger.eventTarget.on(EventManger.EEventName.REFRESH_GAME, this.refresh, this);
        EventManger.eventTarget.on(EventManger.EEventName.SHOW_TIP, this.showTip, this);
        EventManger.eventTarget.on(EventManger.EEventName.PLAY_SOUND_INDEX, this.playSound, this);
        EventManger.eventTarget.on(EventManger.EEventName.MUSIC_CHANGE_STATE, this.changetMusic, this);
        EventManger.eventTarget.on(EventManger.EEventName.USE_ITEM_SURE, this.useItemSureSuccess, this);
        EventManger.eventTarget.on(EventManger.EEventName.LOADING_IS_SHOW, this.isLoadingShow, this);
        

        EventManger.eventTarget.on(EventManger.EEventName.SHOW_GOLDOUT_TIP, this.openGoldOutTip, this);
        EventManger.eventTarget.on(EventManger.EEventName.OUT_SUCCESS_PANEL, this.onOutSuccess, this);
        EventManger.eventTarget.on(EventManger.EEventName.PASS_LEVEL_START, this.refreshNewLevel, this);
        EventManger.eventTarget.on(EventManger.EEventName.RESET_RESET_GAME, this.beginGame, this);

        EventManger.eventTarget.on(EventManger.EEventName.IS_SHOW_MAINVIEW, this.isShowMainView, this);

        this.passAni.on(Animation.EventType.FINISHED, this.passAniFinish, this);
    }

    private isLoadingShow(isShow:boolean){
        if (isShow){
            this.scheduleOnce(this.changeLoading,0.3)
        }else{
            this.unschedule(this.changeLoading);
            this.loading.active = isShow;
        }
    }

    public changeLoading(){
        this.loading.active = true;
    }

    private isShowMainView(isShow:boolean){
        this.mainView.active = isShow;

        this.levelmain.active = !isShow;
        
        if (this.levelmain.active){
            if (gameData.saveData.hpNum <= 0){
                this.mainView.active = true;
                this.levelmain.active = false;
                this.showTip(LanauageManager.getDesStrById(71));
            }else{
                this.beginGame();
            }
        }

        if (this.mainView.active){
            this.playMusic(0);
            this.mainView.getComponent(mainView)?.refresh();
        }
        if (this.levelmain.active){
            if (gameData.isChanllenge){
                this.playMusic(2);
            }else{
                this.playMusic(1);
            }
        }
    }

    private changetMusic(){
        if (gameData.isPlayMusic){
            this.audioSource.stop();
            this.audioSource.clip = this.arrMusic[0];
            this.audioSource.play();
        }else{
            this.audioSource.stop();
        }
    }

    private playMusic(index:number){
        this.audioSource.volume = index == 0 ? 1:0.5;
        if (gameData.isPlayMusic){
            this.audioSource.stop();
            this.audioSource.clip = this.arrMusic[index];
            this.audioSource.play();
        }else{
            this.audioSource.stop();
        }
    }

    public playSound(index:number){
        if (gameData.isPlaySound){
            this.audioSource.playOneShot(this.arrAudio[index],1.5)
        }
    }

    init(){
        this.numTouchStart = -1
        this.numTouchEnd = -1
        gameData.levelSeconds = 0
        //this.layerOver.active = false
        this.nodeTip.scale = new Vec3(0,0,0)
        
        this.isLimit = true;
        this.shuaXinLevelInfo()
        this.shuaXinDJ()
        this.refresh();

        if (this.isEditing) {
            let children = this.parentBlocks.children
            for (let i = 0; i < children.length; i++) {
                let ts_block = children[i].getComponent(block)
                let num_type_random = Math.floor(Math.random()*gameData.numBlockSum)
                ts_block.init(num_type_random)
            }
        }else{
            let children = this.parentBlocks.children
            for (let i = children.length-1; i >= 0; i--) {
                this.onBlockKilled(children[i])
            }
            this.crateBlocks()
        }

        this.parentBlocksDi.removeAllChildren()

        this.pddj()
        this.btn3(false)
    }

    createBlocksEdit(){
        let i_num = 15 
        let j_num = 13 
        let num_zhongJian = i_num / 2

        for (let i = 0; i < i_num; i++) {
            for (let j = 0; j < j_num; j++) {
                let node_block_edit = instantiate(this.preBlockEdit)
                node_block_edit.parent = this.parentEdit
                node_block_edit.setPosition(i*40 - (i_num-1)*40 / 2,j*45 - 55,0)
                if (i_num % 2 == 0) {
                    if (i == num_zhongJian || i == num_zhongJian-1) {
                        node_block_edit.getComponent(Sprite).color = new Color(255,0,0,98)
                    }
                }else{
                    if (i == Math.floor(num_zhongJian)) {
                        node_block_edit.getComponent(Sprite).color = new Color(255,0,0,98)
                    }
                }
                
            }
        }
    }

    showTip(str){
        this.nodeTip.getChildByName('Label').getComponent(Label).string = str
        tween(this.nodeTip)
            .to(0.1,{scale:new Vec3(1,1,1)})
            .delay(1.5)
            .to(0.1,{scale:new Vec3(0,0,0)})
            .start()
    }


    shuaXinDJ(){
        // for (let i = 0; i < this.arrLabelDJ.length; i++) {
        //     this.arrLabelDJ[i].string = gameData.saveData.arrNumDJ[i]
        // }
        this.arrLabelDJ[0].string = LanauageManager.getItemNumById(5).toString();
        this.arrLabelDJ[1].string = LanauageManager.getItemNumById(6).toString();
        this.arrLabelDJ[2].string = LanauageManager.getItemNumById(7).toString();
    }

    shuaXinLevelInfo(){

    }

    onBlockKilled(block) {

        this.blockPool.put(block); 
    }

    crateBlocks(){
        this.numLevel = gameData.saveData.curLevel;
        let num_geShu = -1
        let num_type = this.gameData.getItemType(this.numLevel);
        let stageNum = this.gameData.getStageNum(this.numLevel);
        let isBoss = this.gameData.getIsBoss(this.numLevel);
        let num_type_random = Math.floor(Math.random()*num_type)//5

        this.commonLevel.active = false;
        this.bossLevel.active = false;
        this.chanllegeLevel.active = false;

        if (gameData.isChanllenge){
            this.chanllegeLevel.active = true;
        }else if (isBoss){
            this.bossLevel.active = true;
            this.levelmain.getComponent(levelView)?.playBossAnima();
        }else{
            this.commonLevel.active = true;
        }


        if (!this.gameData.arrPosLevel[stageNum] || isBoss ||gameData.isChanllenge) {

            let num_block_geShu = this.gameData.getItemNumByLevel(this.numLevel);

            let arr_v3_block_edit = []
            let children = this.parentEdit.children
            for (let i = 0; i < children.length; i++) {
                if (children[i].name == 'blockEdit') {
                    arr_v3_block_edit.push(children[i].getPosition())
                }
            }

            for (let i = 0; i < num_block_geShu; i++) {
                num_geShu++ //0,1,2,3

                let node_block = null;
                if (this.blockPool.size() > 0) { 
                    node_block = this.blockPool.get();
                } else {
                    node_block = instantiate(this.preBlock);
                }

                let xx = -250  + Math.random() * 500
                let yy = -60 + Math.random() * 510

                var hei = this.node.getComponent(UITransform).contentSize.height;
                if (hei > (1280 + 250)){
                    yy = -60 + Math.random() * 510 + (hei - 1280 - 250)
                }

                if (this.numTypeSuiJi == 1) {
                    let i_v3_random = Math.floor(Math.random() *arr_v3_block_edit.length)
                    xx = arr_v3_block_edit[i_v3_random].x
                    yy = arr_v3_block_edit[i_v3_random].y
                }else if (this.numTypeSuiJi == 2 && Math.random() > 0.5) {
                    let i_v3_random = Math.floor(Math.random() *arr_v3_block_edit.length)
                    xx = arr_v3_block_edit[i_v3_random].x
                    yy = arr_v3_block_edit[i_v3_random].y
                }

                node_block.setPosition(xx,yy,0)
                node_block.parent = this.parentBlocks
                let ts_block = node_block.getComponent(block)
                
                if (num_geShu % 3 == 0) {
                    num_type_random = Math.floor(Math.random()*num_type)//6,7
                }
                ts_block.init(num_type_random)//6,6,6,7,7,7
            }

            return
        }

        for (let i = 0; i < this.gameData.arrPosLevel[stageNum].length; i++) {
            num_geShu++ //0,1,2,3
            let node_block = null;
            if (this.blockPool.size() > 0) { 
                node_block = this.blockPool.get();
            } else { 
                node_block = instantiate(this.preBlock);
            }
            let xx = this.gameData.arrPosLevel[stageNum][i].x
            let yy = this.gameData.arrPosLevel[stageNum][i].y
            node_block.setPosition(xx,yy,0)
            node_block.parent = this.parentBlocks
            let ts_block = node_block.getComponent(block)
            
            if (num_geShu % 3 == 0) {
                num_type_random = Math.floor(Math.random()*num_type)//6,7
            }
            ts_block.init(num_type_random)//6,6,6,7,7,7
        }
        this.itemSum = num_geShu;
        console.log("方块总数" + this.itemSum);
    }

    //在底部生成元素块
    createBlockToBi(b_type,v3_block_start, curLevel:number = 0){
        let node_block = null;
        if (this.blockPool.size() > 0) {
            node_block = this.blockPool.get();
        } else { 
            node_block = instantiate(this.preBlock);
        }
        node_block.parent = this.parentBlocksDi

        let ts_block = node_block.getComponent(block)
        ts_block.initDi(b_type)

        let num_di = this.getNumDi()
        //console.log('num_di:'+num_di);
        this.shuaXinNumDi(node_block)
        
        let xx = this.xxStartDi + this.xxDiOff * num_di
        //node_block.setPosition(xx,0,0)
        //gameData.saveData

        let v3_world = this.parentBlocks.getComponent(UITransform).convertToWorldSpaceAR(v3_block_start)
        let v3_node_di = this.parentBlocksDi.getComponent(UITransform).convertToNodeSpaceAR(v3_world)

        node_block.setPosition(v3_node_di)
        ts_block.v3BlockOld = v3_node_di
        //console.log('v3BlockOld:'+ts_block.v3BlockOld);
        

        tween(node_block)
            .to(0.1,{position:new Vec3(xx,0,0)})
            .call(()=>{
                this.pdXiaoChu(node_block, curLevel)
            })
            .start()

    }

    pdXiaoChu(node_block, curLevel:number = 0){
        let ts_block = node_block.getComponent(block)
        ts_block.isMoving = false
        let num_di_block = ts_block.numDi
        let children = this.parentBlocksDi.children
        let arr_blockType = []
        for (let i = 0; i < children.length; i++) {
            let ts_block_2 = children[i].getComponent(block)
            if (ts_block.blockType == ts_block_2.blockType && ts_block_2.isXiaoChu == false) {
                arr_blockType.push(children[i])
            }
        }

        let is_xiaoChu = false
        if (arr_blockType.length == 3) {
            for (let i = arr_blockType.length-1; i >= 0; i--) {
                arr_blockType[i].getComponent(block).isXiaoChu = true
                tween(arr_blockType[i])
                    .delay(0.05)
                    .to(0.08,{scale:new Vec3(0,0,0)})
                    .removeSelf()
                    .start()
                //arr_blockType[i].removeFromParent()
                is_xiaoChu = true
            }
        }

        if (is_xiaoChu) {
            //this.audioSource.playOneShot(this.arrAudio[1],1)
            this.playSound(1);
            let children_2 = this.parentBlocksDi.children
            for (let i = 0; i < children_2.length; i++) {
                let ts_block_2 = children_2[i].getComponent(block)
                if (ts_block_2.numDi > num_di_block) {
                    ts_block_2.numDi = ts_block_2.numDi - 3
                    let xx = this.xxStartDi + this.xxDiOff * ts_block_2.numDi
                    //children_2[i].setPosition(xx,0,0)
                    tween(children_2[i])
                        .delay(0.05)
                        .to(0.08,{position:new Vec3(xx,0,0)})
                        .start()
                }
            }
            if(!AndroidSdk.isPingbi){
                HttpClient.getInstance().sendLevelByType(1);
                this.xiaochuAnimation(curLevel);
            }else{
                this.xiaochuNum++
                if (AndroidSdk.isAndroid && this.xiaochuNum == 3){
                    this.timeTipPanel.active = true;
                }
            }
        }

        let num_xiaoChu_geShu = 0
        let children_2 = this.parentBlocksDi.children
        for (let i = 0; i < children_2.length; i++) {
            let ts_block = children_2[i].getComponent(block)
            if (ts_block.isXiaoChu) {
                num_xiaoChu_geShu++
            }
        }

        if (children_2.length - num_xiaoChu_geShu >= 7) {
            this.gameType = -1
            //this.audioSource.playOneShot(this.arrAudio[2],1)
            this.playSound(2);
            if (this.interstitialAd) {
                this.interstitialAd.show().catch((err) => {
                  console.error(err)
                })
            }

            this.scheduleOnce(function(){
                //this.layerOver.active = true
                UIManager.open(UIManager.uiNamePath.challengeFail)
            },0.5)
        }
        
    }

    getNumDi(){
        let children = this.parentBlocksDi.children
        let block_end = children[children.length-1]
        let ts_block_end = block_end.getComponent(block)
        let num_xiaoChu = 0

        for (let i = 0; i < children.length; i++) {
            let ts_block = children[i].getComponent(block)
            if (ts_block.isXiaoChu) {
                num_xiaoChu++
            }
        }

        if (children.length - num_xiaoChu == 1) {
            ts_block_end.numDi = 0
        }
        
        for (let i = children.length-2; i >= 0; i--) {
            let ts_block_2 = children[i].getComponent(block)
            if (ts_block_end.blockType == ts_block_2.blockType && ts_block_2.isXiaoChu == false) {
                ts_block_end.numDi = ts_block_2.numDi+1
                return ts_block_end.numDi
            }
        }

        ts_block_end.numDi = children.length- 1 -num_xiaoChu

        return ts_block_end.numDi
    }

    shuaXinNumDi(node_block){
        let num_di = node_block.getComponent(block).numDi
        let children = this.parentBlocksDi.children
        for (let i = 0; i < children.length; i++) {
            let ts_block = children[i].getComponent(block)
            if (node_block.uuid == children[i].uuid || ts_block.isXiaoChu) {
                continue
            }
            if (ts_block.numDi >= num_di) {
                ts_block.numDi++
                let xx = this.xxStartDi + this.xxDiOff * ts_block.numDi
                tween(children[i])
                    .to(0.09,{position:new Vec3(xx,0,0)})
                    .start()
            }
        }
    }

    pddj(){
        let children = this.parentBlocks.children
        for (let i = 0; i < children.length; i++) {
            let ts_block_1 = children[i].getComponent(block)
            let rect_1 = ts_block_1.getBoundingBox_pz()
            ts_block_1.setTouch(true)
            for (let j = i+1; j < children.length; j++) {
                let ts_block_2 = children[j].getComponent(block)
                let rect_2 = ts_block_2.getBoundingBox_pz()

                if (rect_1.intersects(rect_2)) {
                    ts_block_1.setTouch(false)
                    break
                }
                
            }
        }
    }

    onTouchStart(event: EventTouch) {

        if (this.gameType != 0) {
            return
        }

        if (this.pdBlockDiMoving()) {
            return
        }
        
        this.numTouchStart = -1
        let v2_touchStart = event.getUILocation()
        let v3_touchStart = this.parentBlocks.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(v2_touchStart.x,v2_touchStart.y,0))
        let v3_touchStart_edit = this.parentEdit.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(v2_touchStart.x,v2_touchStart.y,0))

        if (this.isEditing ) {
            if (this.numTypeEdit == 1) {
                let children = this.parentEdit.children
                for (let i = children.length-1; i >= 0; i--) {
                
                    let node_UITransform = children[i].getComponent(UITransform)
                    if (node_UITransform.getBoundingBox().contains(new Vec2(v3_touchStart_edit.x,v3_touchStart_edit.y))) {
                        this.numBlockEditMove = i
                        let node_block = null;
                        if (this.blockPool.size() > 0) { 
                            node_block = this.blockPool.get();
                        } else { 
                            node_block = instantiate(this.preBlock);
                        }
                        node_block.parent = this.parentBlocks
                        node_block.setPosition(children[i].getPosition())
                        let ts_block = node_block.getComponent(block)
                        let num_type_random = Math.floor(Math.random()*gameData.numBlockSum)
                        ts_block.init(num_type_random)
                        this.shuaXinLevelInfo()
                        this.pddj()
                        break
                    }
                }
            }else if (this.numTypeEdit == 0) {
                let children = this.parentBlocks.children
                for (let i = children.length-1; i >= 0; i--) {
                    let ts_block = children[i].getComponent(block)
                    // if (ts_block.canTouch == false) {
                    //     continue
                    // }

                    let node_UITransform = children[i].getComponent(UITransform)
                    if (node_UITransform.getBoundingBox().contains(new Vec2(v3_touchStart.x,v3_touchStart.y))) {
                        //console.log('点中了：'+i);
                        this.onBlockKilled(children[i])
                        this.shuaXinLevelInfo()
                        this.pddj()
                        break
                }
                }
            }
            
            return
        }

        // console.log(v2_touchStart)
        // console.log(v3_touchStart)
        
        let children = this.parentBlocks.children
        for (let i = children.length-1; i >= 0; i--) {
            let ts_block = children[i].getComponent(block)
            if (ts_block.canTouch == false) {
                continue
            }

            let node_UITransform = children[i].getComponent(UITransform)
            if (node_UITransform.getBoundingBox().contains(new Vec2(v3_touchStart.x,v3_touchStart.y))) {
                //this.audioSource.playOneShot(this.arrAudio[0],1)
                this.playSound(0);
                this.numTouchStart = i
                //console.log('点中了：'+i);
                tween(children[i])
                    .to(0.1,{scale:new Vec3(1.2,1.2,1.2)})
                    .start()
                break
           }
        }
        
    }

    onTouchMove(event: EventTouch) {
        let v2_touchStart = event.getUILocation()
        let v3_touchStart = this.parentBlocks.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(v2_touchStart.x,v2_touchStart.y,0))
        let v3_touchStart_edit = this.parentEdit.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(v2_touchStart.x,v2_touchStart.y,0))

        if (this.isEditing ) {
            if (this.numTypeEdit == 1) {
                let children = this.parentEdit.children
                for (let i = children.length-1; i >= 0; i--) {
                
                    let node_UITransform = children[i].getComponent(UITransform)
                    if (node_UITransform.getBoundingBox().contains(new Vec2(v3_touchStart_edit.x,v3_touchStart_edit.y))) {
                        if (this.numBlockEditMove == i) {
                            return
                        }
                        this.numBlockEditMove = i
                        let node_block = null;
                        if (this.blockPool.size() > 0) { 
                            node_block = this.blockPool.get();
                        } else { 
                            node_block = instantiate(this.preBlock);
                        }
                        node_block.parent = this.parentBlocks
                        node_block.setPosition(children[i].getPosition())
                        let ts_block = node_block.getComponent(block)
                        let num_type_random = Math.floor(Math.random()*gameData.numBlockSum)
                        ts_block.init(num_type_random)
                        this.shuaXinLevelInfo()
                        this.pddj()
                        break
                    }
                }
            }else if (this.numTypeEdit == 0) {
                let children = this.parentBlocks.children
                for (let i = children.length-1; i >= 0; i--) {
                    let ts_block = children[i].getComponent(block)
                    // if (ts_block.canTouch == false) {
                    //     continue
                    // }

                    let node_UITransform = children[i].getComponent(UITransform)
                    if (node_UITransform.getBoundingBox().contains(new Vec2(v3_touchStart.x,v3_touchStart.y))) {
                        this.onBlockKilled(children[i])
                        this.shuaXinLevelInfo()
                        this.pddj()
                        break
                }
                }
            }
            
            return
        }
    }

    onTouchEnd(event: EventTouch) {

        if (this.isEditing) {
            return
        }

        if (this.gameType != 0) {
            return
        }

        if (this.pdBlockDiMoving()) {
            return
        }

        let v2_touchStart = event.getUILocation()
        let v3_touchStart = this.parentBlocks.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(v2_touchStart.x,v2_touchStart.y,0))

        let children = this.parentBlocks.children
        for (let i = children.length-1; i >= 0; i--) {
            let ts_block = children[i].getComponent(block)
            if (ts_block.canTouch == false) {
                continue
            }

            let node_UITransform = children[i].getComponent(UITransform)
            if (node_UITransform.getBoundingBox().contains(new Vec2(v3_touchStart.x,v3_touchStart.y))) {
                this.numTouchEnd = i
                if (this.numTouchStart == this.numTouchEnd) {
                    let ts_block_1 = children[i].getComponent(block)
                    let block_type = ts_block_1.blockType
                    this.createBlockToBi(block_type, children[i].getPosition(), this.numLevel)
                    this.onBlockKilled(children[i])
                    this.pddj()
                    break
                }
           }
        }

        if (this.numTouchStart != -1) {
            tween(children[this.numTouchStart])
                .to(0.1,{scale:new Vec3(1.,1,1)})
                .start()
        }

        let children_1 = this.parentBlocks.children
        if(children_1.length == 0){
            this.gameType = 1
            if (gameData.isChanllenge){
                this.playSound(4);
            }else{
                this.playSound(3);
            }
            
            this.numLevel++
            // this.xiaochuNum = 0;
            if (this.interstitialAd) {
                this.interstitialAd.show().catch((err) => {
                  console.error(err)
                })
            }
            
            // if (gameData.isChanllenge){
            //     this.passAni.play("overAni")
            // }else{
            //     this.passAni.play("pass")
            // }
            
            this.scheduleOnce(function(){
                this.passAni.play("overAni")
                UIManager.open(UIManager.uiNamePath.challengeSuccess)
                HttpClient.getInstance().sendLevelByType(2);
            },0.5)
        }
    }

    passAniFinish(){
        // UIManager.open(UIManager.uiNamePath.challengeSuccess)
        // HttpClient.getInstance().sendLevelByType(2);
    }

    pdBlockDiMoving(){
        let is_moving = false
        let children = this.parentBlocksDi.children
        if (children.length > 0) {
            let ts_block = children[children.length-1].getComponent(block)
            is_moving = ts_block.isMoving
        }
        return is_moving
    }

    useItemSure(id:number){
        let itemData = LanauageManager.getShopItemData(id);
        gameData.curBuyShopData = itemData;
        UIManager.open(UIManager.uiNamePath.popupUseBtn);
    }

    useItemSureSuccess(id:number){
        if (id == 7){
            this.btn3();
        }else if (id == 5){
            this.btn1()
        }else if (id == 6){
            this.btn2()
        }
    }

    callBackBtn(event:Event,str:string){
        if (str == 'btn_3') {
            if (this.useArrNumDJ[2] > 2 && this.isLimit){
                this.showTip(LanauageManager.getDesStrById(83))
                return;
            }
            if (LanauageManager.getItemNumById(7)  <= 0) {
                AndroidSdk.playAdAddItem(7);
                return
            }
            this.useItemSure(7)
            // this.btn3(true)
            // this.shuaXinDJ()
        }else if (str == 'btn_shuChu') {
            this.shuChuPosBlocks()
        }else if (str == 'btn_1') {//出去3个块
            if (this.useArrNumDJ[0] > 2 && this.isLimit){
                this.showTip(LanauageManager.getDesStrById(83))
                return;
            }
            if (LanauageManager.getItemNumById(5) <= 0) {
                AndroidSdk.playAdAddItem(5);
                return
            }
            if (this.isBtn1()){
                this.useItemSure(5)
            }else{
                this.btn1()
            }
        }else if (str == 'btn_2') {//撤回
            if (this.useArrNumDJ[1] > 2 && this.isLimit){
                this.showTip(LanauageManager.getDesStrById(83))
                return;
            }

            if (LanauageManager.getItemNumById(6) <= 0) {
                AndroidSdk.playAdAddItem(6);
                return
            }
            if (this.isBtn2()){
                this.useItemSure(6)
            }else{
                this.btn2()
            }
        }else if (str == 'btn_fh') {
            // if (gameData.saveData.arrNumDJ[3] <= 0) {
            //     if (this.isWX) {
            //         this.numDJ = 3
            //         this.showJiLiShiPin()
            //     }else{
            //         this.showTip('该道具数量为0')
            //     }
            //     return
            // }
            // gameData.saveData.arrNumDJ[3]--
            // this.shuaXinDJ()
            // this.gameType = 0
            // this.layerOver.active = false
            // this.btn1()
        }else if (str == 'btn_cw') {
            //HttpClient.getInstance().sendLevelByType(0);
            this.beginGame();
        }else if (str == 'btn_yin') {
            let children = this.parentEdit.children
            for (let i = 0; i < children.length; i++) {
                if (children[i].name == 'blockEdit') {
                    children[i].active = !children[i].active
                }
            }
        }else if (str == 'btn_qingKong') {
            this.parentBlocks.removeAllChildren()
            this.shuaXinLevelInfo()
        }else if (str == 'btn_jia') {
            this.numTypeEdit = 1
            this.shuaXinLevelInfo()
        }else if (str == 'btn_jian') {
            this.numTypeEdit = 0
            this.shuaXinLevelInfo()
        }else if (str == 'btn_suiJi') {

            let arr_v3_block_edit = []
            let children = this.parentEdit.children
            for (let i = 0; i < children.length; i++) {
                if (children[i].name == 'blockEdit') {
                    arr_v3_block_edit.push(children[i].getPosition())
                }
            }

            for (let i = 0; i < this.numSuiJi; i++) {
                let node_block = null;
                if (this.blockPool.size() > 0) { 
                    node_block = this.blockPool.get();
                } else {
                    node_block = instantiate(this.preBlock);
                }
                node_block.parent = this.parentBlocks
                let i_v3_random = Math.floor(Math.random()*arr_v3_block_edit.length)
                node_block.setPosition(arr_v3_block_edit[i_v3_random])
                let ts_block = node_block.getComponent(block)
                ts_block.init(Math.floor(Math.random()*gameData.numBlockSum))
            }

            this.shuaXinLevelInfo()
            this.pddj()
        }else if (str == 'btn_study') {
            sys.openURL("https://ke.qq.com/cgi-bin/agency?aid=118802&tuin=954863b4#tab=1&category=-1")
        }
    }

    btn2(){
        let children = this.parentBlocksDi.children
        let i_end = -1
        for (let i = children.length - 1; i >= 0; i--) {
            let ts_block = children[i].getComponent(block)
            if (ts_block.isXiaoChu) {
                continue
            }
            i_end = i
            break
        }

        let num_di_cheHui = -1

        if (i_end != -1) {
            let ts_block = children[i_end].getComponent(block)
            num_di_cheHui = ts_block.numDi
            ts_block.isXiaoChu = true

            let v3_old = ts_block.v3BlockOld
            let v3_world = this.parentBlocksDi.getComponent(UITransform).convertToWorldSpaceAR(v3_old)
            let v3_block = this.parentBlocks.getComponent(UITransform).convertToNodeSpaceAR(v3_world)

            tween(children[i_end])
                .to(0.1,{position:v3_old})
                .call(()=>{
                    let node_block = null;
                    if (this.blockPool.size() > 0) { 
                        node_block = this.blockPool.get();
                    } else { 
                        node_block = instantiate(this.preBlock);
                    }
                    node_block.parent = this.parentBlocks
                    node_block.setPosition(v3_block)
                    node_block.getComponent(block).init(ts_block.blockType)
                    this.pddj()
                })
                .removeSelf()
                .start()
        }

        if (num_di_cheHui == -1) {
            // gameData.saveData.arrNumDJ[1]++
            // this.useArrNumDJ[1] = 0;
            this.showTip(LanauageManager.getDesStrById(69))
        }else{
            gameData.saveData.arrNumDJ[1]--
            this.useArrNumDJ[1]++
            HttpClient.getInstance().sendUseItem(6, false);
            this.shuaXinDJ()
        }

        let children_di_2 = this.parentBlocksDi.children
        for (let i = 0; i < children_di_2.length; i++) {
        
            let ts_block = children_di_2[i].getComponent(block)
            if (ts_block.isXiaoChu) {
                continue
            }
            if (ts_block.numDi > num_di_cheHui && num_di_cheHui != -1) {
                ts_block.numDi = ts_block.numDi - 1
                let xx = this.xxStartDi + this.xxDiOff * ts_block.numDi
                tween(children_di_2[i])
                    .to(0.08,{position:new Vec3(xx,0,0)})
                    .start()
            }
            
        }
       
    }

    isBtn2():boolean{
        let children = this.parentBlocksDi.children
        let i_end = -1
        for (let i = children.length - 1; i >= 0; i--) {
            let ts_block = children[i].getComponent(block)
            if (ts_block.isXiaoChu) {
                continue
            }
            i_end = i
            break
        }

        let num_di_cheHui = -1

        if (i_end != -1) {
            let ts_block = children[i_end].getComponent(block)
            num_di_cheHui = ts_block.numDi
        }
        let isCanuse = num_di_cheHui == -1?false:true;
        return isCanuse;
    }

    btn1(){
        let arr_block_di = []
        let children_di_1 = this.parentBlocksDi.children
        for (let i = 0; i < children_di_1.length; i++) {
            let ts_block = children_di_1[i].getComponent(block)
            if (ts_block.numDi < 3 && ts_block.isXiaoChu == false) {
                arr_block_di.push(children_di_1[i])
            }
        }

        let num_geShu = arr_block_di.length

        if (num_geShu == 0) {
            this.showTip(LanauageManager.getDesStrById(69))
        }else{
            gameData.saveData.arrNumDJ[0]--
            this.useArrNumDJ[0]++
            HttpClient.getInstance().sendUseItem(5, false);
            this.shuaXinDJ()
        }

        for (let i = arr_block_di.length-1; i >= 0; i--) {
            
            let ts_block = arr_block_di[i].getComponent(block)

            let v3_block_di = new Vec3(-this.xxDiOff + ts_block.numDi * this.xxDiOff,this.yyBlockChu,0)
            let v3_world = this.parentBlocksDi.getComponent(UITransform).convertToWorldSpaceAR(v3_block_di)
            let v3_block = this.parentBlocks.getComponent(UITransform).convertToNodeSpaceAR(v3_world)

            ts_block.isXiaoChu = true
            tween(arr_block_di[i])
                .to(0.1,{position:v3_block_di})
                .call(()=>{
                    let node_block = null;
                    if (this.blockPool.size() > 0) { 
                        node_block = this.blockPool.get();
                    } else { 
                        node_block = instantiate(this.preBlock);
                    }
                    node_block.parent = this.parentBlocks
                    node_block.setPosition(v3_block)
                    node_block.getComponent(block).init(ts_block.blockType)
                    this.pddj()
                    //console.log('v3_block:'+v3_block);
                })
                .removeSelf()
                .start()
            
            //arr_block_di[i].removeFromParent()
        }

        let children_di_2 = this.parentBlocksDi.children
        for (let i = 0; i < children_di_2.length; i++) {
        
            let ts_block = children_di_2[i].getComponent(block)
            if (ts_block.isXiaoChu) {
                continue
            }
            ts_block.numDi = ts_block.numDi - num_geShu
            let xx = this.xxStartDi + this.xxDiOff * ts_block.numDi
            tween(children_di_2[i])
                .to(0.08,{position:new Vec3(xx,0,0)})
                .start()
            
        }

    }

    isBtn1():boolean{
        let arr_block_di = []
        let children_di_1 = this.parentBlocksDi.children
        for (let i = 0; i < children_di_1.length; i++) {
            let ts_block = children_di_1[i].getComponent(block)
            if (ts_block.numDi < 3 && ts_block.isXiaoChu == false) {
                arr_block_di.push(children_di_1[i])
            }
        }

        let num_geShu = arr_block_di.length
        let iscanUse = num_geShu == 0?false:true;
        return iscanUse;
    }

    //洗牌功能
    btn3(isUseItem:boolean = true){
        if (isUseItem){
            gameData.saveData.arrNumDJ[2]--
            this.useArrNumDJ[2]++
            HttpClient.getInstance().sendUseItem(7, false);
        }
        this.shuaXinDJ()
        let children = this.parentBlocks.children
        for (let i = 0; i < children.length; i++) {
            let ts_1 = children[i].getComponent(block)
            let i_random = Math.floor(Math.random()*children.length)
            let ts_2 = children[i_random].getComponent(block)

            let type_1 = ts_1.blockType
            let type_2 = ts_2.blockType

            ts_1.shuaXinBlockSPF(type_2)
            ts_2.shuaXinBlockSPF(type_1)

        }
    }

    shuChuPosBlocks(){

    }

    update(deltaTime: number) {
        if (this.gameType == 0){
            gameData.levelSeconds += deltaTime;
        }
    }

    updateCoinTime(){
        gameData.refreshCoinTime++;

        if (gameData.refreshCoinTime > 60){
            gameData.refreshCoinTime = 0;
            HttpClient.getInstance().sendRefreshCoin();
        }

        if (gameData.getArrivalTime(gameData.saveData.boost_card_remaining_time) <= 0){
            gameData.saveData.coin = gameData.getInitNum(gameData.saveData.coin + gameData.saveData.addCoin) 
        }else{
            gameData.saveData.coin = gameData.getInitNum(gameData.saveData.coin +  (gameData.saveData.addCoin*2));
        }
    }

    changeUseTip(event:Event, str:string){

    }

    getmoney:number
    getgold:number              
    getPanelType:number;
    getLevel:number; 

     xiaochuAnimation(curLevel:number){
        return;
        this.xiaochuNum++;
        var isBoss = this.gameData.getIsBoss(curLevel);
        var showLevel = curLevel + 1;
        this.getLevel = curLevel;
        var isGetAni:boolean = true; 
        var isOpenGetPanel:boolean = false; 
        var getMoney:number = 0;
        var getCoin:number = 0;
        var isOpen100: boolean = false;
        if(showLevel == 1){
            if (this.xiaochuNum == 1){
                isGetAni = false;
                //this.newBagPanel.active = true;
            }
            if (this.xiaochuNum == 4){
                isOpenGetPanel = true;
                getMoney = 1;
                getCoin = 2;
            }
        } else if(showLevel == 2){
            if (this.xiaochuNum == 5){
                isOpenGetPanel = true;
                getMoney = 1.2;
                getCoin = 1.5;
            }else if (this.xiaochuNum == 10){
                isOpenGetPanel = true;
                getMoney = 0.5;
                getCoin = 1.5;
            }
        }else if (showLevel >= 3){
            if (this.xiaochuNum % 5 == 0){
                isOpenGetPanel = true;
                getMoney =  randomRangeInt(90, 110)/10;
                getCoin = randomRangeInt(35, 42)/10
            }
        }

        if(AndroidSdk.isTempTest  && AndroidSdk.isAndroid && this.xiaochuNum == 3){
            this.timeTipPanel.active = true;
        }

        // if (this.xiaochuNum*3 == this.itemSum){
        //     this.getPanelType = type;
        // }

        this.getPanelType = 0;
        this.getmoney = 0;
        this.getgold = 0;
        var isPass = this.xiaochuNum * 3 >= this.gameData.getItemNumByLevel(curLevel);
        // if(isOpenGetPanel){
        if(isPass && isBoss){
            var type = getPanelType.get;
            if (this.xiaochuNum * 3 >= this.gameData.getItemNumByLevel(curLevel)){
                type = getPanelType.pass
                //gameData.saveData.curLevel++;
                this.newLevelReset();
            }
            this.getMoneyPanel.active = true;
            this.getmoney = getMoney;
            this.getgold = getCoin;
            this.getPanelType = type;
            //this.getMoneyPanel.getComponent(GetMoneyPanel)?.show(type, getMoney, getCoin, curLevel);
        }

        if (curLevel >= 2 && gameData.saveData.isOpen100Panel.indexOf(curLevel) < 0){
            if (this.xiaochuNum == this.open100Num){
                isOpen100 = true;
            }
            if (this.xiaochuNum == 44){
                isOpen100 = true;
            }
        }

               
        if(isGetAni){
            if (showLevel <= 2){
                this.playGetCoinOrMoneyAnimation(moneyType.gold,0.001)
            }else{
                this.playGetCoinOrMoneyAnimation(moneyType.gold,0.001,false)
                this.playGetCoinOrMoneyAnimation(moneyType.money,0.1);
            }
        }

        if (isOpen100){
            this.openLuck100Panel(curLevel);
        }
    }

    openLuck100Panel(level:number){
        //this.luck100Panel.active = true;
        gameData.saveData.isOpen100Panel.push(level);
    }

    public playGetCoinOrMoneyAnimation(type:number = 2, addNum:number, isSave:boolean = true, isPass:boolean = false){
        //this.getComponent(coinDropManger)?.drop(type, addNum, isSave, isPass);
    }

    hideNewBagPanel(){
        AndroidSdk.playAd(() =>{
            // this.newBagPanel.active = false;
            this.playGetCoinOrMoneyAnimation(moneyType.money, 10);
        }) 
    }

    refresh(){
        if (this.levelmain.active){
            this.levelmain.getComponent(levelView)?.refresh();
        }

        if (this.mainView.active){
            this.mainView.getComponent(mainView)?.refresh();
        }
        
        this.shuaXinDJ();
    }

    beginGame(){
        if (gameData.saveData.hpNum <= 0){
            this.mainView.active = true;
            this.levelmain.active = false;
            this.showTip(LanauageManager.getDesStrById(71));
        }
        this.gameType = 0 
        //gameData.saveData.hpNum--;

        HttpClient.getInstance().sendLevelByType(0);
        this.newLevelReset();
        gameData.resetLevelData();
        this.refresh()
        this.init()
    }

    refreshNewLevel(){
        if(this.numLevel != gameData.saveData.curLevel){
            this.numLevel = gameData.saveData.curLevel;
            this.beginGame();
        }else{
            this.refresh();
        }
    }


     newBtnClick(event:Event,str:string){
        var isSave:boolean = this.getPanelType == getPanelType.pass;
        if (str == "getBtn"){
            AndroidSdk.playAd(() =>{
                this.getMoneyPanel.active = false;
                //this.finshTasPanel.active = true;
                this.playGetCoinOrMoneyAnimation(moneyType.gold,this.getgold, false)
                this.playGetCoinOrMoneyAnimation(moneyType.money,this.getmoney, true, isSave);
            }) 
        }else if (str == "refBtn"){
            this.getMoneyPanel.active = false;
            if (isSave){
                gameData.saveDataClick();
            }
        }else if (str == "getAllBtn"){
            AndroidSdk.playAd(() =>{
                this.getMoneyPanel.active = false;
                this.playGetCoinOrMoneyAnimation(moneyType.gold,this.getgold, false)
                this.playGetCoinOrMoneyAnimation(moneyType.money,this.getmoney, true, isSave);
            })
        }else if (str == "getAllBtn2"){
            AndroidSdk.playAd(() =>{
                this.getMoneyPanel.active = false;
                //gameData.isGuide = true;
                this.wxOutPanel.active = true;
                this.playGetCoinOrMoneyAnimation(moneyType.gold,this.getgold, false)
                this.playGetCoinOrMoneyAnimation(moneyType.money,this.getmoney, true, isSave);
            })
        }else if (str == "outBtn"){
            //this.finshTasPanel.active = false;
            gameData.isGuide = true;
            this.wxOutPanel.active = true;
        }

        else if (str == "openBtn"){
            this.luck100Panel.active = false;
            this.luckGetPanel.active = true;
            this.getgold = randomRangeInt(300, 500)/100;
            //this.luckGetLabel.string = this.getgold.toString();
        }
        else if (str == "luckClose"){
            this.luck100Panel.active = false;
        }

        else if (str == "luckGetBtn"){
            this.luckGetPanel.active = false;
            AndroidSdk.playAd(() =>{
                this.playGetCoinOrMoneyAnimation(moneyType.gold,this.getgold);
            })
        }

        else if (str == "closePassGet"){
            this.passGetPanel.active = false;
        }
    }

    openGoldOutTip(){
        this.goldOutTipPanel.active = true;
    }

    outPanelClick(event:Event, str:string){
        if (str == "openGoldOutPanel"){
            this.goldOutPanel.active = true;
        }

        else if (str == "openTaskPanel"){
            this.tasktPanel.active = true;
        }

        else if (str == "openWxOutPanel"){
            this.wxOutPanel.active = true;
        }

        else if (str == "closeGoldPanel"){
            this.goldOutTipPanel.active = false;
            this.goldOutPanel.active = false;
            this.tasktPanel.active = false;
        }

        else if (str == "closeOutSucessPanel"){
            this.outSuccessPanel.active = false;
            // this.goldOutTipPanel.active = false;
            // this.goldOutPanel.active = false;
        }

        else if (str == "closeNamePanel"){

        }
    }

    onOutSuccess(money:number){
        this.goldOutTipPanel.active = false;
        this.goldOutPanel.active = false;
        this.outSuccessPanel.active = true;

        this.successLab.string = money.toFixed(2)
        this.wxNameLab.string = gameData.saveData.wxName;
    }

    newLevelReset(){
        this.useArrNumDJ = [0,0,0];
        this.xiaochuNum = 0;

    }
}

