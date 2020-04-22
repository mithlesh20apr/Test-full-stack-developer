/* global __dirname */
var path = require('path');
var classUtil = require(path.join(__dirname, 'classUtil'));
var messageUtil = require(path.join(__dirname, 'messageUtil'));
var superTest = require("supertest");

exports.sendMessage = function(app, userNameSeed, userInfo, callback) {
    var httpParam = messageUtil.getMessage(userNameSeed);
    
    superTest(app)
        .post('/api/msg/sendmessage')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.sendReply = function(app, userNameSeed, receiverInfo, userInfo, messageId, callback) {
    var httpParam = messageUtil.getReply(receiverInfo, messageId, userNameSeed);
    
    superTest(app)
        .post('/api/msg/sendreply')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.saveDraft = function(app, userNameSeed, userInfo, callback) {
    var httpParam = messageUtil.getMessage(userNameSeed);
    
    superTest(app)
        .post('/api/msg/savedraft')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeDraft = function(app, messageId, userInfo, callback) {
    var httpParam = { messageIds: [messageId] };
    
    superTest(app)
        .post('/api/msg/removedraft')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getAllMessages = function(app, userInfo, callback) {
    superTest(app)
        .get('/api/msg/getallmessages')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getMessageDetails = function(app, userInfo, messageId, callback) {
    var httpParam = { messageId: messageId };
    
    superTest(app)
        .post('/api/msg/getmessagedetails')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeMessage = function(app, userInfo, messageId, callback) {
    var httpParam = { messageIds: [messageId], isHardDelete: true };
    
    superTest(app)
        .post('/api/msg/removemessage')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateStar = function(app, userInfo, messageId, callback) {
    var httpParam = { messageId: messageId, state: true };
    
    superTest(app)
        .post('/api/msg/updateStar')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateReadStatus = function(app, userInfo, messageId, callback) {
    var httpParam = { messageIds: [messageId], markRead: true };
    
    superTest(app)
        .post('/api/msg/updateReadStatus')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};