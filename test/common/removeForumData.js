var ObjectId = require('mongoose').Types.ObjectId;

exports.removeThread = function(classForumModel, threadId, next){
    classForumModel.remove({_id: new ObjectId(threadId)}).exec(function(err, result) {
        if(err){
            console.log('error', err);
           
        }
        next();
        
    });
};