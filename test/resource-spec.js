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

// var userNameSeed = 'resource-spec';

// describe("resource specification", function () {
//     describe(" resource api service specification", function () {

//         var app = restify.createServer();
//         app.use(bodyParser.json());

//         var teacherApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'teacherApi'));
//         var authApi = require(path.join(__dirname, '..', 'app', 'routes', 'userAccount', 'authApi'));
//         var resourceApi = require(path.join(__dirname, '..', 'app', 'routes', 'resource', 'resourceApi'));

//         before(function (done) {
//             connectDB('mongodb://localhost:30001,localhost:30002,localhost:30003/cloudschool?replicaSet=rep1')
//                 .then(function () {
//                     teacherApi(app);
//                     authApi(app);
//                     resourceApi(app);
//                     done();
//                 });
//         });


//         it("validate upsertpresentation api - /api/resource/upsertpresentation", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'upsertpresentation', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'upsertpresentation', function (userInfo) {
//                     mockResourceApis.upsertPresentation(app, userInfo, function (presentation) {
//                         console.log('      -- Upsert presentation should return valid Presentation Id.');
//                         expect(presentation._id).to.not.be.null;
//                         expect(presentation._id).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid teacher Id.');
//                         expect(presentation.teacherId).to.not.be.null;
//                         expect(presentation.teacherId).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid Presentation name.');
//                         expect(presentation.name).to.not.be.null;
//                         expect(presentation.name).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return non-empty slides.');
//                         expect(presentation.slides).to.not.be.empty;

//                         removeMockData.removePresentation(presentationModel, presentation._id, function () {
//                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                 mockApis.signOut(app, userInfo.token, done);
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate getpresentation api - /api/resource/:preId/getpresentation", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'getpresentation', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'getpresentation', function (userInfo) {
//                     mockResourceApis.upsertPresentation(app, userInfo, function (presentation) {
//                         console.log('      -- Upsert presentation should return valid Presentation Id.');
//                         expect(presentation._id).to.not.be.null;
//                         expect(presentation._id).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid teacher Id.');
//                         expect(presentation.teacherId).to.not.be.null;
//                         expect(presentation.teacherId).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid Presentation name.');
//                         expect(presentation.name).to.not.be.null;
//                         expect(presentation.name).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return non-empty slides.');
//                         expect(presentation.slides).to.not.be.empty;

//                         mockResourceApis.getPresentation(app, userInfo, presentation._id, function (present) {
//                             console.log('      -- Get presentation should return valid Presentation Id.');
//                             expect(present._id).to.not.be.null;
//                             expect(present._id).to.not.be.undefined;

//                             console.log('      -- Get presentation should return valid Presentation name.');
//                             expect(present.name).to.not.be.null;
//                             expect(present.name).to.not.be.undefined;

//                             console.log('      -- Get presentation should return non-empty slides.');
//                             expect(present.slides).to.not.be.empty;

//                             removeMockData.removePresentation(presentationModel, presentation._id, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate getpresentationlist api - /api/resource/getpresentationlist", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'getpresentationlist', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'getpresentationlist', function (userInfo) {
//                     mockResourceApis.upsertPresentation(app, userInfo, function (presentation) {
//                         console.log('      -- Upsert presentation should return valid Presentation Id.');
//                         expect(presentation._id).to.not.be.null;
//                         expect(presentation._id).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid teacher Id.');
//                         expect(presentation.teacherId).to.not.be.null;
//                         expect(presentation.teacherId).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid Presentation name.');
//                         expect(presentation.name).to.not.be.null;
//                         expect(presentation.name).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return non-empty slides.');
//                         expect(presentation.slides).to.not.be.empty;

//                         mockResourceApis.getPresentationList(app, userInfo, function (list) {
//                             console.log('      -- Get presentation list should return non-empty presentation list.');
//                             expect(list).to.not.be.empty;

//                             console.log('      -- Get presentation list should contain valid Presentation Id.');
//                             expect(list[0]._id).to.not.be.null;
//                             expect(list[0]._id).to.not.be.undefined;

//                             console.log('      -- Get presentation list should contatin valid Presentation name.');
//                             expect(list[0].name).to.not.be.null;
//                             expect(list[0].name).to.not.be.undefined;

//                             removeMockData.removePresentation(presentationModel, presentation._id, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });


//         it("validate removepresentation api - /api/resource/removepresentation", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'removepresentation', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'removepresentation', function (userInfo) {
//                     mockResourceApis.upsertPresentation(app, userInfo, function (presentation) {
//                         console.log('      -- Upsert presentation should return valid Presentation Id.');
//                         expect(presentation._id).to.not.be.null;
//                         expect(presentation._id).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid teacher Id.');
//                         expect(presentation.teacherId).to.not.be.null;
//                         expect(presentation.teacherId).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return valid Presentation name.');
//                         expect(presentation.name).to.not.be.null;
//                         expect(presentation.name).to.not.be.undefined;

//                         console.log('      -- Upsert presentation should return non-empty slides.');
//                         expect(presentation.slides).to.not.be.empty;

//                         mockResourceApis.removePresentation(app, userInfo, presentation._id, function (removeRes) {
//                             console.log('      -- Remove presentation should return true.');
//                             expect(removeRes).to.be.true;

