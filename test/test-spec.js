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

// var userNameSeed = 'test-spec';

// describe("test specification", function () {
//     describe("test api service specification", function () {
//         var app = restify.createServer();
//         app.use(bodyParser.json());

//         var teacherApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'teacherApi'));
//         var testApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'testApi'));
//         var classApi = require(path.join(__dirname, '..', 'app', 'routes', 'class', 'classApi'));
//         var studentApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'studentApi'));
//         var authApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'authApi'));
//         var resourceApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'resourceApi'));
//         var paymentApi = require(path.join(__dirname, '..', 'app', 'routes', 'misc', 'paymentApi'));

//         before(function (done) {
//             connectDB('mongodb://localhost:30001,localhost:30002,localhost:30003/cloudschool?options')
//                 .then(function () {
//                     teacherApi(app);
//                     testApi(app);
//                     classApi(app);
//                     studentApi(app);
//                     authApi(app);
//                     resourceApi(app);
//                     paymentApi(app);
//                     done();
//                 });
//         });

//         it("validate create test api - /api/test/createtest", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'createtest', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'createtest', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         console.log('      -- Create test should return the new test id.');
//                         expect(testId).to.not.be.null;
//                         expect(testId).to.not.be.undefined;

//                         removeMockData.deleteTest(testModel, testId, function () {
//                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                 mockApis.signOut(app, userInfo.token, done);
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate update test details api - '/api/test/updatetestdetails'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'updatetestdetails', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'updatetestdetails', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         /*var sampleTest = testUtil.getSampleTest();
//                         sampleTest.testId = testId;
//                         sampleTest.testType = 'Plain';
//                         */
//                         var sampleUpdateTest = testUtil.getSampleUpdateTest();
//                         sampleUpdateTest.testId = testId;
//                         superTest(app)
//                             .post('/api/test/updatetestdetails')
//                             .send(sampleUpdateTest)
//                             .set('Accept', 'application/json')
//                             .set('Authorization', 'Bearer ' + userInfo.token)
//                             .end(function (err, res) {
//                                 var tId = res.body;
//                                 assertCall(tId);
//                             });


//                         function assertCall(tId) {
//                             console.log('      -- Update test details should return the new test id.');
//                             expect(tId).to.not.be.null;
//                             expect(tId).to.not.be.undefined;

//                             removeMockData.deleteTest(testModel, tId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         }
//                     });
//                 });
//             });
//         });
//         // saveQuestion: wizard format
//         it("validate save question api = WIZARD- '/api/test/savequestion'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'savequestion', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'savequestion', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestion(app, testId, userInfo, 0, function (newDoc) {
//                             console.log('      -- Save test question should return the new test.');
//                             expect(newDoc).to.not.be.null;
//                             expect(newDoc).to.not.be.undefined;

//                             removeMockData.deleteTest(testModel, testId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//         // saveQuestion: plain format
//         it("validate save question api = PLAIN- '/api/test/savequestion'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'savequestion', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'savequestion', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             console.log('      -- Save test question should return the new test.');
//                             expect(newDoc).to.not.be.null;
//                             expect(newDoc).to.not.be.undefined;

//                             removeMockData.deleteTest(testModel, testId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });



//         it("validate delete question api - '/api/test/deletequestion'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'deletequestion', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'deletequestion', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestion(app, testId, userInfo, 0, function (newDoc) {
//                             var httpParam = {
//                                 testId: testId,
//                                 questionId: newDoc.question[0]._id
//                             };

//                             superTest(app)
//                                 .post('/api/test/deletequestion')
//                                 .send(httpParam)
//                                 .set('Accept', 'application/json')
//                                 .set('Authorization', 'Bearer ' + userInfo.token)
//                                 .end(function (err, res) {
//                                     assertCall(res.body);
//                                 });

//                             function assertCall(result) {
//                                 console.log('      -- Delete test question should return a boolean, true.');
//                                 expect(result).to.be.true;

//                                 removeMockData.deleteTest(testModel, testId, function () {
//                                     removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                         mockApis.signOut(app, userInfo.token, done);
//                                     });
//                                 });

