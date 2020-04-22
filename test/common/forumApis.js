var path = require('path');
var superTest = require("supertest");
var forumUtil = require(path.join(__dirname, 'forumUtil'));

exports.createThread = function (app,cid,userInfo,callback) {
   var forumThread = forumUtil.getThread(cid,userInfo.userId);
     superTest(app).post('/api/privateforum/createthread').send(forumThread).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
};


exports.deleteThread = function (app,userInfo,classId,forumId,callback) {
     var httpParam = {
        classId: classId,
        forumId: forumId
    }
    
     superTest(app).post('/api/privateforum/removethread').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};


exports.getThread = function (app,userInfo,classId,forumId,callback) {
     var httpParam = {
        classId: classId,
        forumId: forumId
    }
     superTest(app).post('/api/privateforum/getthread').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};

exports.editTopic = function (app,userInfo,classId,forumId,callback) {
      var httpParam = {
          forumId: forumId,
          classId:classId,
          title:forumId+classId+'Title',
          content:'Test content'
      }
     superTest(app).post('/api/privateforum/edittopic').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};


exports.addComment = function (app,userInfo,classId,forumId,callback) {
    
      var httpParam = {
          classId:classId,
          forumId:forumId,
        //  totalReplies:1,
          //userId: userInfo.userId,
          
      //    reportAbuse:'false',
          comment:'Demo Comment',
          loadIndexStart:0,
          loadIndexOffset:2,
          showSubComt:true         
      }
      
    
     superTest(app).post('/api/privateforum/addcomment').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {            
        callback(res.body);
    });
    
};

exports.addSubComment = function (app,userInfo,classId,forumId,cmntId,callback) {
      var httpParam = {
        //  userId: userInfo.userId,
          //classId:classId,
          classId:classId,
          forumId:forumId,          
          subComment:'Demo Sub Comment',
          commentId:cmntId
      }
     superTest(app).post('/api/privateforum/addsubcommentcontent').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};

exports.updateCommentVote = function (app,userInfo,classId,forumId,cmntId,callback) {
      var httpParam = {
        //   userId: userInfo.userId,
           classId:classId,
           commentId:cmntId,
        //   classId:classId,
         forumId:forumId,
         tier:1,
         isUpVote:false
        
        //   upVotesBy:userInfo.userId
          
      }
     superTest(app).post('/api/privateforum/updatecommentvote').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
       
        callback(res.body);
    });
    
};

exports.subscribeForum = function (app,userInfo,classId,forumId,callback) {
      var httpParam = {
        //   userId: userInfo.userId,
        classId:classId,
        //   classId:classId,
         forumId:forumId,
        
        //   subComment:'Demo Sub Comment'
          
      }
     superTest(app).post('/api/privateforum/subscribeforumnotify').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};
exports.updateReportedAbuse = function (app,userInfo,classId,forumId,commentId,callback) {
      var httpParam = {
        //   userId: userInfo.userId,
        classId:classId,
        commentId:commentId,
        tier:1,
        reportedAbuse:false,
        //  classId:classId,
        forumId:forumId,
        
        //   subComment:'Demo Sub Comment'
          
      }
     superTest(app).post('/api/privateforum/updatereportedabuse').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};


exports.editComment = function (app,userInfo,classId,forumId,commentId,callback) {
      var httpParam = {
        //   userId: userInfo.userId,
        //classId:classId,
         //classId:classId,
         //forumId:forumId,
        
        //   subComment:'Demo Sub Comment'
        
         classId:classId,
          forumId:forumId,
         // totalReplies:1,
          commentId:commentId,
        //  userId: userInfo.userId,
         
       //   reportAbuse:'false',
          comment:'Demo Edit Comment',
         // loadIndexStart:0,
          //loadIndexOffset:2
          
      }
     superTest(app).post('/api/privateforum/editcomment').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};
exports.editSubComment = function (app,userInfo,classId,forumId,cmntId,scmntId,callback) {
      var httpParam = {
        //  userId: userInfo.userId,
          //classId:classId,
          classId:classId,
          forumId:forumId,
         
          subComment:'Demo Sub Comment',
          commentId:cmntId,
          subCommentId:scmntId
      }
     superTest(app).post('/api/privateforum/editsubcomment').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};

exports.loadSubComments = function (app,userInfo,classId,forumId,cmntId,callback) {
      var httpParam = {
        //  userId: userInfo.userId,
          //classId:classId,
          classId:classId,
          forumId:forumId,
         
         
          commentId:cmntId,
         
      }
     superTest(app).post('/api/privateforum/loadsubcomments').send(httpParam).set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + userInfo.token).end(function (err, res) {    
        
        callback(res.body);
    });
    
};


