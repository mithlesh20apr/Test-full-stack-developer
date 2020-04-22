var crypto = require('crypto');

exports.createSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = function (salt, pwd) {
	console.log('hashPwd aclled', pwd)
    var hmac = crypto.createHmac('sha1', salt);
    console.log('hmac', hmac)
    return hmac.update(pwd).digest('hex');
};