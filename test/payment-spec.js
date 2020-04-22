// /* global after */
// /* global it */
// /* global before */
// /* global __dirname */
// /* global describe */

// var expect = require("chai").expect;
// var mongoose = require('mongoose');
// var path = require('path');
// //var userControl = require('../app/controllers/userCtrl');
// var Promise = require('bluebird');
// var request = require("supertest");
// //var Encrypt = require(path.join(__dirname, '..', 'app', 'service', 'util', 'encryption'));
// var restify = require("restify");
// var bodyParser = require('body-parser');

// /* including DB schema and model to test */
// require('./models');

// // Start process

// var userNameSeed = 'payment-spec';

// describe("payment specification", function () {
//     describe("payment api service specification", function () {
//         //var app = express();
//         var app = restify.createServer();
//         app.use(bodyParser.json());

//         var teacherApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'teacherApi'));
//         var authApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'authApi'));
//         var studentApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'studentApi'));
//         var classApi = require(path.join(__dirname, '..', 'app', 'routes', 'class', 'classApi'));
//         var paymentApi = require(path.join(__dirname, '..', 'app', 'routes', 'misc', 'paymentApi'));
//         var testApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'testApi'));

//         before(function (done) {
//             connectDB('mongodb://localhost:30001,localhost:30002,localhost:30003/cloudschool?options')
//                 .then(function () {
//                     teacherApi(app);
//                     authApi(app);
//                     studentApi(app);
//                     classApi(app);
//                     paymentApi(app);
//                     testApi(app);
//                     done();
//                 });
//         });

//         it("validate payment start api - '/api/payment/start'", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'paymentstart', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'paymentstart', function (userInfo) {
//                     mockApis.createClass(app, userInfo, function (classId) {
//                         mockApis.createStudent(app, userNameSeed + 'paymentstart', function () {
//                             mockApis.signIn(app, false, userNameSeed + 'paymentstart', function (studentInfo) {
//                                 mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
//                                     mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
//                                         mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {

//                                             console.log('      -- Payment confirmation.');
//                                             expect(isPaymentSuccess).to.not.be.null;
//                                             expect(isPaymentSuccess).to.not.be.undefined;

//                                             removeMockData.deleteClass(classModel, classId, function () {
//                                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
//                                                         mockApis.signOut(app, userInfo.token, function () {
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


//         after(function () {
//             disconnectDB();
//         });

//     });
// });
