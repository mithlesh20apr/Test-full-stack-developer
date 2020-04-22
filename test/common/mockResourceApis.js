var path = require('path');
var superTest = require("supertest");
var resourceUtil = require(path.join(__dirname, 'resourceUtil'));

exports.upsertPresentation = function (app, userInfo, callback) {
    var httpParam = resourceUtil.getPresentation(userInfo);
    
    superTest(app)
        .post('/api/resource/upsertpresentation')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).
        end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getPresentation = function(app, userInfo, preId, callback) {
    
    superTest(app)
        .get('/api/resource/' + preId + '/getpresentation')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getPresentationList = function(app, userInfo, callback) {
    
    superTest(app)
        .get('/api/resource/getpresentationlist')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removePresentation = function(app, userInfo, preId, callback) {
    var httpParam = { preId: preId };
    
    superTest(app)
        .post('/api/resource/removepresentation')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);    
            callback(res.body);
    });
};

exports.uploadResource = function(app, userInfo, callback) {
    var httpParam = resourceUtil.uploadResource();
    
    superTest(app)
        .post('/api/resource/uploadresource')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeResource = function(app, userInfo, resId, callback) {
    var httpParam = { resId: resId };
    
    superTest(app)
        .post('/api/resource/removeresource')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getResourceList = function(app, userInfo, callback) {
      
    superTest(app)
        .get('/api/resource/getresourcelist')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};


exports.updateResourceDetails = function(app, userInfo, resId, callback) {
  
    var httpParam = {
        resId: resId,
        title: 'Demo Update Resource Details',
        description: 'Demo Description For Update',
        tags: ['Demo tag']
    };
     
    superTest(app)
        .post('/api/resource/updateresourcedetails')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};