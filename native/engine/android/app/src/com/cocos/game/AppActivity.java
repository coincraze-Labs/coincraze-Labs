/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.cocos.game;

import android.app.Activity;
import android.graphics.Point;
import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.cocos.lib.JsbBridge;
import com.cocos.service.SDKWrapper;
import com.cocos.lib.CocosActivity;
import com.qq.e.ads.RewardvideoPortraitADActivity;
import com.qq.e.ads.banner2.UnifiedBannerADListener;
import com.qq.e.ads.banner2.UnifiedBannerView;
import com.qq.e.ads.rewardvideo.RewardVideoAD;
import com.qq.e.ads.rewardvideo.RewardVideoADListener;
import com.qq.e.comm.compliance.DownloadConfirmCallBack;
import com.qq.e.comm.compliance.DownloadConfirmListener;
import com.qq.e.comm.managers.GDTAdSdk;
import com.qq.e.comm.util.AdError;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.tencent.mm.opensdk.utils.Log;
import com.yang.R;

import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;


public class AppActivity extends CocosActivity {

    public static AppActivity instance = null;
    public static String wx_appid = "wx72d3cfc963259446";
    public static IWXAPI wx_api;
    public static RewardVideoAD rewardVideoAD = null;

    public static UnifiedBannerView bannerAD = null;

    public static int reqNum = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // DO OTHER INITIALIZATION BELOW
        instance = this;
        SDKWrapper.shared().init(this);
        //新增代码
        Log.e("tt","AppActivity onCreate");
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            //  so just quietly finish and go away, dropping the user back into the activity
            //  at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }

