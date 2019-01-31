
class wechat {
    constructor() {
        this.userInfo = null;
        this.openid = null;
        this.session_key = null;
        this.link_key = null;
        this.timestamp = null;
        this.pid = null;
        this.server_id = null;
        this.dataList = [];
        this.rewardedVideoAd = null;
        this.loadVideoSuccess = false;
    }
    load() {
        wx.setPreferredFramesPerSecond(30);
        wx.showShareMenu();
        // this.initRewardedVideoAd("xxxxx");

        // if (typeof wx.getUpdateManager === 'function') {
        //     const updateManager = wx.getUpdateManager()
        //     updateManager.onUpdateReady(() => {
        //         wx.showModal({
        //             title: '更新提示',
        //             content: '新版本已经准备好，是否重启应用？',
        //             success: function (res) {
        //                 if (res.confirm) {
        //                     // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        //                     updateManager.applyUpdate()
        //                 }
        //             }
        //         })
        //     })
        // }

        // let successCB = res => {
        //     let data = res.data
        //     wx.onShareAppMessage(() => {
        //         return {
        //             title: data.title,
        //             imageUrl: data.url || 'https://tafang2h5-cdn.ios.gzyouai.com/sharedIcon.jpg',
        //             query: 'type=1' + '&openid=' + this.openid + "&link_key=" + this.link_key + "&server_id=" + this.server_id + "&pid=" + this.pid
        //         }
        //     })
        // }
        // let failCB = () => {
        //     initShareMessage()
        // }
        // function initShareMessage() {
        //     wx.request({
        //         url: 'https://tafang2center.ios.gzyouai.com:8091/service/wxSharedInfo',
        //         success: successCB,
        //         fail: failCB
        //     })
        // }
        // initShareMessage()

        // let launchCB = res => {
        //     let query = res.query
        //     let info = res.referrerInfo
        //     let dataType = query.type || 0;

        //     if (0 == dataType) {
        //         let data = {}
        //         data.scene = res.scene
        //         if (info) data.appid = info.appId

        //         if (query.source_id || (info && info.extraData)) {
        //             if (query.source_id) {
        //                 data.other = JSON.stringify(query)
        //             } else if (info && info.extraData) {
        //                 data.other = JSON.stringify(info.extraData)
        //             } else {
        //                 return;
        //             }
        //         } else {
        //             data.other = '{"source_id":"0000030025"}'
        //         }

        //         if (this.link_key) {
        //             this.postLoginData(data)
        //         } else {
        //             this.dataList.push(data)
        //         }
        //     } else if (1 == dataType) {
        //         this.__inviterInfo = query
        //     }
        // }
        // wx.getLaunchOptionsSync(launchCB)
        // wx.onShow(launchCB)

        // // var getUserInfo = ()=>{
        // //     wx.getUserInfo({
        // //         success: function(res) {
        // //             this.userInfo = res.userInfo
        // //         }
        // //     });
        // // }
        // // wx.getSetting({
        // //     success(res) {
        // //         if (!res.authSetting['scope.userInfo']) {
        // //             wx.authorize({
        // //                 scope: 'wx.getUserInfo',
        // //                 success() {
        // //                     persist.showTip('授权成功！');
        // //                     getUserInfo();
        // //                 }
        // //             })
        // //         } else {
        // //             persist.showTip('已授权！');
        // //             getUserInfo();
        // //         }
        // //     }
        // // })

        // this.lastTime = Date.parse(new Date())
        // //设置屏幕常亮
        // wx.setKeepScreenOn({ keepScreenOn: true })
        // //内存不足警告（仅安卓）
        // wx.onMemoryWarning(() => {
        //     let time = Date.parse(new Date())
        //     if (this.lastTime && time - this.lastTime >= 1000) {
        //         this.lastTime = time
        //         this.gc()
        //     }
        // })

    }
    useSDK() {
        return true;
    }
    login() {
        var successCB = (res) => {
            let data = res.data
            if (data.status === "0") {
                let msg = data.data
                this.openid = msg.openid
                this.session_key = msg.session_key
                this.link_key = msg.link_key
                this.timestamp = msg.timestamp
                gg.sdkMgr.JSSaveLoginInfo(this.link_key, this.timestamp);
                persist.showTip('登录成功！');
                if (this.dataList.length > 0) {
                    for (var i = 0; i < this.dataList.length; i++) {
                        this.postLoginData(this.dataList[i])
                    }
                    this.dataList = [];
                }
                if (this.__inviterInfo) {
                    wx.request({
                        url: 'https://tafang2center.ios.gzyouai.com:8071/wx-invite',
                        method: 'POST',
                        data: {
                            inviter: this.__inviterInfo,
                            link_key: this.link_key
                        },
                        success: function () {
                            this.__inviterInfo = undefined;
                        }.bind(this)
                    });
                }
            } else {
                persist.showTip('登录验证失败！');
            }
        }
        wx.login({
            success: function (res) {
                if (res.code) {
                    cc.log('登录成功！' + res.code)
                    let conf = gg.numerical.openPackage;
                    let channel_key = conf.channel.substr(1, conf.channel.length - 1);
                    wx.request({
                        url: 'https://tafang2center.ios.gzyouai.com:8091/qfgn/login/weixin',
                        data: {
                            channel_key: channel_key,
                            code: res.code
                        },
                        success: successCB,
                        fail: function (res) {
                            persist.showTip('请求验证失败！');
                        }
                    });
                } else {
                    persist.showTip('登录失败！' + res.errMsg);
                    cc.log('登录失败！' + res.errMsg)
                }
            }
        });
    }
    pay(params) {
        if (cc.sys.os === cc.sys.OS_IOS) {
            persist.showConfirm("<color=#000000>由于政策原因，IOS暂不支持充值，请使用安卓手机充值或者联系客服QQ：</c><color=#ff0000>123456789</c><color=#000000>，对您造成不便，请谅解～</c>", null, "提示", false, true);
            return;
        }
        // var notify_url = 'https://tafang2center.ios.gzyouai.com:8091/qfgn/order/weixin'
        var data = JSON.parse(params)

        var pid = data.PLAYER_ID
        var channel_key = data.CHANNEL
        var server_id = data.SERVER_ID
        var price = Number(data.STORE_PRICE) * 10
        var storeName = data.STORE_NAME

        console.log("请求支付")
        var paySuccessCB = (res) => {
            persist.showTip('支付成功！')
            wx.request({
                url: 'https://tafang2center.ios.gzyouai.com:8091/qfgn/confirm/weixin',
                data: {
                    openid: this.openid,
                    session_key: this.session_key,
                    pid: pid,
                    channel_key: channel_key,
                    server_id: server_id,
                    price: price,
                    name: storeName
                },
                success: function (res) {
                    let data = res.data
                    console.log(data)
                    if (data == 'success') {
                        persist.showTip('扣款成功！');
                    } else {
                        persist.showTip('扣款失败！');
                    }
                },
                fail: function (res) {
                    persist.showTip('请求扣款失败！');
                }
            });
        }
        var getBalanceCB = (res) => {
            let isTest = res.data.test
            let data = res.data.data
            if (data.errcode != null && data.errcode != 0) {
                persist.showTip(data.errmsg)
            } else {
                if (data.balance < price) {
                    wx.requestMidasPayment({
                        mode: 'game',
                        env: isTest ? 1 : 0,
                        offerId: '1450017632',
                        currencyType: 'CNY',
                        platform: 'android',
                        zoneId: '1',
                        buyQuantity: price,
                        success: paySuccessCB,
                        fail({ errMsg, errCode }) {
                            // 支付失败
                            console.log(errMsg, errCode)
                            persist.showTip(errMsg);
                        }
                    })
                } else {
                    paySuccessCB()
                }
            }
        }
        // var getTokenCB = (res) => {
        //     let data = res.data
        //     this.access_token = data.access_token
        //     wx.request({
        //         url : 'https://tafang2center.ios.gzyouai.com:8091/service/wxGetBalance',
        //         data : {
        //             token : this.access_token,
        //             openid : this.openid,
        //             channel_key : channel_key
        //         },
        //         success : getBalanceCB,
        //         fail() {
        //             persist.showTip('查询余额失败！请稍后重试')
        //         }
        //     })
        // }
        wx.checkSession({
            success: (function () {
                wx.request({
                    url: 'https://tafang2center.ios.gzyouai.com:8091/service/wxGetBalance',
                    data: {
                        openid: this.openid,
                        channel_key: channel_key,
                        session_key: this.session_key,
                        timestamp: Math.floor(Date.parse(new Date()) / 100)
                    },
                    success: getBalanceCB,
                    fail() {
                        persist.showTip('查询余额失败！请稍后重试')
                    }
                })
            }).bind(this),
            fail: (function () {
                this.login()
            }).bind(this)
        })
        // wx.request({
        // url : 'https://tafang2center.ios.gzyouai.com:8091/service/wxAccessToken',
        //     data : {
        //         channel_key : channel_key
        //     },
        //     success : getTokenCB,
        //     fail() {
        //         persist.showTip('请求支付失败！请稍后重试')
        //     }
        // })
        // wx.request({
        //     url: notify_url,
        //     data: {
        //         'openid' : this.openid,
        //         'pid' : pid,
        //         'channel_key' : channel_key,
        //         'server_id' : server_id,
        //         'money' : price,
        //         'storeName' : data.STORE_NAME,
        //     },
        //     success (res) {
        //         console.log("支付订单生成")
        //         let timestamp = Math.floor(Date.parse(new Date())/100)
        //         let data = res.data
        //         if (res.statusCode == 200 && data.status == "SUCCESS") {
        //             wx.requestPayment({
        //                 'timeStamp': String(timestamp),
        //                 'nonceStr': '',
        //                 'package': '',
        //                 'signType': 'MD5',
        //                 'paySign': '',
        //                 'success':function(res){
        //                     persist.showTip('支付成功！')
        //                 },
        //             'fail':function(res){
        //                 persist.showTip('支付失败！' + res.errMsg)
        //             }
        //         } else {

        //         }
        //     });
        //     }
        // })

        return true
    }
    platformLoginServer(gameParams) {
        let params = JSON.parse(gameParams)
        this.server_id = params.SERVER_ID
        this.pid = params.PLAYER_ID
    }
    rechargeResultCallback(money, unit, goods) {

    }
    showFloatingBall(isShow) {
        if (this.ball == undefined) {
            var screenSize = cc.view.getFrameSize();
            this.ball = wx.createGameClubButton({
                icon: 'green',
                style: {
                    left: screenSize.width - 50,
                    top: 76,
                    width: 40,
                    height: 40
                }
            })
        }
        if (isShow) {
            this.ball.show()
        } else {
            this.ball.hide()
        }
    }
    shareUserData(datas) {
        let KVList = []
        let timestamp = Date.parse(new Date()) / 1000;
        if (Array.isArray(datas)) {
            for (var i = 0; i < datas.length; i++) {
                let data = data[i]
                KVList.push({
                    key: data.key,
                    value: JSON.stringify({ "wxgame": { "score": data.score, "update_time": timestamp }, "playerlv": pp.lv })
                })
            }
        } else {
            KVList.push({
                key: datas.key,
                value: JSON.stringify({ "wxgame": { "score": datas.score, "update_time": timestamp }, "playerlv": pp.lv })
            })
        }
        wx.setUserCloudStorage({ KVDataList: KVList })
    }

