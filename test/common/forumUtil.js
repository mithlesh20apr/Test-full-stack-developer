var path = require('path');
var jwt = require(path.join(__dirname, '..', '..', 'app', 'service', 'auth', 'jwt'));
var envConfig = require(path.join(__dirname, '..', '..', 'app', 'global', 'config', 'appConfig'));
exports.getThread = function (cid,uid) {
    return {
       classId:cid,
       tag:"Default Category",
       title:cid+"test"+getRandom(100,10000),   
          
    /*   comments:[{totalReplies:1,
                 userId:uid,
                
                content:'sub comments demo'    
        }],*/
       content:'dummy string added'
    };
}

exports.getComment = function (uid) {
    return {
                totalReplies:1,
                userId:uid,                
                content:'comments demo'    
        };

    
}

var getRandom = function(min,max){
	if(max == undefined)
		return Math.floor(Math.random() * (min + 1));
	else
		return Math.floor(Math.random() * (max - min + 1) + min);
}