//                             removeMockData.removePresentation(presentationModel, presentation._id, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate uploadResource api - /api/resource/uploadresource", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'uploadResource', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'uploadResource', function (userInfo) {
//                     mockResourceApis.uploadResource(app, userInfo, function (resource) {
//                         console.log('      -- Uploaded resource should have valid Id.');
//                         expect(resource._id).to.not.be.null;
//                         expect(resource._id).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File name.');
//                         expect(resource.fileName).to.not.be.null;
//                         expect(resource.fileName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File display name.');
//                         expect(resource.fileDisplayName).to.not.be.null;
//                         expect(resource.fileDisplayName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid title.');
//                         expect(resource.title).to.not.be.null;
//                         expect(resource.title).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid type.');
//                         expect(resource.resourceType).to.not.be.null;
//                         expect(resource.resourceType).to.not.be.undefined;

//                         removeMockData.deleteResource(resourceModel, resource._id, function () {
//                             removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                 mockApis.signOut(app, userInfo.token, done);
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate removeresource api - /api/resource/removeresource", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'removeresource', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'removeresource', function (userInfo) {
//                     mockResourceApis.uploadResource(app, userInfo, function (resource) {
//                         console.log('      -- Uploaded resource should have valid Id.');
//                         expect(resource._id).to.not.be.null;
//                         expect(resource._id).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File name.');
//                         expect(resource.fileName).to.not.be.null;
//                         expect(resource.fileName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File display name.');
//                         expect(resource.fileDisplayName).to.not.be.null;
//                         expect(resource.fileDisplayName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid title.');
//                         expect(resource.title).to.not.be.null;
//                         expect(resource.title).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid type.');
//                         expect(resource.resourceType).to.not.be.null;
//                         expect(resource.resourceType).to.not.be.undefined;

//                         mockResourceApis.removeResource(app, userInfo, resource._id, function (removeRes) {
//                             console.log('      -- Remove resource should return true.');
//                             expect(removeRes).to.be.true;

//                             removeMockData.deleteResource(resourceModel, resource._id, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate getresourcelist api - /api/resource/getresourcelist", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'getresourcelist', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'getresourcelist', function (userInfo) {
//                     mockResourceApis.uploadResource(app, userInfo, function (resource) {
//                         console.log('      -- Uploaded resource should have valid Id.');
//                         expect(resource._id).to.not.be.null;
//                         expect(resource._id).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File name.');
//                         expect(resource.fileName).to.not.be.null;
//                         expect(resource.fileName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File display name.');
//                         expect(resource.fileDisplayName).to.not.be.null;
//                         expect(resource.fileDisplayName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid title.');
//                         expect(resource.title).to.not.be.null;
//                         expect(resource.title).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid type.');
//                         expect(resource.resourceType).to.not.be.null;
//                         expect(resource.resourceType).to.not.be.undefined;

//                         mockResourceApis.getResourceList(app, userInfo, function (resourceList) {
//                             console.log('      -- Get resource list should not be empty.');
//                             expect(resourceList).to.not.be.empty;

//                             console.log('      -- Resource should have valid Id.');
//                             expect(resourceList[0]._id).to.not.be.null;
//                             expect(resourceList[0]._id).to.not.be.undefined;

//                             console.log('      -- Resource should have valid File name.');
//                             expect(resourceList[0].fileName).to.not.be.null;
//                             expect(resourceList[0].fileName).to.not.be.undefined;

//                             console.log('      -- Resource should have valid File display name.');
//                             expect(resourceList[0].fileDisplayName).to.not.be.null;
//                             expect(resourceList[0].fileDisplayName).to.not.be.undefined;

//                             console.log('      -- Resource should have valid title.');
//                             expect(resourceList[0].title).to.not.be.null;
//                             expect(resourceList[0].title).to.not.be.undefined;

//                             console.log('      -- Resource should have valid type.');
//                             expect(resourceList[0].resourceType).to.not.be.null;
//                             expect(resourceList[0].resourceType).to.not.be.undefined;

//                             removeMockData.deleteResource(resourceModel, resource._id, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//         it("validate updateresourcedetails api - /api/resource/updateresourcedetails", function (done) {
//             mockApis.createTeacher(app, userNameSeed + 'updateresourcedetails', function () {
//                 mockApis.signIn(app, true, userNameSeed + 'updateresourcedetails', function (userInfo) {
//                     mockResourceApis.uploadResource(app, userInfo, function (resource) {
//                         console.log('      -- Uploaded resource should have valid Id.');
//                         expect(resource._id).to.not.be.null;
//                         expect(resource._id).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File name.');
//                         expect(resource.fileName).to.not.be.null;
//                         expect(resource.fileName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid File display name.');
//                         expect(resource.fileDisplayName).to.not.be.null;
//                         expect(resource.fileDisplayName).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid title.');
//                         expect(resource.title).to.not.be.null;
//                         expect(resource.title).to.not.be.undefined;

//                         console.log('      -- Uploaded resource should have valid type.');
//                         expect(resource.resourceType).to.not.be.null;
//                         expect(resource.resourceType).to.not.be.undefined;

//                         mockResourceApis.updateResourceDetails(app, userInfo, resource._id, function (updateRes) {
//                             console.log('      -- Update resource should return true.');
//                             expect(updateRes).to.be.true;

//                             removeMockData.deleteResource(resourceModel, resource._id, function () {
//                                 removeMockData.deleteTeacher(teacherModel, userModel, userInfo.userId, function () {
//                                     mockApis.signOut(app, userInfo.token, done);
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
