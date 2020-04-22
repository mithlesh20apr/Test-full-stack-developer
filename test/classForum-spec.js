// /* External Modules */
// var expect = require("chai").expect;
// var mongoose = require('mongoose');
// var path = require('path');
// var Promise = require('bluebird');
// var superTest = require("supertest");
// var restify = require("restify");
// var bodyParser = require('body-parser');

// /* Internal Modules */
// require('./models');


// var userNameSeed = 'classForum-spec';
// describe("test specification", function () {

//     describe(" class-forum api service specification", function () {

//         var app = restify.createServer();
//         app.use(bodyParser.json());
//         var teacherApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'teacherApi'));
//         var testApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'testApi'));
//         var classApi = require(path.join(__dirname, '..', 'app', 'routes', 'class', 'classApi'));
//         var classForumApi = require(path.join(__dirname, '..', 'app', 'routes', 'class', 'classForumApi'));
//         var studentApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'studentApi'));
//         var authApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'authApi'));
//         var resourceApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'resourceApi'));

//         before(function (done) {
//             connectDB('mongodb://localhost:30001,localhost:30002,localhost:30003/cloudschool?replicaSet=rep1')
//                 .then(function () {
//                     teacherApi(app);
//                     authApi(app);
//                     classApi(app);
//                     classForumApi(app);
//                     done();
//                 });
//         });

//         it("validate createthread api - /api/privateforum/createthread", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'createthread', function () {
//                 mockApis.activateAccount(app, 'teacher', userNameSeed + 'createthread', function () {
//                     //sign in as teacher
//                     mockApis.signIn(app, true, userNameSeed + 'createthread', function (userInfo) {
//                         //create class    

//                         mockApis.createClass(app, userInfo, function (classId) {

//                             //create thread with userID and class ID just created
//                             forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                                 //checks if newly create thread is null or not
//                                 console.log('CreateThread', forumThread);
//                                 expect(forumThread).to.not.be.null;
//                                 //removes thread           
//                                 removeForumData.removeThread(classForumModel, forumThread._id, function () {
//                                     //removes class      
//                                     removeMockData.deleteClass(classModel, classId, function () {
//                                         //removes teacher     
//                                         removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {

//                                             mockApis.signOut(app, userInfo.token, done);
//                                         });
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });

//         });

//         it("validate removethread api - /api/privateforum/removethread", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'removethread', function () {
//                 mockApis.activateAccount(app, 'teacher', userNameSeed + 'removethread', function () {
//                     mockApis.signIn(app, true, userNameSeed + 'removethread', function (userInfo) {
//                         mockApis.createClass(app, userInfo, function (classId) {

//                             //creates a thread first
//                             forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                                 expect(forumThread).to.not.be.null;
//                                 //removes the thread just created     

//                                 forumApis.deleteThread(app, userInfo, classId, forumThread, function (response) {

//                                     //checks if the response is true     
//                                     expect(response).to.be.true;
//                                     removeMockData.deleteClass(classModel, classId, function () {
//                                         removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                             mockApis.signOut(app, userInfo.token, done);
//                                         });
//                                     });

//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate getthread api - /api/privateforum/getthread", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'getthread', function () {
//                 mockApis.activateAccount(app, 'teacher', userNameSeed + 'getthread', function () {
//                     //sign in as teacher
//                     mockApis.signIn(app, true, userNameSeed + 'getthread', function (userInfo) {
//                         //create class    
//                         mockApis.createClass(app, userInfo, function (classId) {
//                             //create thread with userID and class ID just created
//                             forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                                 //checks if newly create thread is null or not
//                                 expect(forumThread).to.not.be.null;
//                                 //queries for the newly created thread     
//                                 forumApis.getThread(app, userInfo, classId, forumThread, function (response) {
//                                     expect(forumThread).to.not.be.null;
//                                     removeForumData.removeThread(classForumModel, forumThread, function () {
//                                         //removes class      
//                                         removeMockData.deleteClass(classModel, classId, function () {
//                                             //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 mockApis.signOut(app, userInfo.token, done);
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


//         it("validate edittopic api - /api/privateforum/edittopic", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'edittopic', function () {
//                 mockApis.activateAccount(app, 'teacher', userNameSeed + 'edittopic', function () {
//                     //sign in as teacher
//                     mockApis.signIn(app, true, userNameSeed + 'edittopic', function (userInfo) {
//                         //create class    
//                         mockApis.createClass(app, userInfo, function (classId) {
//                             //create thread with userID and class ID just created
//                             forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                                 //checks if newly create thread is null or not
//                                 expect(forumThread).to.not.be.null;
//                                 forumApis.editTopic(app, userInfo, classId, forumThread, function (editTopicResponse) {
//                                     //check if the response is true  
//                                     expect(editTopicResponse).to.be.true;
//                                     //removes thread           
//                                     removeForumData.removeThread(classForumModel, forumThread, function () {
//                                         //removes class      
//                                         removeMockData.deleteClass(classModel, classId, function () {
//                                             //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 mockApis.signOut(app, userInfo.token, done);
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



