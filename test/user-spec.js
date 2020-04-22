var expect = require("chai").expect;
var mongoose = require('mongoose');
var path = require('path');
var promise = require('bluebird');
var request = require("supertest");

var testInit = require(path.join(__dirname, 'common', 'testInit'));

var userNameSeed = 'user-spec';

describe("user specification", function () {
    describe("user api service specification", function () {

        var app = {};
        var teacherInfo = {};
        var studentInfo = {};

        before(function (done) {
            console.info('user-spec initializing....');

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

        //testing the get teacher details api:  get - /api/teacher/teacherprofile
        it("validate get a teacher api - '/api/teacher/teacherprofile'", function (done) {
            request(app)
                .get('/api/teacher/teacherprofile')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    profileDataCheckTeacher(res.body, 'Get a teacher');
                    done();
                });
        });


        //testing the get teacher details api:  get - /api/teacher/teacherprofile
        it("validate get a student api - '/api/student/studentprofile'", function (done) {
            request(app)
                .get('/api/student/studentprofile')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    profileDataCheckStudent(res.body, 'Get a student');
                    done();
                });
        });

        // update check
        it("validate update teacher profile api - '/api/teacher/profile'", function (done) {

            var prof = testInit.TestUtil.getTestTeacherProfile();

            request(app)
                .post('/api/teacher/profile')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    profile: prof
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.be.true;
                    profileDataUpdateTeacher(res.body, 'Update a teacher');
                    done();

                });


        });

        it("validate update teacher qualification api - '/api/teacher/qualification'", function (done) {

            var qual = testInit.TestUtil.getTestTeacherQualification();

            request(app)
                .post('/api/teacher/qualification')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    qualification: qual
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.be.true;
                    console.log('-- Update teacher qualification***');
                    done();
                });
        });


        it("validate update teacher experience api - '/api/teacher/experience'", function (done) {


            var exp = testInit.TestUtil.getTestTeacherExperience();

            request(app)
                .post('/api/teacher/experience')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    experience: exp
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('-- Update teacher Experience***');
                    expect(res.body).to.be.true;
                    done();
                });
        });



        it("validate update teacher training api - '/api/teacher/training'", function (done) {


            var train = testInit.TestUtil.getTestTeacherTraining();

            request(app)
                .post('/api/teacher/training')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    training: train
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('-- Update teacher training***');
                    expect(res.body).to.be.true;
                    done();
                });

        });

        it("validate update teacher  api - '/api/teacher/certification'", function (done) {

            var cert = testInit.TestUtil.getTestTeacherCertification();

            request(app)
                .post('/api/teacher/certification')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    certification: cert
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('-- Update teacher certification***');
                    expect(res.body).to.be.true;

                    done();
                });

        });

        it("validate update teacher awards api - '/api/teacher/awards'", function (done) {

            var award = testInit.TestUtil.getTestTeacherAwards();

            request(app)
                .post('/api/teacher/awards')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    awards: award
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('-- Update teacher awards***');
                    expect(res.body).to.be.true;

                    done();
                });

        });

        it("validate update teacher  api - '/api/teacher/research'", function (done) {

            var rese = testInit.TestUtil.getTestTeacherResearch();

            request(app)
                .post('/api/teacher/research')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    research: rese
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update teacher research***');
                    expect(res.body).to.be.true;
                    done();
                });

        });

        it("validate update teacher publication api - '/api/teacher/publication'", function (done) {

            var publ = testInit.TestUtil.getTestTeacherPublication();
            request(app)
                .post('/api/teacher/publication')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    publication: publ
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update teacher publication***');
                    expect(res.body).to.be.true;
                    done();

                });

        });

        it("validate update teacher contact api - '/api/teacher/contacts'", function (done) {
            var con = testInit.TestUtil.getTestTeacherContacts();
            request(app)
                .post('/api/teacher/contacts')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send({
                    contacts: con
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update teacher contacts***');
                    expect(res.body).to.be.true;
                    done();

                });


        });



        // GET STUDENT RECORD REMAINING!


        /*
        '/api/student/:id/updateprofilepicture'
        '/api/teacher/:id/updateprofilepicture'
        '/api/user/:id/password'
        '/api/user/:id/updateprofilepicture'
        */


        // //testing the user update profile picture using teacher:  get - /api/user/password
        it("validate update user profile pic api - '/api/user/updateprofilepicture'", function (done) {

            pictureUpdateParams = {
                isCoverImg: false,
                pictureName: 'fafafafa.ico.'
            };

            request(app)
                .post('/api/user/updateprofilepicture')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send(pictureUpdateParams)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update user profile picture***');
                    expect(res.body).to.be.true;
                    done();

                });
        });

        //testing the user update cover picture using teacher:  get - /api/user/password
        it("validate update user cover pic api - '/api/user/updatecoverpicture'", function (done) {

            coverUpdateParams = {
                isCoverImg: true,
                coverName: 'fafafafa.ico',
                coverVerticalOffset: 30
            };

            request(app)
                .post('/api/user/updateprofilepicture')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send(coverUpdateParams)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update user cover picture***');
                    expect(res.body).to.be.true;
                    done();

                });
        });

        // //testing the user update passwd api using student:  get - /api/user/password
        it("validate update passwd api - '/api/user/password'", function (done) {

            var passwdParams = testInit.TestUtil.getTestPasswdChange();

            request(app)
                .post('/api/user/password')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .send(passwdParams)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    console.log('***Update student password***');
                    expect(res.body).to.be.true;
                    done();

                });

        });

        it("validate update passwd api - '/api/user/password'", function (done) {
            var passwdParams = testInit.TestUtil.getTestPasswdChange();
            request(app)
                .post('/api/user/password')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + teacherInfo.token)
                .send(passwdParams)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update teacher password***');
                    expect(res.body).to.be.true;
                    done();

                });

        });


        /*   it("validate student registration api - /api/student", function (done) {
                         var newUser = testInit.TestUtil.getTestStudent(userNameSeed + 'student');

                    request(app).post('/api/student').send(newUser).end(function (err, res) {

                        if (err) {
                            console.log("User already exists!");
                            return done(err);
                        }
                        var userInfo = res.body;
                        console.log('      -- Create student should return a boolean, true.');
                        expect(userInfo).to.be.true;
                        done()

                    });
                });*/

        //testing the get student details api:  get - /api/student/studentprofile
        it("validate get a student api - '/api/student/studentprofile'", function (done) {
            request(app)
                .get('/api/student/studentprofile')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    profileDataCheckStudent(res.body, 'Get a student');
                    done();
                });
        });

        it("validate update student profile api - '/api/student/profile'", function (done) {

            var prof = testInit.TestUtil.getTestStudentProfile();

            request(app)
                .post('/api/student/profile')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .send({
                    profile: prof
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update student profile***');
                    expect(res.body).to.be.true;
                    done();
                });
        });

        it("validate update student qualification api - '/api/student/qualification'", function (done) {

            var qual = testInit.TestUtil.getTestStudentQualification();

            request(app)
                .post('/api/student/qualification')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .send({
                    qualification: qual
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    console.log('***Update student qualification***');
                    expect(res.body).to.be.true;
                    done();

                });
        });


        it("validate update student contact api - '/api/student/contacts'", function (done) {

            var con = testInit.TestUtil.getTestStudentContacts();
            request(app)
                .post('/api/student/contacts')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + studentInfo.token)
                .send({
                    contacts: con
                })
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    console.log('***Update student contacts***');
                    expect(res.body).to.be.true;
                    done();

                });
        });
        /*
                it("validate get classes api - /api/student/allclasses", function (done) {
                    //     mockApis.createTeacher(app, userNameSeed + 'allclasses', function () {
                    //         mockApis.activateAccount(app, 'teacher', userNameSeed + 'allclasses', function () {
                    //             mockApis.signIn(app, true, userNameSeed + 'allclasses', function (userInfo) {
                    //                 mockApis.createClass(app, userInfo, function (classId) {
                    //                     mockApis.createStudent(app, userNameSeed + 'allclasses', function () {
                    //                         mockApis.activateAccount(app, 'student', userNameSeed + 'allclasses', function () {
                    //                             mockApis.signIn(app, false, userNameSeed + 'allclasses', function (studentInfo) {
                    //                                 mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
                    //                                     mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
                    //                                         mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {

                    request(app)
                        .get('/api/student/allclasses')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer ' + studentInfo.token)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            console.log('res allclass --> ', res.body);
                            allClassesCheckStudent(res.body, 'Get all classes attended by a student', studentInfo.userId);
                            done();
                            //                                                     removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
                            //                                                         removeMockData.deleteClass(classModel, classId, function () {
                            //                                                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
                            //                                                                 mockApis.signOut(app, userInfo.token, done);
                            //                                                             });
                            //                                                         });
                            //                                                     });
                        });
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
                });

                it("validate student class tests api - '/api/student/studentclasstests'", function (done) {
                    //     mockApis.createTeacher(app, userNameSeed + 'createtestanswer1', function () {
                    //         mockApis.activateAccount(app, 'teacher', userNameSeed + 'createtestanswer1', function () {
                    //             mockApis.signIn(app, true, userNameSeed + 'createtestanswer1', function (userInfo) {
                    //                 mockApis.createTest(app, userInfo, function (testId) {
                    //                     mockApis.createQuestion(app, testId, userInfo, 0, function (newDoc) {
                    //                         mockApis.createClass(app, userInfo, function (classId) {
                    //                             mockApis.assignTest(app, userInfo, classId, testId, function () {
                    //                                 mockApis.createStudent(app, userNameSeed + 'createtestanswer1', function () {
                    //                                     mockApis.activateAccount(app, 'student', userNameSeed + 'createtestanswer1', function () {
                    //                                         mockApis.signIn(app, false, userNameSeed + 'createtestanswer1', function (studentInfo) {
                    //                                             mockApis.studentClassRegister(app, studentInfo, classId, function (result) {
                    //                                                 mockApis.activateStudent(app, studentInfo, classId, function (isActivated) {
                    //                                                     mockApis.makePayment(app, studentInfo, classId, function (isPaymentSuccess) {

                    request(app)
                        .post('/api/student/studentclasstests')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer ' + studentInfo.token)
                        .send({
                            classId: classId
                        })
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            studentClassTestsCheck(res.body[0], 'Get class tests associated with a class from student\'s perspective');
                            done();

                            //                                                                 removeMockData.deleteTest(testModel, testId, function () {
                            //                                                                     removeMockData.deleteClass(classModel, classId, function () {
                            //                                                                         removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
                            //                                                                             removeMockData.deleteStudent(studentModel, userModel, studentInfo.userId, function () {
                            //                                                                                 mockApis.signOut(app, userInfo.token, function () {
                            //                                                                                     mockApis.signOut(app, studentInfo.token, done);
                            //                                                                                 });
                            //                                                                             });
                            //                                                                         });
                            //                                                                     });
                            //                                                                 });
                        });
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
                    //     });
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
                    testInit.disconnectDB;
                    process.exit();
                });

        });

    });
});

var studentClassTestsCheck = function (testInfo, opMsg) {

    console.log('      -- ' + opMsg + ' test testId not be null or undefined');
    expect(testInfo.testId).to.not.be.null;
    expect(testInfo.testId).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' test _id not be null or undefined');
    expect(testInfo._id).to.not.be.null;
    expect(testInfo._id).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' test testEndDateTime not be null or undefined');
    expect(testInfo.testEndDateTime).to.not.be.null;
    expect(testInfo.testEndDateTime).to.not.be.undefined;
    console.log('      -- ' + opMsg + ' test testStartDateTime not be null or undefined');
    expect(testInfo.testStartDateTime).to.not.be.null;
    expect(testInfo.testStartDateTime).to.not.be.undefined;



    console.log('      -- ' + opMsg + ' test hasResult should match with user input');
    expect(testInfo.hasResult).equal(false);
    console.log('      -- ' + opMsg + ' test canTake should match with user input');
    expect(testInfo.canTake).equal(true);
    console.log('      -- ' + opMsg + ' test testName should match with user input');
    expect(testInfo.testName).equal('Test 790');
    console.log('      -- ' + opMsg + ' test testType should match with user input');
    expect(testInfo.testType).equal('Exam');

};
var profileDataCheckTeacher = function (userInfo, opMsg) {
    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo).to.not.be.null;
    expect(userInfo).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo.profile).to.not.be.null;
    expect(userInfo.profile).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile first name should match with user input');
    expect(userInfo.profile.firstName).equal('Kelly');

    console.log('      -- ' + opMsg + ' profile last name should match with user input');
    expect(userInfo.profile.lastName).equal('Cuoco');

    console.log('      -- ' + opMsg + ' profile user name should match with user input');
    expect(userInfo.userName).to.not.be.null;
    expect(userInfo.userName).to.not.be.undefined;

    
    console.log('      -- ' + opMsg + ' profile should return an activity status');
    expect(userInfo.activity).to.not.be.null;
    expect(userInfo.activity).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile should return a valid date of registration');
    expect(userInfo.activity.dateOfRegistration).to.not.be.null;
    expect(userInfo.activity.dateOfRegistration).to.not.be.undefined;
};

var profileDataUpdateTeacher = function (userInfo, opMsg) {
    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo).to.not.be.null;
    expect(userInfo).to.not.be.undefined;
    expect(userInfo).equal(true);
};


var profileDataCheckStudent = function (userInfo, opMsg) {
    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo).to.not.be.null;
    expect(userInfo).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile should not return null or undefined');
    expect(userInfo.profile).to.not.be.null;
    expect(userInfo.profile).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile first name should match with user input');
    expect(userInfo.profile.firstName).equal('Jim');

    console.log('      -- ' + opMsg + ' profile last name should match with user input');
    expect(userInfo.profile.lastName).equal('Parsons');

    console.log('      -- ' + opMsg + ' profile user name should match with user input');
    expect(userInfo.userName).to.not.be.null;
    expect(userInfo.userName).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile should return an activity status');
    expect(userInfo.activity).to.not.be.null;
    expect(userInfo.activity).to.not.be.undefined;

    console.log('      -- ' + opMsg + ' profile should return a valid date of registration');
    expect(userInfo.activity.dateOfRegistration).to.not.be.null;
    expect(userInfo.activity.dateOfRegistration).to.not.be.undefined;
};


var checkRecord = function (record) {

    console.log('checking various fields of record');
    expect(record.forumPostsCount).to.equal(1);
    expect(record.resourceViewCount.videos).to.equal(0);
    expect(record.resourceViewCount.notes).to.equal(1);
    expect(record.resourceViewCount.presentations).to.equal(1);
    expect(record.teacherRemarks[0].remarkDetails).to.equal('Yippeee!!');
    expect(record.teacherRemarks[0].dateOfRemark).to.be.Date;
    expect(record.teacherRemarks[0]._id).to.not.be.null;
    expect(record.allTestDetails).to.not.be.null;
    expect(record.studentProfile).to.not.be.null;
};