        JsbBridge.setCallback(new JsbBridge.ICallback() {
            @Override
            public void onScript(String usrName, String url) {
                System.out.println("usrName -------" + usrName);
                if(usrName.equals("login")){
                    weixin_login();
                }
                if(usrName.equals("playAd")){
                    playAd();
                }
                if(usrName.equals("playbanner")){
                    playBannerAD();
                }
                if(usrName.equals("hidebanner")){
                    hideBannerAD();
                }
                if(usrName.equals("exit")){
                    exitApp();
                }
                if(usrName.equals("userAgree")){
                    userAgree();
                }

            }
        });

    }

    //用户点击同意协议
    public static void userAgree(){

        instance.createSensorHandler();
        //新增代码
        weixin_Init();

        GDTAdSdk.initWithoutStart(instance.getApplication(), "1207092180");
        GDTAdSdk.start(new GDTAdSdk.OnStartListener() {
            @Override
            public void onStartSuccess() {
                // 推荐开发者在onStartSuccess回调后开始拉广告
            }
            @Override
            public void onStartFailed(Exception e) {
                Log.e("gdt onStartFailed:", e.toString());
            }
        });


    }

    public static void playAd(){

        System.out.println("成功播放广告 -------");
        if (rewardVideoAD == null){
            rewardVideoAD = new RewardVideoAD(instance, "6180562940349931", new RewardVideoADListener() {
                @Override
                public void onADLoad() {
//                    if (rewardVideoAD.getRewardAdType() == RewardVideoAD.REWARD_TYPE_VIDEO) {
//                        Log.d("rewardVideoAD", "eCPMLevel = " + rewardVideoAD.getECPMLevel()
//                                + ", ECPM: " + rewardVideoAD.getECPM()
//                                + " ,video duration = " + rewardVideoAD.getVideoDuration()
//                                + ", testExtraInfo:" + rewardVideoAD.getExtraInfo().get("mp")
//                                + ", request_id:" + rewardVideoAD.getExtraInfo().get("request_id"));
//                    } else if (rewardVideoAD.getRewardAdType() == RewardVideoAD.REWARD_TYPE_PAGE) {
//                        Log.d("rewardVideoAD", "eCPMLevel = " + rewardVideoAD.getECPMLevel()
//                                + ", ECPM: " + rewardVideoAD.getECPM()
//                                + ", testExtraInfo:" + rewardVideoAD.getExtraInfo().get("mp")
//                                + ", request_id:" + rewardVideoAD.getExtraInfo().get("request_id"));
//                    }
                    rewardVideoAD.sendWinNotification(rewardVideoAD.getECPM());
                    if (rewardVideoAD.isValid()){
                        System.out.println("下载成功播放广告 -------");
                        rewardVideoAD.showAD();
                        reqNum = 0;
                    }else{
                        if (reqNum < 10){
                            reqNum = reqNum + 1;
                            System.out.println("无效广告，重新请求广告 -------" + reqNum);
                            playAd();
                        }
                    }
                }

                @Override
                public void onReward(Map<String, Object> map) {
                    //播放成功
                    System.out.println("播放成功播放广告 -------");
                    JsbBridge.sendToScript("playAd", "");
                }
                @Override
                public void onVideoCached() {

                }
                @Override
                public void onADShow() {

                }

                @Override
                public void onADExpose() {

                }

                @Override
                public void onADClick() {

                }

                @Override
                public void onVideoComplete() {

                }

                @Override
                public void onADClose() {

                }
                @Override
                public void onError(AdError adError) {
                    System.out.println("广告错误 --" + adError.getErrorMsg());

                    JsbBridge.sendToScript("showTip", adError.getErrorCode() + adError.getErrorMsg());
                }
            }); // 有声播放
        }
        rewardVideoAD.loadAD();
        System.out.println("下载广告 -------");
    }

    public static void playBannerAD(){
        if (bannerAD == null){
            bannerAD = new UnifiedBannerView(instance, "9121504596713132", new UnifiedBannerADListener() {
                @Override
                public void onNoAD(AdError adError) {
                    System.out.println("广告错误 --" + adError.getErrorMsg());

                    JsbBridge.sendToScript("showTip", adError.getErrorCode() + adError.getErrorMsg());
                }

                @Override
                public void onADReceive() {
                    if (bannerAD.isValid()){
                        System.out.println("下载成功播放广告 -------");
                        //bannerAD.showContextMenu();
                        System.out.println("banner广告高度 -------" + bannerAD.getHeight());
                    }
                }

                @Override
                public void onADExposure() {

                }

                @Override
                public void onADClosed() {

                }

                @Override
                public void onADClicked() {

                }

                @Override
                public void onADLeftApplication() {

                }
            });

            // 一定要在 GL 线程中执行
            instance.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Point screenSize = new Point();
                    instance.getWindowManager().getDefaultDisplay().getSize(screenSize);
                    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(screenSize.x,  Math.round(screenSize.x / 6.4F));
                    instance.addContentView(bannerAD, params);
                    System.out.println("screenSize X-------" + screenSize.x);
                    System.out.println("screenSize Y -------" + params.height);

                    bannerAD.setY(screenSize.y - 45);

                }
            });
        }
        bannerAD.loadAD();
    }

    public static void hideBannerAD(){
        if (bannerAD != null){
            bannerAD.destroy();
        }
    }

    //新增代码
    public static void weixin_Init() {
        wx_api = WXAPIFactory.createWXAPI(instance, wx_appid,true);
        wx_api.registerApp(wx_appid);
    }

    //新增代码
    public static void weixin_login() {
        Log.e("tt","AppActivity weixin_login");
        SendAuth.Req req =new SendAuth.Req();
        req.scope ="snsapi_userinfo";
        req.state = "wechat_sdk_demo_test";
        System.out.println("req is " + req);
        //利用微信api发送请求
        wx_api.sendReq(req);
    }

    //新增代码(回调函数)
    public static void callJsFunction(final String value) {

    }

    public static void exitApp() {
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.shared().onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.shared().onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
        SDKWrapper.shared().onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.shared().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.shared().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.shared().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.shared().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.shared().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.shared().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.shared().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.shared().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.shared().onStart();
        super.onStart();
    }

    @Override
    public void onLowMemory() {
        SDKWrapper.shared().onLowMemory();
        super.onLowMemory();
    }
}
