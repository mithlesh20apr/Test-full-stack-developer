/* global __dirname */
var redis = require("redis");
//Get the environment variable
var path = require('path');
var config = require(path.join(__dirname, '..', '..', 'config', 'appConfig'));

var redisClient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

exports.startRedis = function () {
    redisClient.on('connect', function () {
        console.log('Redis connected');
    });
};
//Expose Redis client 
exports.redisClient = redisClient; 