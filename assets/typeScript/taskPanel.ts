import { _decorator, Button, Component, game, Label, Node, ProgressBar, Sprite } from 'cc';
import { gameData } from './gameData';
import { taskDropManger } from './animation/taskDropManger';
import { AndroidSdk } from './AndroidSdk';
import { EventManger } from './EventManger';
import { HttpClient } from './net/HttpClient';
const { ccclass, property } = _decorator;

@ccclass('taskPanel')
export class taskPanel extends Component {

    @property(Label)
    goldLab:Label

    @property(Label)
    dayLab:Label

    @property(Label)
    dayLab2:Label

    @property(Node)
    dayTask:Node;

    @property(Node)
    signBtn:Node;

    @property(Node)
    signAlreadyBtn:Node;

    @property([Node])
    btn:Node[];

    @property([ProgressBar])
    pross:ProgressBar[];

    @property([Label])
    prossLab:Label[];

    @property(Node)
    nameId:Node;

    @property([Label])
    watermark:Label[];

    @property(Label)
    wxID:Label

    adNum:number[] = [16,25,35];

    signAdd:number[] = [2,3,5,10,12,15,20]

    curIndex:number = 0;

    times:number = 5;
    timeIndex:number = 0;

    timeRefresh:number = 60;

    protected onEnable(): void {
        this.refresh();
        this.refreshTime();
        HttpClient.getInstance().sendTaskData();
    }

    start() {
        EventManger.eventTarget.on(EventManger.EEventName.PLAY_ANIMATION_TASK, this.playAnima, this)
    }

    refresh(){

        this.goldLab.string = gameData.getShowGolde().toString();
        var desDay:string;
        // if (gameData.isSignToday()){
        //     this.dayLab.string = (gameData.saveData.singDayNum).toString();
        // }else{
        //     this.dayLab.string = (gameData.saveData.singDayNum + 1).toString();
        // }
        this.dayLab.string = (gameData.saveData.singDayNum).toString();
        this.dayLab2.string = "已加入疯狂萝卜第" + gameData.saveData.registerDays + "天";

        this.wxID.string = "用户ID: " +  gameData.saveData.wxId;

        this.signBtn.active = !gameData.isSignToday() && gameData.saveData.singDayNum < this.signAdd.length;

        this.signAlreadyBtn.active = gameData.isSignToday();

        for (var i = 0; i < this.adNum.length; i++) {
            var num = this.adNum[i];

            var adNum = gameData.saveData.taskAdArr[i];

            this.btn[i].children[0].active = adNum < num;
            this.btn[i].children[1].active = adNum >= num;
            this.btn[i].children[1].children[0].getComponent(Label).string = gameData.saveData.taskGetArr.indexOf(i) < 0 ?"领取" :"已领取";
            this.btn[i].children[1].getComponent(Sprite).grayscale = gameData.saveData.taskGetArr.indexOf(i) < 0 ? false : true;
            this.btn[i].children[1].getComponent(Button).interactable = gameData.saveData.taskGetArr.indexOf(i) < 0 ? true : false;

            this.btn[i].children[2].active = false;

            this.pross[i].progress = adNum/num;

            this.prossLab[i].string = adNum + "/" + num;
        }

        //签到标签
        for (var i = 0; i < 7; i++){
            if (this.dayTask.children[i]){
                this.dayTask.children[i].active = gameData.saveData.singDayNum >= (i+1);
            }
        }
        //this.refreshTime()
    }

    refreshTime(){
        for (let index = 0; index < this.watermark.length; index++) {
            var wateLab = this.watermark[index];
            // 获取年月日
            var d = new Date();
            var y = d.getFullYear(); 
            var m = d.getMonth() + 1
            var r = d.getDate()

            wateLab.string = y + '-' + m + '-' + r + " " + d.toTimeString().slice(0,12);
        }
        this.timeRefresh = 60;
    }

    btnClick(event:Event, str: string){
        if (str == "signBtn"){
            if (gameData.saveData.singDayNum < this.signAdd.length){
                AndroidSdk.playAd(() =>{
                    this.curIndex = 0
                    HttpClient.getInstance().sendSignToday();
                    //this.playAnima(0,this.signAdd[gameData.saveData.singDayNum])
                })
            }
        }
        else if (str == "playAd"){
            AndroidSdk.playAd(() =>{
                this.refresh();
            })
        }
        else if (str == "playAd1"){
            AndroidSdk.playAd(() =>{
                this.refresh();
                this.timeIndex = 1
                this.times = 5;
            },1)
        }
        else if (str == "playAd2"){
            AndroidSdk.playAd(() =>{
                this.refresh();
                this.timeIndex = 2
                this.times = 5;
            },2)
        }
        else if (str == "playAd3"){
            AndroidSdk.playAd(() =>{
                this.refresh();
                this.timeIndex = 3
                this.times = 5;
            },3)
        }
        else if (str == "getBtn1"){
            AndroidSdk.playAd(() =>{
                this.curIndex = 1
                HttpClient.getInstance().sendGetTaskReard(0);
            })
        }
        else if (str == "getBtn2"){
            AndroidSdk.playAd(() =>{
                this.curIndex= 2
                HttpClient.getInstance().sendGetTaskReard(1);
            })
        }
        else if (str == "getBtn3"){
            AndroidSdk.playAd(() =>{
                this.curIndex= 3
                HttpClient.getInstance().sendGetTaskReard(2);
            })
        }
        this.refresh();
    }

    playAnima(goldNum:number){
        this.node.getComponent(taskDropManger)?.drop(this.curIndex, goldNum);
    }

    update(deltaTime: number) {
        if (this.times > 0 && this.timeIndex > 0){
            this.times = this.times - deltaTime;

            this.btn[this.timeIndex-1].children[0].active = false;
            this.btn[this.timeIndex-1].children[1].active = false;
            this.btn[this.timeIndex-1].children[2].active = true;
            this.btn[this.timeIndex-1].children[2].children[0].getComponent(Label).string = Math.floor(this.times).toString();
        }else if (this.times <= 0 && this.timeIndex > 0){
            this.timeIndex = 0;
            this.refresh();
        }

        this.timeRefresh -= deltaTime;
        if (this.timeRefresh < 0){
            this.refreshTime();
        }
    }
}

