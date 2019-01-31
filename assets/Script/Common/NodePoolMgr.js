module.exports = {
    poolMgrList: {},

    createNodePool(key) {
        this.poolMgrList[key] = [];
    },

    putNode(target, key) {
        if (this.poolMgrList[key] == null) {
            this.createNodePool(key);
        }
        this.poolMgrList[key].push(target);
    },
    getNode(key) {
        if (this.poolMgrList[key]) {
            if (this.poolMgrList[key].length > 0) {
                return this.poolMgrList[key].pop();
            }
        }
        return null;
    },
    clear(key = null) {
        if (key != null && this.poolMgrList[key]) {
            this.poolMgrList[key].clear();
            this.poolMgrList[key] = null;
        }
    }
};