//                             }
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate reorder question api - '/api/test/updatequestionorder'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'updatequestionorder', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'updatequestionorder', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestion(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createQuestion(app, testId, userInfo, 1, function (newDoc1) {
//                                 var httpParam = {
//                                     testId: testId,
//                                     questions: [
//                                         {
//                                             _id: newDoc1.question[0]._id,
//                                             questionNo: 0
//                                         },
//                                         {
//                                             _id: newDoc.question[0]._id,
//                                             questionNo: 1
//                                         }

//                                             ]
//                                 };

//                                 superTest(app)
//                                     .post('/api/test/updatequestionorder')
//                                     .send(httpParam)
//                                     .set('Accept', 'application/json')
//                                     .set('Authorization', 'Bearer ' + userInfo.token)
//                                     .end(function (err, res) {
//                                         assertCall(res.body);
//                                     });


//                                 function assertCall(result) {
//                                     console.log('      -- Update test question order should return a boolean, true.');
//                                     expect(result).to.be.true;

//                                     removeMockData.deleteTest(testModel, testId, function () {
//                                         removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                             mockApis.signOut(app, userInfo.token, done);
//                                         });
//                                     });
//                                 }
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//         // student sise: opent he question page for him 
//         it("validate create answer api - '/api/test/createtestanswer'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'createtestanswer1', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'createtestanswer1', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestion(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'createtestanswer1', function () {
//                                         mockApis.signIn(app, false, userNameSeed + 'createtestanswer1', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {

//                                                             console.log('      -- Create test answer should return the ans id.');
//                                                             expect(ansId).to.not.be.null;
//                                                             expect(ansId).to.not.be.undefined;
//                                                             /*console.log('      -- Payment confirmation.');
//                                                             expect(isPaymentSuccess).to.not.be.null;
//                                                             expect(isPaymentSuccess).to.not.be.undefined;*/

//                                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                         mockApis.signOut(app, userInfo.token, function () {
//                                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             });
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


//         // student side: save his answer to individual questions: 
//         it("validate savetestsingleanswer api - '/api/test/savetestsingleanswer'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'savetestsingleanswer1', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'savetestsingleanswer1', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestion(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'savetestsingleanswer1', function () {
//                                         mockApis.signIn(app, false, userNameSeed + 'savetestsingleanswer1', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {
//                                                             mockApis.saveSingleAnswer(app, studentInfo, testId, classId, ansId, assertCallback);

//                                                             function assertCallback(individualAnswerId) {
//                                                                 console.log('      -- Save test single answer should return the saved ans id.');
//                                                                 expect(individualAnswerId).to.not.be.null;
//                                                                 expect(individualAnswerId).to.not.be.undefined;


//                                                                 /*console.log('      -- Create test answer should return the ans id.');
//                                                                 expect(ansId).to.not.be.null;
//                                                                 expect(ansId).to.not.be.undefined;
//                                                                 console.log('      -- Payment confirmation.');
//                                                                 expect(isPaymentSuccess).to.not.be.null;
//                                                                 expect(isPaymentSuccess).to.not.be.undefined;*/

//                                                                 removeMockData.deleteClass(classModel, classId, function () {
//                                                                     removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                         removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                             mockApis.signOut(app, userInfo.token, function () {
//                                                                                 mockApis.signOut(app, studentInfo.token, done);
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             }
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
//         // teacher side: it open the students submitted answers for the teacher to be able to view and evaluate
//         // here i am using Plain type of exam format        
//         it("validate evaluate api - '/api/test/evaluate'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'evaluate1', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'evaluate1', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'evaluate1', function () {
//                                         mockApis.signIn(app, false, userNameSeed + 'evaluate1', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {
//                                                             mockApis.saveSingleAnswer(app, studentInfo, testId, classId, ansId, function (individualAnswerId) {
//                                                                 mockApis.openEvaluationPage(app, userInfo, testId, classId, studentInfo.userId, function (studentAnsRes) {

//                                                                     console.log('      -- Save test evaluation should not return empty or null object.');
//                                                                     expect(studentAnsRes).to.not.be.null;
//                                                                     expect(studentAnsRes).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should not contain any result yet.');
//                                                                     expect(studentAnsRes.result).to.not.be.empty;

//                                                                     console.log('      -- Save test evaluation should return the test name.');
//                                                                     expect(studentAnsRes.testName).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should return the test type.');
//                                                                     expect(studentAnsRes.testType).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should return the test format.');
//                                                                     expect(studentAnsRes.testFormat).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should return the test ans id.');
//                                                                     expect(studentAnsRes.submittedTestAnsId).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should return the test total marks, if any.');
//                                                                     expect(studentAnsRes.totalMarks).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should return the test total duration, if any.');
//                                                                     expect(studentAnsRes.totalDuration).to.not.be.undefined;

//                                                                     console.log('      -- Save test evaluation should return the test stat');
//                                                                     expect(studentAnsRes.stat).to.not.be.undefined;
//                                                                     expect(studentAnsRes.stat).to.not.be.empty;

//                                                                     removeMockData.deleteStudentTest(studentTestModel, testId, ansId, function () {
//                                                                         removeMockData.deleteTest(testModel, testId, function () {
//                                                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                                         mockApis.signOut(app, userInfo.token, function () {
//                                                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                                                         });
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             });
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