//         it("validate addcomment api - /api/privateforum/addcomment", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'addcomment', function () {
//                 mockApis.activateAccount(app, 'teacher', userNameSeed + 'addcomment', function () {
//                     //sign in as teacher
//                     mockApis.signIn(app, true, userNameSeed + 'addcomment', function (userInfo) {
//                         //create class    
//                         mockApis.createClass(app, userInfo, function (classId) {
//                             //create thread with userID and class ID just created
//                             forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                                 //checks if newly create thread is null or not
//                                 expect(forumThread).to.not.be.null;
//                                 forumApis.editTopic(app, userInfo, classId, forumThread, function (editTopicResponse) {
//                                     //check if the response is true  
//                                     expect(editTopicResponse).to.be.true;
//                                     //add new comment                           
//                                     forumApis.addComment(app, userInfo, classId, forumThread, function (addCommentResponse) {
//                                         //check if comment is added
//                                         expect(addCommentResponse).to.not.be.null;
//                                         //removes thread           
//                                         removeForumData.removeThread(classForumModel, forumThread, function () {
//                                             //removes class      
//                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                 //removes teacher     
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     mockApis.signOut(app, userInfo.token, done);
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

//         it("validate addsubcommentcontent api - /api/privateforum/addsubcommentcontent", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'addsubcommentcontent', function () {
//                 //sign in as teacher
//                 mockApis.signIn(app, true, userNameSeed + 'addsubcommentcontent', function (userInfo) {
//                     //create class    
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         //create thread with userID and class ID just created
//                         forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                             //checks if newly create thread is null or not
//                             expect(forumThread).to.not.be.null;

//                             //add new comment
//                             forumApis.addComment(app, userInfo, classId, forumThread._id, function (addCommentResponse) {


//                                 //check if comment is added
//                                 expect(addCommentResponse).to.not.be.null;
//                                 forumApis.addSubComment(app, userInfo, classId, forumThread._id, addCommentResponse, function (subcommentResp) {
//                                     expect(subcommentResp).to.not.be.null;
//                                     //removes thread           
//                                     removeForumData.removeThread(classForumModel, forumThread._id, function () {
//                                         //removes class      
//                                         removeMockData.deleteClass(classModel, classId, function () {
//                                             //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 mockApis.signOut(app, userInfo.token, done);
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

//         it("validate addsubcommentcontent api - /api/privateforum/editsubcomment", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'editsubcomment', function () {
//                 //sign in as teacher
//                 mockApis.signIn(app, true, userNameSeed + 'editsubcomment', function (userInfo) {
//                     //create class    
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         //create thread with userID and class ID just created
//                         forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                             //checks if newly create thread is null or not
//                             expect(forumThread).to.not.be.null;
//                             //add new comment
//                             forumApis.addComment(app, userInfo, classId, forumThread, function (addCommentResponse) {
//                                 //check if comment is added
//                                 expect(addCommentResponse).to.not.be.null;
//                                 forumApis.addSubComment(app, userInfo, classId, forumThread, addCommentResponse, function (subcommentResp) {


//                                     expect(subcommentResp).to.not.be.null;
//                                     forumApis.editSubComment(app, userInfo, classId, forumThread, addCommentResponse, subcommentResp._id, function (editSubCommentResponse) {
//                                         expect(editSubCommentResponse).to.be.true;
//                                         //removes thread           
//                                         removeForumData.removeThread(classForumModel, forumThread, function () {
//                                             //removes class      
//                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                 //removes teacher     
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     mockApis.signOut(app, userInfo.token, done);
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

