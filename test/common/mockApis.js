/* global __dirname */
var path = require('path');
var testUtil = require(path.join(__dirname, 'testUtil'));
var superTest = require("supertest");
var superagent = require("superagent");
var moment = require('moment');
var jwt = require('jwt-simple');
var envConfig = require(path.join(__dirname, '../..', 'app', 'global', 'config', 'appConfig'));
var promise = require('bluebird');
var testInit = require(path.join(__dirname, 'testInit'));

exports.createAndSignIn = function (app, newUser) {
    
    var postUrl = newUser.userRole == 'teacher' ? '/api/teacher' : '/api/student';

    return new promise(function (resolve) {
        superTest(app)
            .post(postUrl)
            .send(newUser)
            .end(activateAccount);

        function activateAccount(err, res) {
            if (err) {                
                throw new Error(err);
            }

            var token = '';
            // token generation start
            var payload = {
                sub: {
                    email: newUser.userName,
                    phoneNo: newUser.phoneNo,
                    userRole: newUser.userRole
                },
                exp: moment().add(envConfig.emailVerifyExpTime, 'minutes').valueOf()
            };

            var token = jwt.encode(payload, envConfig.EMAIL_SECRET);
            superTest(app)
                .get('/auth/verifyEmailAccount')
                .query({ 'token': token })
                .expect('Location', /\//, userSignIn);
        }

        function userSignIn() {
            httpParam = {
                userName: newUser.userName,
                passwd: newUser.passwd
            };

           console.log('signing in ' , newUser.userName );
            superTest(app)
                .post('/api/user/login')
                .send(httpParam)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        throw new Error(err);
                    };

                    resolve({
                        userId: res.body.user.userId,
                        token: res.body.token
                    });
                });
        }
    })
}

exports.clearUserData = function (app, newUser) {

    return new promise(function (resolve) {
        
        superTest(app)
            .post('/api/user/logout')
            .send({
                logout: true
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + newUser.token)
            .end(function (err, res) {
                if (err){
                    console.log('log out error ', newUser);
                    throw new Error(err);
                }
           
                testInit.removeMockData
                    .removeUser(newUser.userName)
                    .then(resolve);
             console.log('loged out and deleted ', newUser.userName);
            });

    });
}

exports.createTeacher = function (app, userNameSeed, callback) {
    console.log('creating teacher');
    var newUser = testUtil.getTestTeacher(userNameSeed);
    console.log('user -->', newUser);
    var server = superTest.agent('https://localhost:8001');
    superTest(app).post('/api/teacher').send(newUser).end(function (err, res) {

        //        console.log('Created result --> ', err, res)
        callback();
    });
};

exports.createStudent = function (app, userNameSeed, callback) {
    var newUser = testUtil.getTestStudent(userNameSeed);

    superTest(app).post('/api/student').send(newUser).end(function (err, res) {
        var userInfo = res.body;
        callback(userInfo);
    });
};

var activateAccount = function (app, userType, userNameSeed) {
    if (userType === 'teacher') {
        var newUser = testUtil.getTestTeacher(userNameSeed);
    } else {
        var newUser = testUtil.getTestStudent(userNameSeed);
    }

    var token = '';
    // token generation start
    var payload = {
        sub: {
            email: newUser.userName,
            phoneNo: newUser.phoneNo,
            userRole: newUser.userRole
        },
        exp: moment().add(envConfig.emailVerifyExpTime, 'minutes').valueOf()
    };

    var token = jwt.encode(payload, envConfig.EMAIL_SECRET);

    return new promise(function (resolve) {
        superTest(app)
            .get('/auth/verifyEmailAccount')
            .query({ 'token': token })
            .expect('Location', /\//, resolve);
    });
};

exports.activateAccount = activateAccount;

exports.signIn = function (app, isTeacher, userNameSeed) {
    var httpParam = {};
    if (isTeacher) {
        var teacher = testUtil.getTestTeacher(userNameSeed);

        httpParam = {
            userName: teacher.userName,
            passwd: teacher.passwd
        };
    } else {
        var student = testUtil.getTestStudent(userNameSeed);
        httpParam = {
            userName: student.userName,
            passwd: student.passwd
        };
    }

    return new promise(function (resolve) {
        superTest(app)
            .post('/api/user/login')
            .send(httpParam)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) {
                    throw new Error(err);
                };

                resolve({
                    userId: res.body.user.userId,
                    token: res.body.token
                });
            });
    });
};

