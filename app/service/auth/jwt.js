/* global __dirname */
var jwt = require('jwt-simple');
var moment = require('moment');
var path = require('path');
var redis = require(path.join(__dirname, 'redisTokenMgmt'));
var envConfig = require(path.join(__dirname, '..', '..', 'global', 'config', 'appConfig'));
var check = require(path.join(__dirname, '..', '..', 'service', 'util', 'checkValidObject'));

function createToken(user, callback) {
    //Create payload for a client token
    console.log('createToken user', user)
    var payload = { userId: user.id, secrectMix: envConfig.JWT_TOKEN_MIX }
        //Create encoded token
    var token = encodeToken(payload, envConfig.SECRECT_JWT_TOKEN_KEY);
   // console.log(token);
    //Save token to the in memory db Redis
    //Key value pair (userId, token)
    redis.saveToken(user, token, callback);
    //Return token to the client
    //next(null, token);
}

exports.createToken = createToken;

//Encode token from the payload
function encodeToken(payload, key) {
    console.log('encodeToken payload', payload, key)
    return jwt.encode(payload, key);
}

exports.encodeToken = encodeToken;

//Decode token to get the payload
function decodeToken(token, key) {
    return jwt.decode(token, key);
}

exports.decodeToken = decodeToken;

//Create and send client info for browser cache (local storage)
exports.createAndSendToken = function(user, callback) {
    console.log('createAndSendToken user', user)
    createToken(user, function(err, token) {
        /*var userInfo = {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            userName: user.userName,
            userRole: user.userRole,
            userId: user.id
        };*/
        var userInfo = {
            firstName: user.firstname,
            email: user.email,
            userId: user.id
        };

       // var pictureName = !user.profile.pictureName ? '' : user.profile.pictureName;

        callback(err, userInfo, token);
    });
};

//Validate token has two steps:
//1. Token find and match in Redis db
//2. If Token found then decode and match with the original payload
exports.validateToken = function(req, res, next) {
    console.log('validateToken', req.body.userId)
    validateHeader(req, res, function(token) {
        redis.getToken(req, res, req.body.userId, token, next);
    });

};

//During first time client load or browser refresh check the 
//browser cached token is valid or expired
exports.checkToken = function(req, res) {
    if (!req.headers.authorization) {
        res.status(200);
        res.send(false);
    } else {
        validateHeader(req, res, function(token) {
            redis.checkToken(req, res, req.body.userId, token);
        });
    }
};

//During logout remove token from Redis
//TODO: invalidate token from JWT
exports.removeToken = function(req, res, next) {
    validateHeader(req, res, function() {
        redis.removeToken(res, req.body.userId, next);
    });
};

//Validate token and user info in http header
function validateHeader(req, res, next) {
    console.log('validateHeader', req.headers, req.body)
    if (!req.headers.authorization) {
        res.status(401);
        return res.send({
            message: 'You are not authorized'
        });
    }

    //Recover token from the http header    
    var token = req.headers.authorization.split(' ')[1];
    verifyToken(req, res, token, next);
}

//Decode and verify the token and match with the payload
function verifyToken(req, res, token, callback) {
    var payload = decodeToken(token, envConfig.SECRECT_JWT_TOKEN_KEY);
    console.log('payload', payload)
    if (check.isUndefinedOrNullOrEmptyOrNoLen(payload) ||
        check.isUndefinedOrNullOrEmptyOrNoLen(payload.userId) ||
        check.isUndefinedOrNullOrEmptyOrNoLen(payload.secrectMix) ||
        payload.secrectMix != envConfig.JWT_TOKEN_MIX) {
        res.status(401);
        return res.send({
            message: 'Authentication failed'
        });
    }

    req.userId = payload.userId;
    callback(token);
}


exports.generateCustomToken = function(payload) {
    //payload.secrectMix = '290'; //envConfig.JWT_TOKEN_MIX;
    payload.exp = Math.abs(Date.now() / 1000) + 900;

    //Create encoded token
    return jwt.encode(payload, envConfig.SECRECT_JWT_TOKEN_KEY);
};

exports.decodeCustomToken = function(token) {
    //decode token
    try {
        var payload = decodeToken(token, envConfig.SECRECT_JWT_TOKEN_KEY);

        if (check.isUndefinedOrNullOrEmptyOrNoLen(payload) ||
            check.isUndefinedOrNullOrEmptyOrNoLen(payload.userId)) {
            return null;
        }

        return payload;
    } catch (ex) {
        console.log('err in payment token', ex);
        return null;
    }
};

exports.validateAdminToken = function(req, res, next) {
    var adminToken = req.body.adminToken;
    var secValue = decodeToken(adminToken, envConfig.adminKeyVal);
    req.userId = req.body.teacherId;

    if (secValue.val == envConfig.adminSecVal && secValue.exp > Date.now()) {
        next();
    } else {
        res.status(401);
        return res.send({
            message: 'Authentication failed'
        });
    }
}