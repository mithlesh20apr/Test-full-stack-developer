var path = require('path');
var logger = require(path.join(__dirname, '..', 'util', 'logger'));

exports.logInternalExcep = function (msg, methodInfo, metadata) {
    logger.error({
        logType: 'Exception - internal',
        details: {
            error: msg,
            stack: methodInfo,
            requestBody: metadata
        }
    });
};