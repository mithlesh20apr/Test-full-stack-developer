/* global __dirname */
var path = require('path');
var testUtil = require(path.join(__dirname, 'testUtil'));

exports.getMessage = function(userNameSeed) {
    return {
        senderName: testUtil.getTestTeacher(userNameSeed).firstName + ' ' + testUtil.getTestTeacher(userNameSeed).lastName,
        receiverUserName: testUtil.getTestStudent(userNameSeed).userName,
        title: 'Test message' + userNameSeed,
        content: 'Test content' + userNameSeed,
    }
};

exports.getReply = function(receiverInfo, messageId, userNameSeed) {
    return {
        senderName: testUtil.getTestStudent(userNameSeed).firstName + ' ' + testUtil.getTestStudent(userNameSeed).lastName,
        receiverId: receiverInfo.userId,
        primaryMessageId: messageId,
        title: 'Test message' + userNameSeed,
        content: 'Test content' + userNameSeed
    }
};