//         // teacher side: this is called when teacher is done evaulating the answers by the student
//         it("validate evaluate single answer api - '/api/test/savetestsingleevaluation'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'savetestsingleevaluation', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'savetestsingleevaluation', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'savetestsingleevaluation', function () {
//                                         mockApis.signIn(app, false, userNameSeed + 'savetestsingleevaluation', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {
//                                                             mockApis.saveSingleAnswer(app, studentInfo, testId, classId, ansId, function (individualAnswerId) {
//                                                                 mockApis.openEvaluationPage(app, userInfo, testId, classId, studentInfo.userId, function (studentAnsRes) {
//                                                                     mockApis.saveSingleEvaluation(app, userInfo, testId, classId, studentInfo.userId, ansId,
//                                                                         function (studentResId) {

//                                                                             console.log('      -- Save test evaluation should not return empty or null object.');
//                                                                             expect(studentResId).to.not.be.null;
//                                                                             expect(studentResId).to.not.be.undefined;

//                                                                             removeMockData.deleteStudentTest(studentTestModel, testId, ansId, function () {
//                                                                                 removeMockData.deleteTest(testModel, testId, function () {
//                                                                                     removeMockData.deleteClass(classModel, classId, function () {
//                                                                                         removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                                             removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                                                 mockApis.signOut(app, userInfo.token, function () {
//                                                                                                     mockApis.signOut(app, studentInfo.token, done);
//                                                                                                 });
//                                                                                             });
//                                                                                         });
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                 });
//                                                             });
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

//         // student side: this is called when the studetn wants to see his result after evalutation 
//         it("validate evaluate single answer api - '/api/test/gettestresult'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'gettestresult111', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'gettestresult111', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'gettestresult111', function () {
//                                         mockApis.signIn(app, false, userNameSeed + 'gettestresult111', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {
//                                                             mockApis.saveSingleAnswer(app, studentInfo, testId, classId, ansId, function (individualAnswerId) {
//                                                                 mockApis.openEvaluationPage(app, userInfo, testId, classId, studentInfo.userId, function (studentAnsRes) {
//                                                                     mockApis.saveSingleEvaluation(app, userInfo, testId, classId, studentInfo.userId, ansId, function (studentResId) {
//                                                                         var httpParam = {
//                                                                             testId: testId,
//                                                                             classId: classId
//                                                                                 //studentTestId: ansId
//                                                                         };
//                                                                         mockApis.getTestResults(app, httpParam, userInfo, studentInfo, function (testResult) {

//                                                                             console.log('       -- Get test result should not return empty or null object.');
//                                                                             expect(testResult).to.not.be.null;
//                                                                             expect(testResult).to.not.be.undefined;

//                                                                             console.log('      -- Get testresult should contain result.');
//                                                                             expect(testResult.result).to.not.be.undefined;

//                                                                             console.log('      -- Get test result should return the test name.');
//                                                                             expect(testResult.testName).to.not.be.undefined;

//                                                                             console.log('      -- Get test result should return the test type.');
//                                                                             expect(testResult.testType).to.not.be.undefined;

//                                                                             console.log('      -- Get test result should return the test stat');
//                                                                             expect(testResult.stat).to.not.be.undefined;
//                                                                             //expect(testResult.stat).to.not.be.empty;

//                                                                             removeMockData.deleteStudentTest(studentTestModel, testId, ansId, function () {
//                                                                                 removeMockData.deleteTest(testModel, testId, function () {
//                                                                                     removeMockData.deleteClass(classModel, classId, function () {
//                                                                                         removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                                             removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                                                 mockApis.signOut(app, userInfo.token, function () {
//                                                                                                     mockApis.signOut(app, studentInfo.token, done);
//                                                                                                 });
//                                                                                             });
//                                                                                         });
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             });
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

//         it("validate get tests api - '/api/test/gettest'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'gettest', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'gettest', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {

//                         superTest(app)
//                             .get('/api/test/gettests')
//                             .set('Accept', 'application/json')
//                             .set('Authorization', 'Bearer ' + userInfo.token)
//                             .end(function (err, res) {
//                                 callback(res.body);
//                             });


//                         function callback(tests) {

//                             console.log('      -- Get tests should return a valid test collection.');
//                             expect(tests).to.not.be.empty;

