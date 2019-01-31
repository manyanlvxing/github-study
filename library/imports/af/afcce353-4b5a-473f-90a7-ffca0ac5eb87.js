"use strict";
cc._RF.push(module, 'afcceNTS1pHP5Cn/8oKxeuH', 'rankComp');
// Script/Component/rankComp.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var wechat = require("wechat");
cc.Class({
    extends: cc.Component,

    properties: {
        Node_avatar: cc.Node,
        Label_level: cc.Label,
        Label_name: cc.Label,
        Label_rank: cc.Label
    },
    start: function start() {},
    loadInfo: function loadInfo(data, rank) {
        wechat.createImage(this.Node_avatar, data.avatarUrl);
        this.Label_level.string = data.KVDataList[0].value;
        this.Label_name.string = data.nickname;
        this.Label_rank.string = rank + 1;
    }

    // update (dt) {},

});

cc._RF.pop();