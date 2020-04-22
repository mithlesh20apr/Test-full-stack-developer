var path = require('path');
var logger = require(path.join(__dirname, 'logger'));

exports.invalidParam = function (res, msg) {
    res.status(404);
    return res.send(msg);
};

exports.internal = function (req, res, error) {    
    var authInfo = req.headers.authorization;
    if(authInfo)
        logger.error({ userInfo: authInfo, error: error });
    else
        logger.error({ userInfo: {}, error: error });
    
    res.status(500);
    return res.send('Internal Error. Please contact CloudSchool support');    
};


exports.unauthorised = function (req, res, error) {    
    res.status(401);
    return res.send('You are not authorized [' + error + ']');  
};