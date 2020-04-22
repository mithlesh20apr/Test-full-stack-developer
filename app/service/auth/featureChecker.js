/* global __dirname */
var userModel = require('mongoose').model('User');
var ObjectId = require('mongoose').Types.ObjectId;//Import ObjectId type of mongo
var _ = require('lodash');
var path = require('path');
var exceptionHandler = require(path.join(__dirname, '..', 'util', 'exceptionHandler'));
var rf = require(path.join(__dirname, '..', '..', 'data', 'routesFeatures'));

//TODO: use the other function
exports.hasAccessToFeature = function (req, res, userId, feature, next) {
    checkFeature(req, res, feature, next);
};

exports.hasAccessToFeatureNew = function (req, res, next) {
    var feature = rf.getRouteFeature(req);
    checkFeature(req, res, feature, next);
};

var checkFeature = function (req, res, feature, next) {
    if (!feature) {
        return;
    }

    userModel
        .findOne({ _id: new ObjectId(req.userId) })
        .select(' features userRole ')
        .exec(function (err, userInfo) {
            if (err || !userInfo) {
                exceptionHandler
                    .internal(req, res, typeof err != 'undefined' ? [err] : ['No access features found.']);
            }
            else {
                var savedFeature = _.find(userInfo.features, function (f) {
                    return f.feature == feature;
                });
                if (savedFeature && savedFeature.hasAccess) {
                    next();
                }
                else {
                    exceptionHandler
                        .invalidParam(res, [feature + ' is not available for this role.']);
                }
            }
        });
};

exports.checkUserRole = (userId,Role,callback)=>{
    userModel.findOne({_id: new ObjectId(userId)},{userRole:1,_id:0},(err,data)=>{
        if(err){
            //console.log('err',err)
            callback(err,null);
        }else{
            console.log('data',data.userRole)
            let permission = false;
            for(let i=0 ; i < data.userRole.split(',').length; i++ ){
                //console.log('data1',data.userRole.split(',')[i])
                if(data.userRole.split(',')[i] == Role){
                    permission = true;
                }
            }
            if(permission){
                callback(result,null);
            }else{
                callback(null,permission); 
            }
   
        }
    })

}