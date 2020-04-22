/* global after */
/* global it */
/* global before */
/* global __dirname */
/* global describe */
/* External Modules */
var expect = require("chai").expect;
var mongoose = require('mongoose');
var path = require('path');
var Promise = require('bluebird');
var superTest = require("supertest");
var restify = require("restify");
var bodyParser = require('body-parser');
/* Internal Modules */

/* including DB schema and model to test */
require('./models');

var testUtil = require(path.join(__dirname, 'common', 'testUtil'));

// Start process

var userNameSeed = "class-spec";
describe("class specification", function () {
    describe("class api service specification", function () {
        var app = restify.createServer();
        app.use(bodyParser.json());
        var teacherApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'teacherApi'));
        var testApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'testApi'));
        var classApi = require(path.join(__dirname, '..', 'app', 'routes', 'class', 'classApi'));
        var studentApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'studentApi'));
        var authApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'authApi'));
        var resourceApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'resourceApi'));
        var paymentApi = require(path.join(__dirname, '..', 'app', 'routes', 'misc', 'paymentApi'));
        before(function (done) {
            connectDB('mongodb://localhost:30001,localhost:30002,localhost:30003/cloudschool?replicaSet=rep1').then(function () {
                teacherApi(app);
                testApi(app);
                classApi(app);
                studentApi(app);
                authApi(app);
                resourceApi(app);
                paymentApi(app);
                done();
            });
        });
        // verify class feedback update,get, and removal, and also getallfeedback (called by teacher)
        // create teacher, create class
        // create student1 , register to class , accept, payment
        // update feedback and get feedback check
        // create student2 , register to class , accept, payment
        // update feedback and get feedback check
        // teacher calls get all feedback
        // student 1 removes feedback
        // student 2 removes feedback

        it("validate feedback apis - /api/class/:classId/updatefeedback /api/class/:classId/removefeedback /api/class/:classId/getfeedback /api/class/:classId/getallfeedback", function (done) {
            mockApis.createTeacher(app, userNameSeed + 'allclasses', function () {
                //                        mockApis.activateAccount(app, 'teacher', userNameSeed + 'allclasses', function () {
                var newUser = testUtil.getTestTeacher(userNameSeed + 'allclasses');
                userModel.update({
                    userName: newUser.userName
                }, {
                    active: true
                }).exec(function (err1, result1) {
                    if (err1) {
                        console.log('error', err1);
                    } else {
                        console.log('user Activate');
                    };
                });
                mockApis.signIn(app, true, userNameSeed + 'allclasses', function (userInfo) {
                    done();
                });
                //                        });
                userModel.remove({
                    userName: newUser.userName
                }).exec(function (err1, result1) {
                    if (err1) {
                        console.log('error', err1);
                    } else {
                        console.log('user deleted');
                    };
                });
            });
        });

        after(function () {
            disconnectDB();
        });
    });

    function checkFeedback(fdbck, classId, studentId) {
        console.log('checking feedback values below::');
        console.log('comment checking against value previously fed');
        expect(fdbck.comment).to.equal('Great Stuff!');
        console.log('communication checking against value previously fed');
        expect(fdbck.communication).to.equal(7);
        console.log('knowledge checking against value previously fed');
        expect(fdbck.knowledge).to.equal(10);
        console.log('material checking against value previously fed');
        expect(fdbck.material).to.equal(4);
        console.log('method checking against value previously fed');
        expect(fdbck.method).to.equal(9);
        console.log('studentUserId checking against value previously fed');
        expect(fdbck.studentUserId).to.equal(studentId);
        console.log('classId checking against value previously fed');
        expect(fdbck.classId).to.equal(classId);
        console.log('submitted checking against value previously fed');
        expect(fdbck.submitted).to.be.Date;
    }
    var checkRecord = function (record) {
        console.log('checking various fields of record');
        expect(record.teacherRemarks[0].remarkDetails).to.equal('Yippeee!!');
        expect(record.teacherRemarks[0].dateOfRemark).to.be.Date;
        expect(record.teacherRemarks[0]._id).to.not.be.null;
        expect(record.allTestDetails).to.not.be.null;
    };
});
