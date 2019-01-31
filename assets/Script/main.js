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

    start() {
        let self = this;
        wx.onMessage(data => {
            switch (data.type) {
                case "showRank":
                    wx.getFriendCloudStorage({
                        keyList: ['level'],
                        success: (res) => {
                            console.log("获取好友信息成功::", res.data);
                            self.updateRankList(res.data);
                        },
                        fail: () => {
                            console.log("获取好友信息失败");
                        }
                    })
                    break;
                case "closeRank":
                    for (let i = 0; i < this.content.children.length; i++) {
                        NodePoolMgr.putNode(this.content.children[i], "rank");
                    }
                    this.content.removeAllChildren();
                    break;
                default:
                    break;
            }
        });

    },
    updateRankList(data) {
        this.sortByLevel(data);
        this.content.removeAllChildren();
        this.ScrollView.scrollToTop();
        if (data.length > 5)
            this.content.setContentSize(cc.size(this.width, this.height * data.length + this.spacingY * (data.length - 1)));

        for (let i = 0; i < data.length; i++) {
            var node = NodePoolMgr.getNode("rank");
            if (!node)
                node = cc.instantiate(this.Prefab_rank);
            node.parent = this.content;

            var script = node.getComponent("rankComp");

            script.loadInfo(data[i], i);
        }

    },
    sortByLevel(data) {
        data.sort(function (a, b) {
            return parseInt(b.KVDataList[0].value) - parseInt(a.KVDataList[0].value);
        })
    },
});