const NodeCache = require("node-cache");
const myCache = new NodeCache();

exports.saveVal = function(key, value) {
    myCache.set(key, value, 10000);
    return;
}

exports.getVal = function(key) {
    var value = myCache.get(key);
    return value;
}