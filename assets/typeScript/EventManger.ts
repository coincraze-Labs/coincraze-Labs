import { _decorator, Component, EventTarget, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EventManger')
export class EventManger {
    public static eventTarget:EventTarget = new EventTarget();

    static EEventName = {

        REFRESH_GAME: "REFRESH_GAME",           
        SHOW_TIP:"SHOW_TIP",                   
        SHOW_GOLDOUT_TIP:"SHOW_GOLDOUT_TIP",   

        PLAY_ANIMATION_TASK:"PLAY_ANIMATION_TASK", 

        OUT_SUCCESS_PANEL:"OUT_SUCCESS_PANEL", 

        PASS_LEVEL_START:"PASS_LEVEL_START",  

        RESET_RESET_GAME:"RESET_RESET_GAME", 

        IS_SHOW_MAINVIEW:"IS_SHOW_MAINVIEW", 

        BLINK_ANIMATION:"BLINK_ANIMATION",

        ADD_COINANDEXP:"ADD_COINANDEXP",

        REFRESH_COIN_NUM:"REFRESH_COIN_NUM",

        MUSIC_CHANGE_STATE:"MUSIC_STOP",

        PLAY_SOUND_INDEX:"PLAY_SOUND_INDEX",

        USE_ITEM_SURE:"USE_ITEM_SURE",

        OPEN_TON_CONNNECT:"OPEN_TON_CONNNECT",

        LOADING_IS_SHOW:"LOADING_IS_SHOW",
    };
}

