var path = require('path');
var appConfig = require(path.join(__dirname, '..', '..', 'global', 'config', 'appConfig'));
var logger = require(path.join(__dirname, '..', 'util', 'logger'));
var emailTemp = require(path.join(__dirname, 'generateTemplate'));
var aws = require('aws-sdk');
var ses = null;

var getEmailService = function() {
    if (ses == null) {
        ses = new aws.SES({
            "apiVersion": appConfig.sesApiVersion,
            "accessKeyId": appConfig.sesUser,
            "secretAccessKey": appConfig.sesSecKey,
            "region": appConfig.sesRegion,
            "maxRetries": 5,
            "retryDelayOptions": { "base": 2000 }
        });
    }

    return ses;
}

var sendEmail = function(toEmail, fromEmail, emailBody, emailTitle, callback) {
    var mailOptions = {
        Destination: {
            ToAddresses: [toEmail]
        },
        Message: {
            Body: {
                Html: {
                    Data: emailBody,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: emailTitle,
                Charset: 'UTF-8'
            }
        },
        Source: fromEmail
    };
    getEmailService().sendEmail(mailOptions, function(err, data) {
        if (err) {
            logger.error({
                logType: 'Exception - Email. Search',
                details: {
                    error: err.message,
                    stack: err.stack
                }
            });
        }

        if (callback)
            callback(err);
    });
}

exports.sendEmail = sendEmail;

exports.sendExceptionEmails = function(data) {
    sendEmail(
        appConfig.Support_Email,
        appConfig.Support_Email,
        emailTemp.getExceptionHtml(data),
        'Prime - Env - ' + appConfig.env + ' ' + new Date());
}