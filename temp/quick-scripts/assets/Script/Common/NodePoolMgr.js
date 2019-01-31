(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Common/NodePoolMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '01c30W4VCpL2pF8X6e1R3ND', 'NodePoolMgr', __filename);
// Script/Common/NodePoolMgr.js

"use strict";

module.exports = {
    poolMgrList: {},

    createNodePool: function createNodePool(key) {
        this.poolMgrList[key] = [];
    },
    putNode: function putNode(target, key) {
        if (this.poolMgrList[key] == null) {
            this.createNodePool(key);
        }
        this.poolMgrList[key].push(target);
    },
    getNode: function getNode(key) {
        if (this.poolMgrList[key]) {
            if (this.poolMgrList[key].length > 0) {
                return this.poolMgrList[key].pop();
            }
        }
        return null;
    },
    clear: function clear() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (key != null && this.poolMgrList[key]) {
            this.poolMgrList[key].clear();
            this.poolMgrList[key] = null;
        }
    }
};

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
        //# sourceMappingURL=NodePoolMgr.js.map
        