/* global process */
/* global __dirname */
var path = require('path');
var util = require('util');
var restify = require('restify');
var logger = require(path.join(__dirname, '..', 'util', 'logger'));
var appConfig = require(path.join(__dirname, '..', '..', 'global', 'config', 'appConfig'));
var emailService = require(path.join(__dirname, '..', 'email', 'emailService'));

module.exports = function(app) {

    /* Uncaught exception in restify routes */
    app.on('uncaughtException', function(req, res, route, err) {
        var content;
        if (req.route.method == 'POST') {
            content = { requestBody: req.body };
        } else {
            content = { requestParams: req.params };
        }

        var logDetails = {
            logType: 'Exception - Uncaught Global Route Exception',
            details: {
                error: err.message,
                stack: err.stack,
                route: req.route.path,
                content: content
                    // userId: req.userId
            }
        };

        if (appConfig.env != 'dev')
            emailService.sendExceptionEmails(logDetails);

        logger.error(logDetails);

        //err.body = 'Internal exception.';        
        res.status(500);
        // res.send('Internal Exception. Please contact ApnaStudy support.');  
    });

    /* Uncaught exception for the entire app instance */
    process.on('uncaughtException', function(err) {

        var logDetails = {
            logType: 'Uncaught Global Process Exception',
            details: {
                error: err,
                stack: err.stack
            }
        };

        if (appConfig.env != 'dev')
            emailService.sendExceptionEmails(logDetails);

        logger.error(logDetails);

        /* Stop process for a clean restart */
        //process.exit(1);
    });

    /* Internal Server Exception - Restify handler */
    app.on('InternalServer', function(req, res, err, next) {
        var logDetails = {
            logType: 'Exception - Internal Server Exception',
            details: {
                error: err,
                stack: err.stack,
                // route: route.spec.path,
                // requestHeader: req.headers,
                // content:content,
                params: req.params,
                body: req.body
                    // userId: req.userId
            }
        };

        if (appConfig.env != 'dev')
            emailService.sendExceptionEmails(logDetails);

        logger.error(logDetails);

        // console.log("internal errors");
        //err.body = 'Internal Exception. Please contact ApnaStudy support.';
        res.status(500);
        res.send('Something went wrong. Please try again later.');
        //return next();
    });

    /* Unauthorized exception - Restify handler */
    app.on('Unauthorized', function(req, res, err, next) {
        // if(req.route.method == 'POST'){
        //     content = {requestBody: req.body};
        // }
        // else{
        //     content = {requestParams: req.params};
        // }      
        logger.error({
            logType: 'Exception - Unauthorized Exception',
            details: {
                errorDetails: err,
                stack: err.stack,
                // requestHeader: req.headers,
                // content:content
                // userId: req.userId
            }
        });

        //err.body (= 'User is not authorized to complete the task.';
        // console.log("unauthorizedss");
        res.status(403);
        res.send(err.message);
        //return next();
    });

    /* Uncaught exception in restify routes */
    app.on('NotAcceptable', function(req, res, err, next) {
        // if(req.route.method == 'POST'){
        //     content = {requestBody: req.body};
        // }
        // else{
        //     content = {requestParams: req.params};
        // } 
        logger.error({
            logType: 'Exception - Unacceptable param value.',
            details: {
                error: err.message,
                stack: err.stack,
                // content:content
                // userId: req.userId
            }
        });

        res.status(403);
        res.send(err.message);
    });  
};