exports.signOut = function (app, token, callback) {
    superTest(app)
        .post('/api/user/logout')
        .send({
            logout: true
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function (err, res) {
            callback();
        });
};



exports.createTest = function (app, userInfo, callback) {
    var newTestInfo = testUtil.getSampleTest();
    superTest(app)
        .post('/api/test/createtest')
        .send(newTestInfo)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            var testInfo = res.body;
            callback(testInfo);
        });
};

exports.createQuestion = function (app, testId, userInfo, qsno, callback) {
    var sampleTestQuestion = testUtil.getSampleQuestion(qsno);
    sampleTestQuestion.testId = testId;
    superTest(app)
        .post('/api/test/savequestion')
        .send(sampleTestQuestion)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            var newDoc = res.body;
            callback(newDoc);
        });

};

exports.createQuestionPlain = function (app, testId, userInfo, qsno, callback) {
    var sampleTestQuestion = testUtil.getSampleQuestionPlain(qsno);
    sampleTestQuestion.testId = testId;
    superTest(app)
        .post('/api/test/savequestion')
        .send(sampleTestQuestion)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            var newDoc = res.body;
            callback(newDoc);
        });

};

exports.getTestResults = function (app, httpParam, userInfo, studentInfo, callback) {

    superTest(app)
        .post('/api/test/gettestresult')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + studentInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};

exports.createClass = function (app, userInfo, callback) {
    var sampleClass = testUtil.getSampleClass(userInfo.userId);

    superTest(app)
        .post('/api/class/createclass')
        .send(sampleClass)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            var classId = res.body;
            callback(classId);
        });

};

exports.assignTest = function (app, userInfo, classId, testId, callback) {

    var startDateTime = new Date();
    var endDateTime = new Date(startDateTime.toLocaleDateString());
    endDateTime.setHours(endDateTime.getHours() + 1);

    var httpParam = {
        "classId": classId,
        "testId": testId,
        "testName": "Test 790",
        "testType": "Exam",
        "testStartDateTime": startDateTime,
        "testEndDateTime": endDateTime
    };

    superTest(app)
        .post('/api/class/assigntest')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback();
        });

};

exports.createAnswer = function (app, userInfo, classId, testId, callback) {
    var httpParam = {
        classId: classId,
        testId: testId
    }

    superTest(app)
        .post('/api/test/createtestanswer')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            var ansId = res.body;
            callback(ansId);
        });

};

exports.saveSingleAnswer = function (app, userInfo, testId, classId, ansId, callback) {
    var sampleAnswer = testUtil.getSampleAnswer(testId, classId, ansId);

    superTest(app)
        .post('/api/test/savetestsingleanswer')
        .send(sampleAnswer)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            var individualAnswerId = res.body;
            callback(individualAnswerId);
        });

}

exports.studentClassRegister = function (app, userInfo, classId, callback) {
    var httpParam = {
        classId: classId,
        studentName: 'Jim'
    };

    superTest(app)
        .post('/api/class/registerclass')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

}
exports.activateStudent = function (app, userInfo, classId, callback) {
    var httpParam = {
        classId: classId,
        studentId: userInfo.userId
    };

    superTest(app)
        .post('/api/class/activatestudent')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};
exports.makePayment = function (app, userInfo, classId, callback) {

    var httpParam = {
        classPayment: [{
            classId: classId,
            amount: 1000
        }],
        paymentVendor: 'paypal'
    };

    superTest(app)
        .post('/api/payment/start')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};
exports.openEvaluationPage = function (app, userInfo, testId, classId, studentId, callback) {
    var httpParam = {
        testId: testId,
        classId: classId,
        studentId: studentId
    };

    superTest(app)
        .post('/api/test/evaluate')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};

exports.saveSingleEvaluation = function (app, userInfo, testId, classId, studentId, studentAnsId, callback) {
    var httpParam = testUtil.getSampleEvaluatedResult(testId, classId, studentId, studentAnsId);

    superTest(app)
        .post('/api/test/savetestsingleevaluation')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};

exports.activateStudent = function (app, userInfo, classId, callback) {
    var httpParam = {
        classId: classId,
        studentId: userInfo.userId
    };

    superTest(app)
        .post('/api/class/activatestudent')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};

exports.makePayment = function (app, userInfo, classId, callback) {

    var httpParam = {
        classPayment: [{
            classId: classId,
            amount: 1000
        }],
        paymentVendor: 'paypal'
    };

    superTest(app)
        .post('/api/payment/start')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            callback(res.body);
        });

};
