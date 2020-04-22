/* global __dirname */
var redis = require("redis");
var path = require('path');
var redisDb = require(path.join(__dirname, '..', '..', 'global', 'init', 'data', 'redis'));
var redisTokenExpTime = 14400;

exports.saveToken = function (user, token, callback) {
    //After successful sign in save userid/token in the Redis db       
    var userInfo = {
        token: token, 
        firstName: user.firstName,
        /*lastName: user.lastName */
    };
     
    redisDb.redisClient.set(user.id, JSON.stringify(userInfo), function (err, reply) {
        if (err) {
            callback(err, null);
        }
        else {
            //Login expires in 1 hours
            redisDb.redisClient.expire(user.id, redisTokenExpTime, function (err, reply) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, token);
                }
            });
        }
    });
};

exports.getToken = function (req, res, userId, incomingToken, next) {
    //Get saved token from the Redis db and validate
    redisDb.redisClient.get(userId, function (err, userInfo) {        
        if (err) {
            res.status(500);
            return res.send({
                message: 'Internal Server Error'
            });
        }
        if(!userInfo) {
            res.status(401);
            return res.send({
                message: 'Authentication Failed'
            });
        }
        else {
            var userInfoJSON = JSON.parse(userInfo);
            var token = userInfoJSON.token;
            if (!token || token !== incomingToken) {
                res.status(401);
                return res.send({
                    message: 'Authentication Failed'
                });
            }
            
            //Reset key for another 1 hour
            redisDb.redisClient.expire(userId, redisTokenExpTime, function (err, reply) {
                if (err) {
                    res.status(500);
                    return res.send({
                        message: 'Internal Server Error'
                    });
                }
                                          
                req.userRole = userInfoJSON.userRole;     
                req.firstName = userInfoJSON.firstName;
                req.lastName = userInfoJSON.lastName;
                req.token = token;

                next();
            });
        }    
        
        //verifyToken(req, res, token, userId, next);
    });    
};

//Remove saved token during logout
exports.removeToken = function (res, userId, next) {
    redisDb.redisClient.del(userId, function (err, reply) {        
        if (err) {
            res.status(500);
            return res.send({
                message: 'Internal Server Error'
            });
        }
        if (next)
            next();
    });
    
    return;
};



//Check for a valid token
exports.checkToken = function (req, res, userId, incomingToken) {    
    redisDb.redisClient.get(userId, function (err, userInfo) {        
        if (err) {
            res.status(500);
            return res.send({
                message: 'Internal Server Error'
            });
        }
        if(!userInfo) {
            return res.send({ success: false });
        }
        else {
            var userInfoJSON = JSON.parse(userInfo);
            var token = userInfoJSON.token;
            if (!token) {
                return res.send({ success: false });
            }
            else if (token !== incomingToken) {
                res.status(401);
                return res.send({
                    message: 'Authentication Failed'
                });
            }       
            else
                return res.send({ success: true });
        }
    });    
};

//Check for a online Users
exports.checkIsUsrOnline = function (req, res, userId) {
    
    var status = redisDb.redisClient.get(userId, function (err, userInfo) {
        
        if (err || !userInfo) {
            return false;
        }
        else 
            return true;
    });
    
    return status;
};