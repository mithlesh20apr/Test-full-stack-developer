// /* global after */
// /* global it */
// /* global before */
// /* global __dirname */
// /* global describe */
// /* External Modules */
var expect = require("chai").expect;
var mongoose = require('mongoose');
var path = require('path');
var promise = require('bluebird');
var request = require("supertest");

// /* Internal Modules */

var testInit = require(path.join(__dirname, 'common', 'testInit'));


// // Start process

var userNameSeed = "class-spec";

describe("class specification", function () {
    describe("class api service specification", function () {


        var app = {};
        var teacherInfo = {};
        var studentInfo = {};
        var classId = '';
        var testClass = {};

        before(function (done) {
            testInit.initApp(function (appInstance) {
                app = appInstance;
                initUser();
            })

            function initUser() {
                var testTeacherName = userNameSeed + 'teacher-id';
                var testStudentName = userNameSeed + 'student-id';
                var newTeacher = testInit.TestUtil.getTestTeacher(testTeacherName);
                var newStudent = testInit.TestUtil.getTestStudent(testStudentName);


                promise.all(
                    [
                        testInit.mockApis.createAndSignIn(app, newTeacher),
                        testInit.mockApis.createAndSignIn(app, newStudent)
                    ]).then(function (uInfo) {

                    teacherInfo = {
                        token: uInfo[0].token,
                        userId: uInfo[0].userId,
                        userName: newTeacher.userName,
                        userRole: newTeacher.userRole
                    };

                    studentInfo = {
                        token: uInfo[1].token,
                        userId: uInfo[1].userId,
                        userName: newStudent.userName,
                        userRole: newStudent.userRole
                    };

                    done();
                });
            }
        });


        it("validate create class api - /api/class/createclass", function (done) {
            var sampleClass = testInit.TestUtil.getSampleClass(teacherInfo.userId);

            request(app)
                .post('/api/class/createclass')
                .send(sampleClass)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    testClass = sampleClass.createClassData;
                    classId = res.body;
                    console.log('-- new class created classId --> ', res.body);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.not.be.undefined;
                    done();
                });
        });


        it("validate get classes api - /api/teacher/allclasses", function (done) {

            request(app)
                .get('/api/teacher/allclasses')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    allClassesCheckTeacher(res.body, 'Get all classes taken by a teacher', teacherInfo.userId);
                    done()
                });

        });

        // register a student into class
        it("validate student class registration - /api/class/registerclass", function (done) {

            var httpParam = {
                classId: classId,
                studentName: 'jim'
            };

            request(app)
                .post('/api/class/registerclass')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    console.log('-- registered to Class');
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.true;
                    done();
                });

        });


        //student registerd classes
        it("validate get classes api - /api/student/allclasses", function (done) {

            request(app)
                .get('/api/student/allclasses')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    allClassesCheckStudent(res.body, 'Get all classes taken by a student', studentInfo.userId);
                    done()
                });
        });

        // approve stuudent for join a class
        it('Aprove student for class - /api/class/activatestudent', function (done) {

            var httpParam = {
                classId: classId,
                className: testClass.title,
                studentId: studentInfo.userId
            };
            request(app)
                .post('/api/class/activatestudent')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('-- Class approved ', classId);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.true;
                    done();
                });
        });


        // payment of class
        it("Payment for class - /api/payment/start", function (done) {
            var httpParam = {
                classId: classId,
                classTitle: testClass.title,
                amount: 1000,
                paymentId: 'abc',
                hasCompliedWithTerms: true
            };

            request(app)
                .post('/api/payment/start')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    console.log('-- payment complete for Class ', classId);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.true;
                    done();
                });
        });

        it("validate feedback apis - /api/class/:classId/updatefeedback", function (done) {

            var httpParam = testInit.classUtil.getFeedback(classId);

            request(app)
                .post('/api/class/updatefeedback')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                        done(err);
                    };
                    console.log('-- feedback update');
                    expect(res.body).to.not.be.null;
                    done();
                });
        });

        it("validate feedback apis - /api/class/:classId/getfeedback", function (done) {

            var httpParam = {
                classId: classId
            };

            request(app)
                .get('/api/class/' + classId + '/getfeedback')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    };
                    validateFeedback(res.body, 'feedback');
                    done()
                });
        });

        it("validate feedback apis - /api/class/:classId/getallfeedback", function (done) {

            var httpParam = {
                classId: classId
            };

            request(app)
                .get('/api/class/' + classId + '/getallfeedback')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    };

                    validateAllFeedback(res.body, 'All feedback');
                    done()
                });
        });

        it("validate feedback apis - /api/class/:classId/removefeedback ", function (done) {

            var httpParam = {
                classId: classId
            };

            request(app)
                .post('/api/class/' + classId + '/removefeedback')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    };
                    console.log('-- feedback update');
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.true;
                    done();
                });
        });

        it('validate unregistration class - /api/class/unregisterclass', function (done) {
            var httpParam = {
                classId: classId
            };

            request(app)
                .post('/api/class/unregisterclass')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    };
                    console.log('-- unregister succesfuul');
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.true;
                    done();
                });
        });

        // remove class
        it("validate remove class - /api/class/removeclass", function (done) {
            var httpParam = {
                classId: classId
            };

            request(app)
                .post('/api/class/removeclass')
                .send(httpParam)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                        done(err);
                    }
                    console.log('-- Class removed ', classId);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.true;
                    done();
                });
        });

        /*
                    Finish testing
                */
        after(function () {
            promise.all(
                 [
                     testInit.mockApis.clearUserData(app, {
                            token: teacherInfo.token,
                            userName: teacherInfo.userName
                        }),
                     testInit.mockApis.clearUserData(app, {
                            token: studentInfo.token,
                            userName: studentInfo.userName
                        })
                 ])
                .finally(() => {
                    console.log('finishing test');
                    testInit.disconnectDB;
                    process.exit();
                });
        });
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
};
var checkRecord = function (record) {
    console.log('checking various fields of record');
    expect(record.teacherRemarks[0].remarkDetails).to.equal('Yippeee!!');
    expect(record.teacherRemarks[0].dateOfRemark).to.be.Date;
    expect(record.teacherRemarks[0]._id).to.not.be.null;
    expect(record.allTestDetails).to.not.be.null;
};