//                             console.log('      -- Get tests should return at least a valid test with id.');
//                             expect(tests[0].id).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with name.');
//                             expect(tests[0].name).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with test format.');
//                             expect(tests[0].testFormat).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with test type.');
//                             expect(tests[0].testType).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with total marks.');
//                             expect(tests[0].totalMarks).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with total duration.');
//                             expect(tests[0].totalDuration).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with active status.');
//                             expect(tests[0].activeStatus).to.not.be.undefined;

//                             console.log('      -- Get tests should return at least a valid test with active date created.');
//                             expect(tests[0].dateCreated).to.not.be.undefined;

//                             removeMockData.deleteTest(testModel, testId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         }
//                     });
//                 });
//             });
//         });

//         it("validate get test details api - '/api/test/gettestdetails'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'gettestdetails', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'gettestdetails', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {

//                         superTest(app)
//                             .post('/api/test/gettestdetails')
//                             .send({
//                                 id: testId
//                             })
//                             .set('Accept', 'application/json')
//                             .set('Authorization', 'Bearer ' + userInfo.token)
//                             .end(function (err, res) {
//                                 callback(res.body);
//                             });


//                         function callback(test) {

//                             console.log('      -- Get test should return a valid test collection.');
//                             expect(test).to.not.be.undefined;

//                             console.log('      -- Get test should return a valid test with id.');
//                             expect(test._id).to.not.be.undefined;

//                             console.log('      -- Get test should return a valid test with name.');
//                             expect(test.testName).to.not.be.undefined;

//                             console.log('      -- Get test should return a valid test with test format.');
//                             expect(test.testFormat).to.not.be.undefined;

//                             console.log('      -- Get test should return a valid test with test type.');
//                             expect(test.testType).to.not.be.undefined;

//                             console.log('      -- Get test should return a valid test with total marks.');
//                             expect(test.totalMarks).to.not.be.undefined;

//                             console.log('      -- Get test should return a valid test with total duration.');
//                             expect(test.totalDuration).to.not.be.undefined;

//                             removeMockData.deleteTest(testModel, testId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         }
//                     });
//                 });
//             });
//         });

//         it("validate get test for a student or role based user api - '/api/test/gettest'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'gettest', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'gettest', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'gettest', function (studentInfo) {
//                                         mockApis.signIn(app, false, userNameSeed + 'gettest', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {

//                                                         superTest(app)
//                                                             .post('/api/test/gettest')
//                                                             .send({
//                                                                 testId: testId,
//                                                                 classId: classId,
//                                                                 isPreview: 'false'
//                                                             })
//                                                             .set('Accept', 'application/json')
//                                                             .set('Authorization', 'Bearer ' + studentInfo.token)
//                                                             .end(function (err, res) {
//                                                                 callback(res.body);
//                                                             });


//                                                         function callback(test) {

//                                                             console.log('      -- Get test should return a valid test collection.');
//                                                             expect(test).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with id.');
//                                                             expect(test._id).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with active status.');
//                                                             expect(test.active).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with name.');
//                                                             expect(test.testName).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with test format.');
//                                                             expect(test.testFormat).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with test type.');
//                                                             expect(test.testType).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with total marks.');
//                                                             expect(test.totalMarks).to.not.be.undefined;

//                                                             console.log('      -- Get test should return a valid test with total duration.');
//                                                             expect(test.totalDuration).to.not.be.undefined;

//                                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                                 removeMockData.deleteTest(testModel, testId, function () {
//                                                                     removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                         removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                             mockApis.signOut(app, userInfo.token, function () {
//                                                                                 mockApis.signOut(app, studentInfo.token, done);
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 });
//                                                             });

//                                                         }
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

//         it("validate duplicate test name api - '/api/test/checktestname'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'checktestname', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'checktestname', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {

//                         superTest(app)
//                             .post('/api/test/checktestname')
//                             .send({
//                                 testName: 'adasd_8sdfas77'
//                             })
//                             .set('Accept', 'application/json')
//                             .set('Authorization', 'Bearer ' + userInfo.token)
//                             .end(function (err, res) {
//                                 callback(res.body);
//                             });


//                         function callback(test) {

//                             console.log('      -- Check test name return true.');
//                             expect(test).to.be.true;

//                             removeMockData.deleteTest(testModel, testId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         }
//                     });
//                 });
//             });
//         });

//         it("validate remove test api - '/api/test/removetest'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'removetest', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'removetest', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {

//                         superTest(app)
//                             .post('/api/test/removetest')
//                             .send({
//                                 testId: testId
//                             })
//                             .set('Accept', 'application/json')
//                             .set('Authorization', 'Bearer ' + userInfo.token)
//                             .end(function (err, res) {
//                                 callback(res.body);
//                             });


//                         function callback(tests) {

