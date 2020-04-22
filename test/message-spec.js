// /* global after */
// /* global it */
// /* global before */
// /* global __dirname */
// /* global describe */

// /* External Modules */
// var expect = require("chai").expect;
// var mongoose = require('mongoose');
// var path = require('path');
// var Promise = require('bluebird');
// var superTest = require("supertest");
// var restify = require("restify");
// var bodyParser = require('body-parser');

// /* Internal Modules */
// /* including DB schema and model to test */
// require('./models');

// var userNameSeed = "message-spec";

// describe("message specification", function() {
//     describe("message api service specification", function() {
        
//         var app = restify.createServer();
//         app.use(bodyParser.json());
        
//         var authApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'authApi'));
//         var teacherApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'teacherApi'));
//         var studentApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'studentApi'));
//         var messageApi = require(path.join(__dirname, '..', 'app', 'routes', 'misc', 'messageApi'));
//         var notificationApi = require(path.join(__dirname, '..', 'app', 'routes', 'misc', 'notificationApi'));
        
//         before(function (done) {
//             connectDB('mongodb://localhost:30001,localhost:30002,localhost:30003/cloudschool?replicaSet=rep1')
//                 .then(function () {
//                     authApi(app);
//                     teacherApi(app);
//                     studentApi(app);
//                     messageApi(app);
//                     notificationApi(app);
//                     done();
//                 });
//         });
        
//         it("validate send message api - /api/msg/sendmessage", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'sendmessage', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'sendmessage', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'sendmessage', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'sendmessage', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'sendmessage', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 removeMockData.deleteMessage(messageModel, messageId, function() {
//                                     removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                     mockApis.signOut(app, userInfo.token, function() {
//                                                         mockApis.signOut(app, studentInfo.token, done);
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate send reply api - /api/msg/sendreply", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'sendreply', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'sendreply', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'sendreply', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'sendreply', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'sendreply', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                                
//                                 mockMessageApis.sendReply(app, userNameSeed + 'sendreply', userInfo, studentInfo, messageId, function(messageId) {
//                                     console.log('      -- Send reply should return the new message Id.');
//                                     expect(messageId).to.not.be.null;
//                                     expect(messageId).to.not.be.undefined;
                                
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate save draft api - /api/msg/savedraft", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'savedraft', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'savedraft', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'savedraft', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'savedraft', function(studentInfo) {
//                             mockMessageApis.saveDraft(app, userNameSeed + 'savedraft', userInfo, function(messageId) {
//                                 console.log('      -- Save draft should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 removeMockData.deleteMessage(messageModel, messageId, function() {
//                                     removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                     mockApis.signOut(app, userInfo.token, function() {
//                                                         mockApis.signOut(app, studentInfo.token, done);
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate remove draft api - /api/msg/removedraft", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'removedraft', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'removedraft', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'removedraft', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'removedraft', function(studentInfo) {
//                             mockMessageApis.saveDraft(app, userNameSeed + 'removedraft', userInfo, function(messageId) {
//                                 console.log('      -- Save draft should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                                
//                                 mockMessageApis.removeDraft(app, messageId, userInfo, function(status) {
//                                     console.log('      -- Remove draft should return true.');
//                                     expect(status).to.be.true;
                        
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate get all messages api - /api/msg/getallmessages", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'getallmessages', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'getallmessages', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'getallmessages', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'getallmessages', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'getallmessages', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 mockMessageApis.getAllMessages(app, userInfo, function(messages) {
//                                     console.log('      -- Get all messages should return non-empty array.');
//                                     expect(messages).to.not.be.empty;
                                    
//                                     console.log('      -- Message should have valid id.');
//                                     expect(messages.msgList[0]._id).to.not.be.null;
//                                     expect(messages.msgList[0]._id).to.not.be.undefined;
                                    
//                                     console.log('      -- Message should have valid title.');
//                                     expect(messages.msgList[0].title).to.not.be.null;
//                                     expect(messages.msgList[0].title).to.not.be.undefined;
                                    
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate get message details api - /api/msg/getmessagedetails", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'getmessagedetails', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'getmessagedetails', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'getmessagedetails', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'getmessagedetails', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'getmessagedetails', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 mockMessageApis.getMessageDetails(app, studentInfo, messageId, function(message) {
//                                     console.log('      -- Message should have valid id.');
//                                     expect(message._id).to.not.be.null;
//                                     expect(message._id).to.not.be.undefined;
                                    
//                                     console.log('      -- Message should have valid title.');
//                                     expect(message.title).to.not.be.null;
//                                     expect(message.title).to.not.be.undefined;
                                    
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate remove message api - /api/msg/removemessage", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'removemessage', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'removemessage', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'removemessage', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'removemessage', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'removemessage', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 mockMessageApis.removeMessage(app, userInfo, messageId, function(status) {
//                                     console.log('      -- Remove message should return true.');
//                                     expect(status).to.be.true;
                                    
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate update star api - /api/msg/updatestar", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'updatestar', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'updatestar', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'updatestar', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'updatestar', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'updatestar', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 mockMessageApis.updateStar(app, studentInfo, messageId, function(status) {
//                                     console.log('      -- Update star should return true.');
//                                     expect(status).to.be.true;
                                    
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         it("validate update read status api - /api/msg/updatereadstatus", function(done) {
//             mockApis.createTeacher(app, userNameSeed + 'updatereadstatus', function () {
//                 mockApis.signIn(app, true, userNameSeed  + 'updatereadstatus', function (userInfo) {
//                     mockApis.createStudent(app, userNameSeed + 'updatereadstatus', function () {
//                         mockApis.signIn(app, false, userNameSeed + 'updatereadstatus', function(studentInfo) {
//                             mockMessageApis.sendMessage(app, userNameSeed + 'updatereadstatus', userInfo, function(messageId) {
//                                 console.log('      -- Send message should return the new message Id.');
//                                 expect(messageId).to.not.be.null;
//                                 expect(messageId).to.not.be.undefined;
                        
//                                 mockMessageApis.updateReadStatus(app, studentInfo, messageId, function(status) {
//                                     console.log('      -- Update read status should return true.');
//                                     expect(status).to.be.true;
                                    
//                                     removeMockData.deleteMessage(messageModel, messageId, function() {
//                                         removeMockData.deleteUserNotification(notificationModel, userInfo.userId, function() {
//                                             removeMockData.deleteUserNotification(notificationModel, studentInfo.userId, function() {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function() {
//                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                         });
//                                                     });
//                                                 });
//                                             });
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
        
//         after(function() {
//             disconnectDB();
//         });
        
//     });
// });