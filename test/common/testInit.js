var mongoose = require('mongoose');
var path = require('path');
var Promise = require('bluebird');
var restify = require("restify");
var bodyParser = require('body-parser');

//require('./db-schemas');


/* To register models with mongoose */
// import Database Schema
require(path.join(__dirname, '../..', 'app', 'models', 'user', 'profile', 'teacherModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'user', 'profile', 'studentModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'user', 'userModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'class', 'classModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'resource', 'testModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'class', 'studentTestModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'resource', 'presentationModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'resource', 'resourceModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'resource', 'assetModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'class', 'classForumModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'teacherStatSchema'));
require(path.join(__dirname, '../..', 'app', 'models', 'class', 'classForumModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'user', 'consentModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'notification', 'notifyMasterModel'));

// added
require(path.join(__dirname, '../..', 'app', 'models', 'user', 'profile', 'instituteModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'messageModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'clientLogModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'user', 'adminUserModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'admin', 'calendarModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'admin', 'classRoomModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'newsFeedModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'constantModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'paymentConstantModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'searchStatSchema'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'refundModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'internal', 'tranjobModel'));
require(path.join(__dirname, '../..', 'app', 'models', 'misc', 'teacherSalaryModel'));


exports.userModel = mongoose.model('User');
exports.teacherModel = mongoose.model('Teacher');
exports.studentModel = mongoose.model('Student');

exports.mockApis = require(path.join(__dirname, 'mockApis'));
exports.mockClassApis = require(path.join(__dirname, 'mockClassApis'));
exports.mockResourceApis = require(path.join(__dirname, 'mockResourceApis'));
exports.removeMockData = require(path.join(__dirname, 'removeMockData'));
exports.TestUtil = require(path.join(__dirname, 'testUtil'));
exports.classUtil = require(path.join(__dirname, 'classUtil'));
exports.removeMockData = require(path.join(__dirname, 'removeMockData'));
exports.forumApis = require(path.join(__dirname, 'forumApis'));
var connectDB = Promise.promisify(mongoose.connect, mongoose);
exports.connectDB = connectDB;
exports.disconnectDB = Promise.promisify(mongoose.disconnect, mongoose);

exports.initApp = function(callback) {

    var app = restify.createServer();
    app.use(bodyParser.json());
    app.use(restify.queryParser());

    var teacherApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'userAccount', 'teacherApi'));
    var testApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'resource', 'testApi'));
    var classApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'class', 'classApi'));
    var studentApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'userAccount', 'studentApi'));
    var userApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'userAccount', 'userApi'));
    var authApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'userAccount', 'authApi'));
    var resourceApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'resource', 'resourceApi'));
    var classForumApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'class', 'classForumApi'));
    var paymentApi = require(path.join(__dirname, '..', '..', 'app', 'routes', 'misc', 'paymentApi'));

    connectDB('mongodb://localhost:27017/cloudschool?options')
        .then(function() {
            teacherApi(app);
            testApi(app);
            classApi(app);
            studentApi(app);
            authApi(app);
            userApi(app);
            resourceApi(app);
            paymentApi(app);
            classForumApi(app);
            callback(app);
        });
}