//                             console.log('      -- Remove test should return an empty collections.');
//                             expect(tests).to.be.empty;

//                             removeMockData.deleteTest(testModel, testId, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         }
//                     });
//                 });
//             });
//         });

//         it("validate allow another test submission api - '/api/test/allowanothersubmission'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'allowanothersubmission', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'allowanothersubmission', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'allowanothersubmission', function () {
//                                         mockApis.signIn(app, false, userNameSeed + 'allowanothersubmission', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {
//                                                             mockApis.saveSingleAnswer(app, studentInfo, testId, classId, ansId, function (individualAnswerId) {

//                                                                 superTest(app)
//                                                                     .post('/api/test/allowanothersubmission')
//                                                                     .send({
//                                                                         testId: testId,
//                                                                         classId: classId,
//                                                                         studentId: studentInfo.userId,
//                                                                         isFinalSubmission: true
//                                                                     })
//                                                                     .set('Accept', 'application/json')
//                                                                     .set('Authorization', 'Bearer ' + userInfo.token)
//                                                                     .end(function (err, res) {
//                                                                         callback(res.body);
//                                                                     });


//                                                                 function callback(isAllowed) {

//                                                                     console.log('      -- Allow another test submission should return true.');
//                                                                     expect(isAllowed).to.be.true;


//                                                                     removeMockData.deleteStudentTest(studentTestModel, testId, ansId, function () {
//                                                                         removeMockData.deleteTest(testModel, testId, function () {
//                                                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                                         mockApis.signOut(app, userInfo.token, function () {
//                                                                                             mockApis.signOut(app, studentInfo.token, done);
//                                                                                         });
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                     });
//                                                                 }
//                                                             });
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

//         it("validate get student class list api - '/api/test/studentclasstestlist'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'gettestsubmissionstatus', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'gettestsubmissionstatus', function (userInfo) {
//                     mockApis.createTest(app, userInfo, function (testId) {
//                         mockApis.createQuestionPlain(app, testId, userInfo, 0, function (newDoc) {
//                             mockApis.createClass(app, userInfo, function (classId) {
//                                 mockApis.assignTest(app, userInfo, classId, testId, function () {
//                                     mockApis.createStudent(app, userNameSeed + 'gettestsubmissionstatus', function (studentInfo) {
//                                         mockApis.signIn(app, false, userNameSeed + 'gettestsubmissionstatus', function (studentInfo) {
//                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {
//                                                         mockApis.createAnswer(app, studentInfo, classId, testId, function (ansId) {
//                                                             mockApis.saveSingleAnswer(app, studentInfo, testId, classId, ansId, function (individualAnswerId) {

//                                                                 superTest(app)
//                                                                     .post('/api/test/studentclasstestlist')
//                                                                     .send({
//                                                                         classId: classId,
//                                                                         studentId: studentInfo.userId
//                                                                     })
//                                                                     .set('Accept', 'application/json')
//                                                                     .set('Authorization', 'Bearer ' + userInfo.token)
//                                                                     .end(function (err, res) {
//                                                                         callback(res.body);
//                                                                     });


//                                                                 function callback(testList) {

//                                                                     console.log('      -- Get student class test list should return at least a valid test.');
//                                                                     expect(testList).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return true.');
//                                                                     expect(testList[0].testStartDateTime).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return true.');
//                                                                     expect(testList[0].testEndDateTime).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid test id.');
//                                                                     expect(testList[0].testId).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid test name.');
//                                                                     expect(testList[0].testName).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid test type.');
//                                                                     expect(testList[0].testType).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid test format.');
//                                                                     expect(testList[0].testFormat).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid test active status.');
//                                                                     expect(testList[0].active).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid final submission status.');
//                                                                     expect(testList[0].isFinalSubmission).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid has-result status.');
//                                                                     expect(testList[0].hasResult).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid has-answer status.');
//                                                                     expect(testList[0].hasAnswer).to.not.be.undefined;

//                                                                     console.log('      -- Get student class test list should return a valid is-submission-time-over status.');
//                                                                     expect(testList[0].isSubmissionTimeOver).to.not.be.undefined;


//                                                                     removeMockData.deleteTest(testModel, testId, function () {
//                                                                         removeMockData.deleteClass(classModel, classId, function () {
//                                                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                                                 removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                                                     mockApis.signOut(app, userInfo.token, function () {
//                                                                                         mockApis.signOut(app, studentInfo.token, done);
//                                                                                     });
//                                                                                 });
//                                                                             });
//                                                                         });
//                                                                     });

//                                                                 }
//                                                             });

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


//         after(function () {
//             disconnectDB();
//         });

//     });
// });
