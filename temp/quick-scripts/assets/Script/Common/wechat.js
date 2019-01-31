(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Common/wechat.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a19eLboc1M9YveUSxy41jo', 'wechat', __filename);
// Script/Common/wechat.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wechat = function () {
    function wechat() {
        _classCallCheck(this, wechat);

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

    _createClass(wechat, [{
        key: 'load',
        value: function load() {
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
    }, {
        key: 'useSDK',
        value: function useSDK() {
            return true;
        }
    }, {
        key: 'login',
        value: function login() {
            var _this = this;

            var successCB = function successCB(res) {
                var data = res.data;
                if (data.status === "0") {
                    var msg = data.data;
                    _this.openid = msg.openid;
                    _this.session_key = msg.session_key;
                    _this.link_key = msg.link_key;
                    _this.timestamp = msg.timestamp;
                    gg.sdkMgr.JSSaveLoginInfo(_this.link_key, _this.timestamp);
                    persist.showTip('登录成功！');
                    if (_this.dataList.length > 0) {
                        for (var i = 0; i < _this.dataList.length; i++) {
                            _this.postLoginData(_this.dataList[i]);
                        }
                        _this.dataList = [];
                    }
                    if (_this.__inviterInfo) {
                        wx.request({
                            url: 'https://tafang2center.ios.gzyouai.com:8071/wx-invite',
                            method: 'POST',
                            data: {
                                inviter: _this.__inviterInfo,
                                link_key: _this.link_key
                            },
                            success: function () {
                                this.__inviterInfo = undefined;
                            }.bind(_this)
                        });
                    }
                } else {
                    persist.showTip('登录验证失败！');
                }
            };
            wx.login({
                success: function success(res) {
                    if (res.code) {
                        cc.log('登录成功！' + res.code);
                        var conf = gg.numerical.openPackage;
                        var channel_key = conf.channel.substr(1, conf.channel.length - 1);
                        wx.request({
                            url: 'https://tafang2center.ios.gzyouai.com:8091/qfgn/login/weixin',
                            data: {
                                channel_key: channel_key,
                                code: res.code
                            },
                            success: successCB,
                            fail: function fail(res) {
                                persist.showTip('请求验证失败！');
                            }
                        });
                    } else {
                        persist.showTip('登录失败！' + res.errMsg);
                        cc.log('登录失败！' + res.errMsg);
                    }
                }
            });
        }
    }, {
        key: 'pay',
        value: function pay(params) {
            var _this2 = this;

            if (cc.sys.os === cc.sys.OS_IOS) {
                persist.showConfirm("<color=#000000>由于政策原因，IOS暂不支持充值，请使用安卓手机充值或者联系客服QQ：</c><color=#ff0000>123456789</c><color=#000000>，对您造成不便，请谅解～</c>", null, "提示", false, true);
                return;
            }
            // var notify_url = 'https://tafang2center.ios.gzyouai.com:8091/qfgn/order/weixin'
            var data = JSON.parse(params);

            var pid = data.PLAYER_ID;
            var channel_key = data.CHANNEL;
            var server_id = data.SERVER_ID;
            var price = Number(data.STORE_PRICE) * 10;
            var storeName = data.STORE_NAME;

            console.log("请求支付");
            var paySuccessCB = function paySuccessCB(res) {
                persist.showTip('支付成功！');
                wx.request({
                    url: 'https://tafang2center.ios.gzyouai.com:8091/qfgn/confirm/weixin',
                    data: {
                        openid: _this2.openid,
                        session_key: _this2.session_key,
                        pid: pid,
                        channel_key: channel_key,
                        server_id: server_id,
                        price: price,
                        name: storeName
                    },
                    success: function success(res) {
                        var data = res.data;
                        console.log(data);
                        if (data == 'success') {
                            persist.showTip('扣款成功！');
                        } else {
                            persist.showTip('扣款失败！');
                        }
                    },
                    fail: function fail(res) {
                        persist.showTip('请求扣款失败！');
                    }
                });
            };
            var getBalanceCB = function getBalanceCB(res) {
                var isTest = res.data.test;
                var data = res.data.data;
                if (data.errcode != null && data.errcode != 0) {
                    persist.showTip(data.errmsg);
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
                            fail: function fail(_ref) {
                                var errMsg = _ref.errMsg,
                                    errCode = _ref.errCode;

                                // 支付失败
                                console.log(errMsg, errCode);
                                persist.showTip(errMsg);
                            }
                        });
                    } else {
                        paySuccessCB();
                    }
                }
            };
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
                success: function () {
                    wx.request({
                        url: 'https://tafang2center.ios.gzyouai.com:8091/service/wxGetBalance',
                        data: {
                            openid: this.openid,
                            channel_key: channel_key,
                            session_key: this.session_key,
                            timestamp: Math.floor(Date.parse(new Date()) / 100)
                        },
                        success: getBalanceCB,
                        fail: function fail() {
                            persist.showTip('查询余额失败！请稍后重试');
                        }
                    });
                }.bind(this),
                fail: function () {
                    this.login();
                }.bind(this)
            });
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

            return true;
        }
    }, {
        key: 'platformLoginServer',
        value: function platformLoginServer(gameParams) {
            var params = JSON.parse(gameParams);
            this.server_id = params.SERVER_ID;
            this.pid = params.PLAYER_ID;
        }
    }, {
        key: 'rechargeResultCallback',
        value: function rechargeResultCallback(money, unit, goods) {}
    }, {
        key: 'showFloatingBall',
        value: function showFloatingBall(isShow) {
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
                });
            }
            if (isShow) {
                this.ball.show();
            } else {
                this.ball.hide();
            }
        }
    }, {
        key: 'shareUserData',
        value: function shareUserData(datas) {
            var KVList = [];
            var timestamp = Date.parse(new Date()) / 1000;
            if (Array.isArray(datas)) {
                for (var i = 0; i < datas.length; i++) {
                    var data = data[i];
                    KVList.push({
                        key: data.key,
                        value: JSON.stringify({ "wxgame": { "score": data.score, "update_time": timestamp }, "playerlv": pp.lv })
                    });
                }
            } else {
                KVList.push({
                    key: datas.key,
                    value: JSON.stringify({ "wxgame": { "score": datas.score, "update_time": timestamp }, "playerlv": pp.lv })
                });
            }
            wx.setUserCloudStorage({ KVDataList: KVList });
        }
    }, {
        key: 'gc',
        value: function gc() {
            wx.triggerGC();
        }
    }, {
        key: 'postLoginData',
        value: function postLoginData(data) {
            var _this3 = this;

            var conf = gg.numerical.openPackage;

            data.link_key = this.link_key;
            data.channel_key = conf.channel.substr(1, conf.channel.length - 1);
            data.sign = gg.md5.hex_md5('wx009@qfgn@9527#009' + data.channel_key + data.link_key); //数据签名
            var successCB = function successCB(res) {
                if (res.data.code) {
                    var link_key = _this3.link_key;
                    var channel_key = gg.numerical.openPackage.channel.substr(1, conf.channel.length - 1);
                    wx.getSystemInfo({
                        success: function success(res) {
                            wx.request({
                                url: 'https://tafang2center.ios.gzyouai.com:8071/wx-sys-info',
                                method: 'POST',
                                data: { link_key: link_key, channel_key: channel_key, info: JSON.stringify(res) }
                            });
                        }
                    });
                }
            };
            wx.request({
                url: 'https://tafang2center.ios.gzyouai.com:8071/wx-login',
                method: 'POST',
                data: data,
                success: successCB
            });
        }
    }, {
        key: 'initRewardedVideoAd',
        value: function initRewardedVideoAd(adUnitId) {
            var _this4 = this;

            this.rewardedVideoAd = this.rewardedVideoAd || wx.createRewardedVideoAd({ adUnitId: adUnitId });
            this.rewardedVideoAd.onError(function () {
                _this4.loadVideoSuccess = false;
            });
            this.rewardedVideoAd.onLoad(function () {
                _this4.loadVideoSuccess = true;
            });
        }
    }, {
        key: 'hideRewardedVideoAd',
        value: function hideRewardedVideoAd() {
            this.rewardedVideoAd && this.rewardedVideoAd.hide();
        }
    }, {
        key: 'watchRewardedVideoAd',
        value: function watchRewardedVideoAd() {
            var _this5 = this;

            if (!this.rewardedVideoAd) return;

            if (this.loadVideoSuccess) {
                this.rewardedVideoAd.show().catch(function (err) {
                    _this5.rewardedVideoAd.load().then(_this5.watchRewardedVideoAd());
                });
            } else {
                this.rewardedVideoAd.load().then(function () {
                    _this5.watchRewardedVideoAd();
                });
            }
        }
    }, {
        key: 'videoEndCallBack',
        value: function videoEndCallBack(successCb, failCb) {
            this.rewardedVideoAd.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    successCb && successCb();
                } else {
                    failCb && failCb();
                    console.log("未看完广告，不能获得奖励");
                }
            });
        }
    }, {
        key: 'createUserInfoButton',
        value: function createUserInfoButton(_parent, onTapCallBack) {
            var self = this;
            if (typeof wx == 'undefined') {
                return;
            }
            var systemInfo = 0;

            var self = this;
            var createButton = function createButton() {
                var button = wx.createUserInfoButton({
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
                button.onTap(function (res) {
                    if (res.errMsg != "getUserInfo:ok") return;
                    self.userInfo = res.userInfo;
                    console.log("获取授权信息 -> ", res);
                    if (typeof onTapCallBack == "function") {
                        onTapCallBack();
                    }
                    button.destroy();
                });
                button.parent = _parent;
            };

            wx.getUserInfo({
                success: function success(res) {
                    if (typeof onTapCallBack == "function") {
                        self.userInfo = res.userInfo;
                        onTapCallBack();
                    }
                },
                fail: function fail() {
                    wx.getSystemInfo({
                        success: function success(res) {
                            console.log("getSystemInfo", res);
                            systemInfo = res;
                            createButton();
                        }
                    });
                }
            });
        }
    }, {
        key: 'isWeiXin',
        value: function isWeiXin() {
            if (typeof navigator == 'undefined') {
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
    }, {
        key: 'createImage',
        value: function createImage(node, url) {
            if (typeof wx != 'undefined') {
                var sprite = node.getComponent(cc.Sprite);
                var size = {
                    width: node.width,
                    height: node.height
                };
                var image = wx.createImage();
                image.onload = function () {
                    var texture = new cc.Texture2D();
                    texture.initWithElement(image);
                    texture.handleLoadedTexture();
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                    node.width = size.width;
                    node.height = size.height;
                };
                image.src = url;
            }
        }
    }]);

    return wechat;
}();

module.exports = new wechat();

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=wechat.js.map
        