(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5700brCwUVO6LBxJ33NY2Qk', 'main', __filename);
// Script/main.js

"use strict";

var NodePoolMgr = require("NodePoolMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        Prefab_rank: cc.Prefab,
        ScrollView: cc.ScrollView,
        spacingY: 5,
        width: 530,
        height: 120
    },

    start: function start() {
        var _this = this;

        var self = this;
        wx.onMessage(function (data) {
            switch (data.type) {
                case "showRank":
                    wx.getFriendCloudStorage({
                        keyList: ['level'],
                        success: function success(res) {
                            console.log("获取好友信息成功::", res.data);
                            self.updateRankList(res.data);
                        },
                        fail: function fail() {
                            console.log("获取好友信息失败");
                        }
                    });
                    break;
                case "closeRank":
                    for (var i = 0; i < _this.content.children.length; i++) {
                        NodePoolMgr.putNode(_this.content.children[i], "rank");
                    }
                    _this.content.removeAllChildren();
                    break;
                default:
                    break;
            }
        });
    },
    updateRankList: function updateRankList(data) {
        this.sortByLevel(data);
        this.content.removeAllChildren();
        this.ScrollView.scrollToTop();
        if (data.length > 5) this.content.setContentSize(cc.size(this.width, this.height * data.length + this.spacingY * (data.length - 1)));

        for (var i = 0; i < data.length; i++) {
            var node = NodePoolMgr.getNode("rank");
            if (!node) node = cc.instantiate(this.Prefab_rank);
            node.parent = this.content;

            var script = node.getComponent("rankComp");

            script.loadInfo(data[i], i);
        }
    },
    sortByLevel: function sortByLevel(data) {
        data.sort(function (a, b) {
            return parseInt(b.KVDataList[0].value) - parseInt(a.KVDataList[0].value);
        });
    }
});

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
        //# sourceMappingURL=main.js.map
        