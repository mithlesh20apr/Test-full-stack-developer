/* global __dirname */
var _ = require('lodash');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment')

//var User = mongoose.model('User');
var CustomerModel = mongoose.model('customerModel');
// var Project = mongoose.model('Projects');
var fs = require('fs');
var path = require('path');
var Restify = require('restify');
var Joi = require('joi');
var async = require('async');
var check = require(path.join(__dirname, '..', '..', 'service', 'util', 'checkValidObject'));
var encrypt = require(path.join(__dirname, '..', '..', 'service', 'util', 'encryption'));
var userRoles = require('../../config/userRoles.json')
var jwt = require(path.join(__dirname, '..', '..', 'service', 'auth', 'jwt'));

exports.authenticate = function(req, res, next) {
    //var userName = req.body.userName;
    var userName = req.body.email;
    var passwd = req.body.newPassword;
    CustomerModel.findOne({ 'email': userName }).exec(function(err, user) {
        if (err) { //db error
            return next(new restify.errors.InternalServerError(err));
        }
        if (!user || null) { //User not found
            res.status(200);
            res.send({ success: false, active: '' });
            return next();
        }
        if (!user.active) { //User found but not activated
            res.status(200);
            res.send({ success: true, active: '' });
            return next();
        }
        var hasValidCred = false;
        //Check credentials 
        if (req.body.provider) {
            hasValidCred = checkSocialCredit(req.body, user);
        } else
            hasValidCred = checkPassword(passwd, user);
        if (user && hasValidCred) {
           
        jwt.createAndSendToken(user, function(err, userInfo, token,userRole) { 
            if (err) {
                return next(new restify.errors.InternalServerError(err));
            }

            else{
            req.userId = userInfo.userId;
            res.status(200);
            res.send({
                success: true,
                active: true,
                user: userInfo,
                token: token,
            });

            next();
            
            }
        });
    } else {
        res.status(200);
        res.send({ success: false, active: 'false' });
        next(); 
    }
    });
};

//Helper functions
function InitializeUser(data) {
    var randomSalt = encrypt.createSalt();
    var userData = {
        email: data.email,
        fullName:`${data.firstname} ${data.lastname}`,
        salt: randomSalt,
        active:data.active,
        hashedPwd: encrypt.hashPwd(randomSalt, data.newPassword),
        //dateOfRegistration: new Date()
    };
        console.log('InitializeUser called', userData)

    return userData;
}

// create new subscriber
exports.createCustomer = function(req, res, next) {
    console.log('createCustomer called')
    //get client data
    var userData = req.body;
    console.log('userData', userData)

    //initialize basic user
    var user = InitializeUser(userData);

    CustomerModel.create(user, createCustomerCallback);
    //console.log('user', user)
    function createCustomerCallback(err, base) {
        console.log('createUserCallback called')
        if (err) {
            return next(new Restify.errors.InternalServerError(err, 'hello'));
            console.log('createCustomerCallback', err);
        }
        console.log('base', base);
        req.userId = base._id;
        res.status(200);
        res.send(true);
        next();
    }
};



exports.checkDuplicateUser = function(req, res, next) {
    // checking in database for users with the same email id as provided by user
    CustomerModel.findOne({ email: req.body.email }).select(' _id active ').exec(function(err, userInfo) {
        if (err) {
            return next(new Restify.errors.InternalServerError(err));
        } else {
            if (check.isUndefinedOrNull(userInfo)) {
                next();
            } else {
                return next(new Restify.errors.ForbiddenError({
                    message: {
                        text: 'Email Id already registered',
                        field: 'email',
                        metadata: req.body
                    }
                }));
            }
        }
    });
}

function checkPassword(incomingPassword, user) {
    return encrypt.hashPwd(user.salt, incomingPassword) === user.hashedPwd;
}
