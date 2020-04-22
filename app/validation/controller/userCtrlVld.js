/* global __dirname */
var path = require('path');
var Joi = require('joi');
var restify = require('restify');
var _ = require('lodash');
var appConst = require(path.join(__dirname, '..', '..', 'global', 'config', 'appConstants'));

exports.verifyCreateUser = function(req, res, next) {

    var schema;
    /*Added Signinup handling from phone withou capcha*/

    if (req.body.phoneKey) {
        schema = {
            firstName: Joi.string().label('First Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special character').max(100).required(),
            lastName: Joi.string().label('Last Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special characters ').max(100).required(),
            phoneNo: [Joi.string().label('Phone Number').regex(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/).required(),
                Joi.string().label('Phone Number').regex(/^(\+?91|0)?[789]\d{9}$/).required()
            ],
            userName: Joi.string().label('User name').email().max(100),
            userRole: Joi.any().label('User Role').valid(appConst.userRoles),
            passwd: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' should have atleast 8 characters ,1 lower , 1 Upper and 1 Number').required(),
            passwd2: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' mismatch').required(),
            phoneKey: Joi.string()
        };

    } else {
        schema = {
            firstName: Joi.string().label('First Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special character').max(100).required(),
            lastName: Joi.string().label('Last Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special characters ').max(100).required(),
            phoneNo: [Joi.string().label('Phone Number').regex(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/).required(),
                Joi.string().label('Phone Number').regex(/^(\+?91|0)?[789]\d{9}$/).required()
            ],
            userRole: Joi.any().label('User Role').valid(appConst.userRoles),
            userName: Joi.string().label('User name').email().max(100),
            passwd: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' should have atleast 8 characters ,1 lower , 1 Upper and 1 Number').required(),
            passwd2: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' mismatch').required(),
            captchaResponse: Joi.string().label('Captcha')
        };
    }


    Joi.validate(req.body, schema, function(err, value) {
        if (err) {
            //To stop the sending the password again along with the error message            
            if (err.details[0].path == 'passwd')
                err.details[0].message = 'Password is invalid';

            return next(new restify.InvalidArgumentError(err.details[0].message));
        } else if (req.body.passwd != req.body.passwd2) {
            return next(new restify.InvalidArgumentError('Password values do not match.'));
        }

        next();
    });
}

exports.verifySocialSignUp = function(req, res, next) {

    var schema = {
        firstName: Joi.string().label('First Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special character').max(100).required(),
        lastName: Joi.string().label('Last Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special characters ').max(100).required(),
        userRole: Joi.any().label('User Role').valid(appConst.userRoles),
        userName: Joi.string().label('User name').email().max(100),
        uid: Joi.string().label('User Id'),
        provider: Joi.string().label('User Id')
    };

    Joi.validate(req.body, schema, function(err, value) {
        if (err) {
            return next(new restify.InvalidArgumentError(err.details[0].message));
        } else if (req.body.passwd != req.body.passwd2) {
            return next(new restify.InvalidArgumentError('Password values do not match.'));
        }

        next();
    });
}

exports.verifyChangePassword = function(req, res, next) {
    var schema = {
        passwdold: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/).required(),
        passwdnew: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/).required(),
        passwdnew2: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/).required(),
    };

    Joi.validate(req.body, schema, function(err, value) {
        if (err) {
            return next(new restify.InvalidArgumentError('Password is invalid'));
        } else if (req.body.passwdnew != req.body.passwdnew2) {
            return next(new restify.InvalidArgumentError('Password values do not match.'));
        } else if (req.body.passwdnew == req.body.passwdold) {
            return next(new restify.InvalidArgumentError('Old and new Password provided are same'));
        }

        next();
    });
}

//TODO: Temporary vld code. Clean up
exports.clientVld = function(req, res, next) {
    var errorMsgs = {
        key: '{{!key}} ',
        any: {
            unknown: 'is not undefind',
            empty: 'is a required field',
            required: 'is a required field'
        },
        string: {
            regex: {
                base: 'with value "{{!value}}" is not allowed',
                name: '{{name}}'
            }
        },
        date: {
            max: 'is invalid',
            min: 'is invalid',
            base: 'must be a valid date'
        }
    };

    var schema = {
        signin: {
            userName: Joi.string().label('Email').email().max(100).required(),
            passwd: Joi.string().label('Password').min(8).max(30).required()
        },
        signup: {
            firstName: Joi.string().label('First Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special character').max(100).required(),
            lastName: Joi.string().label('Last Name').regex(/^[a-zA-Z ]+$/, 'Can\'t contain special characters ').max(100).required(),
            phoneNo: [Joi.string().label('Phone Number').regex(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/).required(),
                Joi.string().label('Phone Number').regex(/^(\+?91|0)?[789]\d{9}$/).required()
            ],
            userName: Joi.string().label('User name').email().max(100),
            passwd: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' should have atleast 8 characters ,1 lower , 1 Upper and 1 Number').required(),
            passwd2: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' mismatch').required(),
            captchaResponse: Joi.string().label('Captcha')
        },
        passwdchange: {
            passwdold: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' is incorrent').required(),
            passwdnew: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' should have atleast 8 characters 1 lower and 1 Upper and 1 Number').required(),
            passwdnew2: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' should have atleast 8 characters 1 lower and 1 Upper and 1 Number').required()
        },
        forgotpassword: {
            email: Joi.string().label('Email').email().max(100).required(),
            phoneNo: [Joi.string().label('Phone Number').regex(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/).required(),
                Joi.string().label('Phone Number').regex(/^(\+?91|0)?[789]\d{9}$/).required()
            ],
        },
        resetpasswd: {
            passwdnew: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' should have atleast 8 characters 1 lower and 1 Upper and 1 Number').required(),
            passwdnew2: Joi.string().label('Password').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/, ' mismatch').required()
        },
    };

    var field = req.body.field;
    var schemaName = req.body.schemaName;
    var errorObj = {};

    if (req.body.isSingleVld) {
        if (schemaName)
            var schemaObj = _.get(schema, schemaName);
        else
            var schemaObj = schema;

        if (schemaObj) {
            for (var x in field) {
                if (schemaObj[x]) {
                    var check = {};
                    check[x] = schemaObj[x];
                    var result = Joi.validate(field, check, { language: errorMsgs });
                    if (result.error != null)
                        errorObj = result.error.details[0].message;
                }
            }
        }

    } else {
        if (schemaName)
            var schemaObj = _.get(schema, schemaName);
        else
            var schemaObj = schema;

        if (schemaObj) {
            var result = Joi.validate(field, schemaObj, { abortEarly: false, language: errorMsgs, allowUnknown: true });

            if (result.error != null) {
                _.forEach(result.error.details, function(value) {
                    if (!errorObj[value.path])
                        errorObj[value.path] = value.message;
                });
            }
        }
    }

    res.status(200);
    res.send(errorObj);
}


/* Password regex
    
    (/^
    (?=.*\d)                //should contain at least one digit    
    (?=.*[A-z])             //should contain at least one letter
    (^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$)         //Password should have 8 characters at least 1 Alphabet, 1 Number and 1 Special Character
    $/)
    
*/