var allClassesCheckTeacher = function (userInfo, opMsg, uid) {
    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo).to.not.be.null;
    expect(userInfo).to.not.be.undefined;


    class_ = userInfo[0];
    var temp = class_.title.substring(0, 15);

    console.log('      -- ' + opMsg + ' class title should match with user input');
    expect(temp).equal('fall math class');
    console.log('      -- ' + opMsg + ' class classStartDate should match with user input');
    expect(class_.classStartDate).to.not.be.null;
    expect(class_.classStartDate).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' class classEndDate should match with user input');
    expect(class_.classEndDate).to.not.be.null;
    expect(class_.classEndDate).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' class fee should match with user input');
    expect(class_.fee).equal(1000);
};

var allClassesCheckStudent = function (userInfo, opMsg, uid) {
    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo).to.not.be.null;
    expect(userInfo).to.not.be.undefined;

    class_ = userInfo[0];
    var temp = class_.title.substring(0, 15);

    console.log('      -- ' + opMsg + ' class title should match with user input');
    expect(temp).equal('fall math class');
    console.log('      -- ' + opMsg + ' class classStartDate should match with user input');
    expect(class_.classStartDate).to.not.be.null;
    expect(class_.classStartDate).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' class classEndDate should match with user input');
    expect(class_.classEndDate).to.not.be.null;
    expect(class_.classEndDate).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' class fee should match with user input');
    expect(class_.fee).equal(1000);
};


var validateFeedback = function (feedback, opMsg) {

    console.log('      -- ' + opMsg + ' feedback should not return null or undefined');
    expect(feedback).to.not.be.null;
    expect(feedback).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' feedback teacher id should not null or undefined');
    expect(feedback.teacherId).to.not.be.null;
    expect(feedback.teacherId).to.not.be.undefined;

    var data = feedback.feedback[0];

    console.log('      -- ' + opMsg + ' Comment should match with user input');
    expect(data.comment).equal('Great Stuff!');

};

var validateAllFeedback = function (feedback, opMsg) {

    console.log('      -- ' + opMsg + ' All feedback should not null or undefined');
    expect(feedback).to.not.be.null;
    expect(feedback).to.not.be.undefined;

    var data = feedback[0];

    console.log('      -- ' + opMsg + ' Comment should match with user input');
    expect(data.comment).equal('Great Stuff!');

};
