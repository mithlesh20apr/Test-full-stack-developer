var chkObj = require('../service/util/checkValidObject');

//TODO: Delete this method and its usage. Use 'checkRequired' method
exports.checkRequired_deprecated = function(error, obj, msg){
     if (chkObj.isUndefinedOrNullOrEmptyOrNoLen(obj))
         error.push(msg + ' is required.');
};

exports.checkRequired = function(obj, fieldName, msg){
     if (chkObj.isUndefinedOrNullOrEmptyOrNoLen(obj[fieldName]))
         obj.errorMsg[fieldName] = msg + ' is required.';
};

exports.checkAlpha = function(obj, fieldName, msg){
    if(!chkObj.isValidAlpha(obj[fieldName]))
        obj.errorMsg[fieldName] = msg + ' cannot contain Special Charecter.';
};

exports.checkBool = function(error, obj, msg){    
    if (!chkObj.isBooleanType(obj)){        
         error.push(msg + ' carries invalid data type.');
    }        
};

exports.checkIntegertype = function(error, obj, msg){    
    if (!chkObj.isIntegerType(parseInt(obj))){        
         error.push(msg + ' contains always Integer data.');
    }        
};