    gc() {
        wx.triggerGC()
    }

    postLoginData(data) {
        let conf = gg.numerical.openPackage;

        data.link_key = this.link_key
        data.channel_key = conf.channel.substr(1, conf.channel.length - 1);
        data.sign = gg.md5.hex_md5('wx009@qfgn@9527#009' + data.channel_key + data.link_key)//数据签名
        let successCB = res => {
            if (res.data.code) {
                let link_key = this.link_key
                let channel_key = gg.numerical.openPackage.channel.substr(1, conf.channel.length - 1);
                wx.getSystemInfo({
                    success: function (res) {
                        wx.request({
                            url: 'https://tafang2center.ios.gzyouai.com:8071/wx-sys-info',
                            method: 'POST',
                            data: { link_key: link_key, channel_key: channel_key, info: JSON.stringify(res) }
                        })
                    }
                })
            }
        }
        wx.request({
            url: 'https://tafang2center.ios.gzyouai.com:8071/wx-login',
            method: 'POST',
            data: data,
            success: successCB
        })
    }
    initRewardedVideoAd(adUnitId) {
        this.rewardedVideoAd = this.rewardedVideoAd || wx.createRewardedVideoAd({ adUnitId: adUnitId });
        this.rewardedVideoAd.onError(() => {
            this.loadVideoSuccess = false;
        })
        this.rewardedVideoAd.onLoad(() => {
            this.loadVideoSuccess = true;
        });
    }
    hideRewardedVideoAd() {
        this.rewardedVideoAd && this.rewardedVideoAd.hide();
    }
    watchRewardedVideoAd() {
        if (!this.rewardedVideoAd) return;

        if (this.loadVideoSuccess) {
            this.rewardedVideoAd.show().catch(err => { this.rewardedVideoAd.load().then(this.watchRewardedVideoAd()) });
        } else {
            this.rewardedVideoAd.load().then(() => {
                this.watchRewardedVideoAd();
            })
        }
    }
    videoEndCallBack(successCb, failCb) {
        this.rewardedVideoAd.onClose(
            res => {
                if (res && res.isEnded || res === undefined) {
                    successCb && successCb();
                } else {
                    failCb && failCb();
                    console.log("未看完广告，不能获得奖励");
                }
            }
        )
    }
    createUserInfoButton(_parent, onTapCallBack) {
        var self = this;
        if (typeof (wx) == 'undefined') {
            return;
        }
        var systemInfo = 0;

        var self = this;
        var createButton = function () {
            let button = wx.createUserInfoButton({
                type: 'image',
                // type: 'text',

                // image: "https://h5game-1255801610.cos.ap-shanghai.myqcloud.com/game/wxResorces/alpha.png",
                image: 'https://twzwcdn.ios.gzyouai.com/wxgame/image/userInfoBg.png',
                // text: '授权',
                style: {
                    left: 0,
                    top: 0,
                    width: systemInfo.windowWidth,
                    height: systemInfo.windowHeight,
                    lineHeight: 40,
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            });
            button.onTap((res) => {
                if (res.errMsg != "getUserInfo:ok") return;
                self.userInfo = res.userInfo;
                console.log("获取授权信息 -> ", res);
                if (typeof (onTapCallBack) == "function") {
                    onTapCallBack();
                }
                button.destroy();
            });
            button.parent = _parent;
        };


        wx.getUserInfo({
            success: function (res) {
                if (typeof (onTapCallBack) == "function") {
                    self.userInfo = res.userInfo;
                    onTapCallBack();
                }
            },
            fail: function () {
                wx.getSystemInfo({
                    success: function (res) {
                        console.log("getSystemInfo", res);
                        systemInfo = res;
                        createButton();
                    }
                });
            }
        })
    }
    isWeiXin() {
        if (typeof (navigator) == 'undefined') {
            return false;
        }
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') != -1) {
            console.log("微信平台");
            return true;
        } else {
            return false;
        }
    }
    createImage(node, url) {
        if (typeof (wx) != 'undefined') {
            var sprite = node.getComponent(cc.Sprite);
            var size = {
                width: node.width,
                height: node.height
            };
            let image = wx.createImage();
            image.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                node.width = size.width;
                node.height = size.height;
            };
            image.src = url;
        }
    }
}

module.exports = new wechat();