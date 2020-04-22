/* global __dirname */
var path = require('path');
var classUtil = require(path.join(__dirname, 'classUtil'));
var superTest = require("supertest");

exports.removeClass = function(app, userInfo, classId, callback) {
    var httpParam = { classId: classId };
    
    superTest(app)
        .post('/api/class/removeclass')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getAllClassStudents = function(app, userInfo, callback) {
    superTest(app)
        .get('/api/class/getallclassstudents')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getClassStudents = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/classstudents')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeClassStudent = function(app, userInfo, studentInfo, classId, callback) {
    var httpParam = {
        classId: classId,
        studentId: studentInfo.userId
    };
    
    superTest(app)
        .post('/api/class/removeclassstudent')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.activateStudent = function(app, userInfo, studentInfo, classId, callback) {
    var httpParam = {
        classId: classId,
        studentId: studentInfo.userId
    };
    
    superTest(app)
        .post('/api/class/activatestudent')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.registerClass = function(app, userInfo, classId, callback) {
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
            if(err) callback(err);
            callback(res.body);
    });
};

exports.unregisterClass = function(app, userInfo, classId, callback) {
    var httpParam = { classId: classId };
    
    superTest(app)
        .post('/api/class/unregisterclass')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) console.log(err);
            callback(res.body);
    });
};

exports.updateFeedback = function(app, userInfo, classId, callback) {
    var httpParam = classUtil.getFeedback(classId);
    
    superTest(app)
        .post('/api/class/'+classId+'/updatefeedback')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.addTeacherRemark = function(app, userInfo, classId, studentId,callback) {
    var httpParam = classUtil.getTeacherRemark(classId,studentId);
    
    superTest(app)
        .post('/api/class/addteacherremark')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.removeTeacherRemark = function(app, userInfo, classId, studentId,remarkId,callback) {
    var httpParam = {classId:classId, studentId: studentId,remarkId: remarkId};
    
    superTest(app)
        .post('/api/class/removeteacherremarks')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};



exports.removeFeedback = function(app, userInfo, classId, callback) {
    var httpParam = {classId: classId};
    
    superTest(app)
        .post('/api/class/'+classId+'/removefeedback')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getFeedback = function(app, userInfo, classId, callback) {
    var httpParam = {classId: classId};
    
    superTest(app)
        .post('/api/class/'+classId+'/getfeedback')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getAllFeedback = function(app, userInfo, classId, callback) {
    var httpParam = {classId: classId};
    
    superTest(app)
        .get('/api/class/'+classId+'/getallfeedback')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};


exports.assignTest = function(app, userInfo, classId, testId, callback) {
    var httpParam = classUtil.getAssignedTest(classId, testId);
    
    superTest(app)
        .post('/api/class/assigntest')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) console.log(err);
            callback(res.body);
    });
};

exports.removeAssignedTest = function(app, userInfo, classId, testId, id, callback) {
    var httpParam = {
        classId: classId,
        testId: testId,
        id: id
    };
    
    superTest(app)
        .post('/api/class/removeassignedtest')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) console.log(err);
            callback(res.body);
    });
};

exports.getAllAssignedTests = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/allassignedtests')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getStudentTestParticipation = function(app, userInfo, classId, testId, callback){
    var httpParam = {
        classId: classId,
        testId: testId
    };
    
    superTest(app)
       .post('/api/class/getstudenttestparticipation')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) console.log(err);
            callback(res.body);
    }); 
};

exports.editStudentTestParticipation = function(app, userInfo, classId, testId, studentId, callback){
    var httpParam = {
        classId: classId,
        testId: testId,
        nonParticipants: [studentId]
    };
    
    superTest(app)
       .post('/api/class/editstudenttestparticipation')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) console.log(err);
            callback(res.body);
    }); 
};

exports.updateClassSummary = function(app, userInfo, classId, callback) {
    var httpParam = classUtil.getSummary(classId);
    
    superTest(app)
        .post('/api/class/updateclasssummary')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateClassPicture = function(app, userInfo, classId, callback) {
    var httpParam = classUtil.getPicture(classId);
    
    superTest(app)
        .post('/api/class/updateclasspicture')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateClassSyllabus = function(app, userInfo, classId, callback) {
    var httpParam = classUtil.getSyllabus(classId);
    
    superTest(app)
        .post('/api/class/updatesyllabus')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};


exports.createNotice = function(app, userInfo, classId, callback) {
    var httpParam = classUtil.getNotice(classId);
    
    superTest(app)
        .post('/api/class/createnotice')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeNotice = function(app, userInfo, classId, noticeId, callback) {
    var httpParam = {
        classId: classId,
        noticeId: noticeId
    };
    
    superTest(app)
        .post('/api/class/removenotice')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateNotice = function(app, userInfo, classId, noticeId, callback) {
    var httpParam = classUtil.getUpdatedNotice(classId, noticeId);
    
    superTest(app)
        .post('/api/class/updatenotice')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.createClassForumCat = function(app, userInfo, classId, callback) {
    var httpParam = {
        classId: classId,
        category: classId + ' Forum category'
    };
    
    superTest(app)
        .post('/api/class/createforumcat')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeClassForumCat = function(app, userInfo, classId, forumCat, callback) {
    var httpParam = {
        classId: classId,
        category: forumCat
    };
    
    superTest(app)
        .post('/api/class/removeforumcat')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.createClassFAQ = function(app, userInfo, classId, callback) {
    var httpParam = classUtil.getNewFAQ(classId);
    
    superTest(app)
        .post('/api/class/createclassfaq')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.removeClassFAQ = function(app, userInfo, classId, faqId, callback) {
    var httpParam = {
        classId: classId,
        faqId: faqId
    }
    
    superTest(app)
        .post('/api/class/removeclassfaq')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateClassFAQ = function(app, userInfo, classId, faq, callback) {
    var httpParam = classUtil.getUpdatedFAQ(classId, faq);
    
    superTest(app)
        .post('/api/class/updateclassfaq')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.assignClassResource = function(app, userInfo, classId, resId, callback) {
    var httpParam = {
        classId: classId,
        resId: resId,
        resType: 'notes', //see resourceUtil.js
        action: 'add'
    };
    
    superTest(app)
        .post('/api/class/assignclassresource')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.updateResourceViews = function(app, userInfo, classId, resId, callback) {
    var httpParam = {
        classId: classId,
        resId: resId
    };
    
    superTest(app)
        .post('/api/class/updateresourceviews')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};
exports.assignClassPresentation = function(app, userInfo, classId, preId, callback) {
    var httpParam = {
        classId: classId,
        preId: preId,
        action: 'add'
    };
    
    superTest(app)
        .post('/api/class/presentclassassign')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};
exports.updatePresentationViews = function(app, userInfo, classId, preId, callback) {
    var httpParam = {
        classId: classId,
        preId: preId
    };
    
    superTest(app)
        .post('/api/class/updatepresentationviews')
        .send(httpParam)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    });
};

exports.getFeedback = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getfeedback')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    }); 
}

exports.getClassSummary = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getclasssummary')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);
            callback(res.body);
    }); 
};

exports.getClassFAQ = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getclassfaq')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getClassNotices = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getclassnotices')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getClassResources = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getclassresources')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getClassPresentations = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getclasspresentations')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getClassForumCats = function(app, userInfo, classId, callback) {
    superTest(app)
        .get('/api/class/' + classId + '/getclassforumcats')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token)
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};

exports.getClassesPublic = function(app, callback) {
    superTest(app)
        .get('/api/class/allclassespublic')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if(err) callback(err);                
            callback(res.body);
    }); 
};