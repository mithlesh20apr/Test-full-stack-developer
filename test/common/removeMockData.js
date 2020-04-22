var ObjectId = require('mongoose').Types.ObjectId;
var path = require('path');
var testInit = require(path.join(__dirname, 'testInit'));
var promise = require('bluebird');

exports.removeUser = function (userName) {

    return new promise(function (resolve) {
        testInit.userModel
            .findOne({ 'userName': userName })
            .exec(function (err, doc) {
                if (err) {
                    throw new Error(err);
                }

                removeData(doc._id, doc.userRole);
            });

        function removeData(userId, userRole) {
            if (userRole == 'teacher') {
                testInit.teacherModel.remove({ _id: userId }).exec(function (err, result) {
                    if (err) {
                        throw new Error(err);
                    }

                    removeFromUserModel(userId);
                });
            }
            else {
                testInit.studentModel.remove({ _id: userId }).exec(function (err, result) {
                    if (err) {
                        throw new Error(err);
                    }

                    removeFromUserModel(userId);
                });
            }
        }

        function removeFromUserModel(userId) {
            testInit.userModel.remove({ _id: userId }).exec(function (err1, result1) {
                if (err1) {
                    throw new Error(err1);
                }

                resolve();
            });
        }
    });
}

exports.deleteTeacher = function (teacherModel, userModel, userId, next) {

    teacherModel.remove({ _id: userId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
            return next();
        }

        userModel.remove({ _id: userId }).exec(function (err1, result1) {
            if (err1) {
                console.log('error', err1);
            }

            next();
        });
    });
};

exports.deleteStudent = function (studentModel, userModel, userId, next) {
    studentModel.remove({ _id: userId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
            next();
        }

        userModel.remove({ _id: userId }).exec(function (err1, result1) {
            if (err1) {
                console.log('error', err1);
            }

            next();
        });
    });
};


exports.deleteTest = function (testModel, testId, next) {
    testModel.remove({ _id: testId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};

exports.deleteStudentTest = function (studentTestModel, testId, ansId, next) {

    studentTestModel.remove({
        _id: new ObjectId(ansId),
        testId: new ObjectId(testId)
    }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};

exports.deleteClass = function (classModel, classId, next) {
    classModel.remove({ _id: classId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};

exports.deleteMessage = function (messageModel, messageId, next) {
    messageModel.remove({ _id: new ObjectId(messageId) }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};

exports.deleteUserNotification = function (userNotifyModel, userId, next) {
    userNotifyModel.remove({ userId: userId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};

exports.deleteResource = function (resourceModel, resId, next) {
    resourceModel.remove({ _id: resId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};

exports.removePresentation = function (presentationModel, preId, next) {
    presentationModel.remove({ _id: preId }).exec(function (err, result) {
        if (err) {
            console.log('error', err);
        }

        next();
    });
};