//         it("validate addsubcommentcontent api - /api/privateforum/loadsubcomments", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'loadsubcomments', function () {
//                 //sign in as teacher
//                 mockApis.signIn(app, true, userNameSeed + 'loadsubcomments', function (userInfo) {
//                     //create class    
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         //create thread with userID and class ID just created
//                         forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                             //checks if newly create thread is null or not
//                             expect(forumThread).to.not.be.null;
//                             //add new comment
//                             forumApis.addComment(app, userInfo, classId, forumThread._id, function (addCommentResponse) {
//                                 //check if comment is added
//                                 expect(addCommentResponse).to.not.be.null;
//                                 forumApis.addSubComment(app, userInfo, classId, forumThread._id, addCommentResponse, function (subcommentResp) {
//                                     expect(subcommentResp).to.not.be.null;
//                                     forumApis.loadSubComments(app, userInfo, classId, forumThread._id, addCommentResponse, function (loadSubCommentResponse) {
//                                         expect(loadSubCommentResponse).not.to.be.null;
//                                         //removes thread           
//                                         removeForumData.removeThread(classForumModel, forumThread._id, function () {
//                                             //removes class      
//                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                 //removes teacher     
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {

//                                                     mockApis.signOut(app, userInfo.token, done);
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

//         /*
//                   it("validate subscribeforumnotify api - /api/privateforum/subscribeforumnotify", function (done) {
//                          //creates teacher
//                          mockApis.createTeacher(app, userNameSeed + 'subscribeforumnotify', function () {
//                             //sign in as teacher
//                              mockApis.signIn(app, true, userNameSeed  + 'subscribeforumnotify', function (userInfo) { 
//                                //create class    
//                                     mockApis.createClass(app, userInfo, function (classId) {
//                                          //create thread with userID and class ID just created
//                                             forumApis.createThread(app,classId,userInfo,function(forumThread){
//                                                  //checks if newly create thread is null or not
//                                                  expect(forumThread).to.not.be.null;
                                                 
//                                         //queries for the newly created thread     
//                                       forumApis.getThread(app,userInfo,classId,forumThread._id,function(response){
//                                         //  console.log("Response:",response);
//                                              expect(forumThread).to.not.be.null;
                                             
//                                           forumApis.subscribeForum(app,userInfo,classId,forumThread._id,function(subscribeResponse){  
//                                               expect(subscribeResponse).to.be.true; 
//                                              //console.log('Subscribe Noti:',subscribeResponse);
//                                             removeForumData.removeThread(classForumModel, forumThread._id, function(){
//                                       //removes class      
//                                             removeMockData.deleteClass(classModel, classId, function(){
//                                        //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
                                           
//                                             mockApis.signOut(app, userInfo.token, done);
//                                             });    
//                                           });
//                                        });
//                                    });
//                                    });
//                                    });
//                                 });
//                             });
//                         });       
                       
//                    });
       
      
//       */

//         it("validate updatereportedabuse api - /api/privateforum/updatereportedabuse", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'updatereportedabuse', function () {
//                 //sign in as teacher
//                 mockApis.signIn(app, true, userNameSeed + 'updatereportedabuse', function (userInfo) {
//                     //create class    
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         //create thread with userID and class ID just created
//                         forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                             //checks if newly create thread is null or not
//                             expect(forumThread).to.not.be.null;
//                             forumApis.addComment(app, userInfo, classId, forumThread, function (addCommentResponse) {
//                                 forumApis.updateReportedAbuse(app, userInfo, classId, forumThread, addCommentResponse, function (updateReportAbuseResponse) {
//                                     expect(updateReportAbuseResponse).to.be.true;
//                                     //removes thread           
//                                     removeForumData.removeThread(classForumModel, forumThread, function () {
//                                         //removes class      
//                                         removeMockData.deleteClass(classModel, classId, function () {
//                                             //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 mockApis.signOut(app, userInfo.token, done);
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

//         it("validate updatecommentvote api - /api/privateforum/updatecommentvote", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'updatecommentvote', function () {
//                 //sign in as teacher
//                 mockApis.signIn(app, true, userNameSeed + 'updatecommentvote', function (userInfo) {
//                     //create class    
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         //create thread with userID and class ID just created
//                         forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                             //checks if newly create thread is null or not
//                             expect(forumThread).to.not.be.null;
//                             //add new comment
//                             forumApis.addComment(app, userInfo, classId, forumThread._id, function (addCommentResponse) {
//                                 //check if comment is added
//                                 expect(addCommentResponse).to.not.be.null;
//                                 forumApis.updateCommentVote(app, userInfo, classId, forumThread._id, addCommentResponse, function (updateVoteResp) {
//                                     expect(addCommentResponse).to.not.be.true;
//                                     //removes thread           
//                                     removeForumData.removeThread(classForumModel, forumThread._id, function () {
//                                         //removes class      
//                                         removeMockData.deleteClass(classModel, classId, function () {
//                                             //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 mockApis.signOut(app, userInfo.token, done);
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

//         it("validate editcomment api - /api/privateforum/editcomment", function (done) {
//             //creates teacher
//             mockApis.createTeacher(app, userNameSeed + 'editcomment', function () {
//                 //sign in as teacher
//                 mockApis.signIn(app, true, userNameSeed + 'editcomment', function (userInfo) {
//                     //create class    
//                     //console.log('UINFO:',userInfo);
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         //create thread with userID and class ID just created
//                         forumApis.createThread(app, classId, userInfo, function (forumThread) {
//                             //checks if newly create thread is null or not
//                             expect(forumThread).to.not.be.null;
//                             //add new comment
//                             forumApis.addComment(app, userInfo, classId, forumThread, function (addCommentResponse) {
//                                 //check if comment is added
//                                 expect(addCommentResponse).to.not.be.null;
//                                 forumApis.editComment(app, userInfo, classId, forumThread, addCommentResponse, function (editCommentResp) {
//                                     expect(editCommentResp.isSuccess).to.be.true;
//                                     //removes thread           
//                                     removeForumData.removeThread(classForumModel, forumThread, function () {
//                                         //removes class      
//                                         removeMockData.deleteClass(classModel, classId, function () {
//                                             //removes teacher     
//                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                 mockApis.signOut(app, userInfo.token, done);
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
//     });


// });
