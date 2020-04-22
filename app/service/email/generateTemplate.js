var path = require('path');
var envConfig = require(path.join(__dirname, '..', '..', 'global', 'config', 'appConfig'));
var moment = require('moment');

var fs = require('fs');
var _ = require('lodash');


exports.getHtmlPwdReset = function(token) {
    var viewPath = path.join(__dirname, '..', '..', 'views', 'emailVerification.html');
    var html = fs.readFileSync(viewPath, encoding = 'utf8');
    var template = _.template(html);
    var model = {
        verifyUrl: envConfig.EMAIL_CB_RSPW + token,
        title: 'ApnaStudy Account Password Reset',
        subTitle: 'This Is For Change Of Password For Your ApnaStudy Account!',
        body: 'Please reset password by clicking the button below'
    };

    return template(model);
};

exports.getHtmlVerifyMail = function(token) {
    var viewPath = path.join(__dirname, '..', '..', 'views', 'emailVerification.html');
    var html = fs.readFileSync(viewPath, encoding = 'utf8');
    var template = _.template(html);

    var model = {
        verifyUrl: envConfig.EMAIL_CB_VERIFY + token,
        title: 'ApnaStudy Account Verfication',
        subTitle: 'This Is For ApnaStudy Account Verification',
        body: 'Please verify your email address by clicking the button below'
    };

    return template(model);
};

exports.getHtmlWelcomeMail = function() {
    var viewPath = path.join(__dirname, '..', '..', 'views', 'welcomeEmailTemp.html');
    var html = fs.readFileSync(viewPath, encoding = 'utf8');
    var template = _.template(html);

    var model = {
        title: 'Welcome to ApnaStudy',
        subTitle: 'Account Verification Successful',
        body: 'Your ApnaStudy Account Verification has been Completed.'
    };

    return template(model);
};

exports.getHtmlWelcomeMailSocialReg = function(tempPassw) {
    var viewPath = path.join(__dirname, '..', '..', 'views', 'welcomeEmailTemp.html');
    var html = fs.readFileSync(viewPath, encoding = 'utf8');
    var template = _.template(html);

    var model = {
        title: 'Welcome to ApnaStudy',
        subTitle: 'Account Verification Successful',
        body: 'Your Temporary Password is - ' + tempPassw
    };

    return template(model);
};

exports.getHtmlPaymentStatusMail = function(status, payload) {
    var viewPath = path.join(__dirname, '..', '..', 'views', 'welcomeEmailTemp.html');
    var html = fs.readFileSync(viewPath, encoding = 'utf8');
    var template = _.template(html);
    var payStatus = status === true ? 'was Successful' : 'has Failed';
    var subTitleMsg = status === true ? 'Payment ' + payStatus + ' for orderId ' + payload.orderId : 'Payment ' + payStatus + ' for orderId ' + payload.orderId + '.<br> Reason :- ' + payload.msg
    var model = {
        title: 'ApnaStudy Payment Status',
        subTitle: subTitleMsg,
        body: 'Payment ' + payStatus + '. Details : Class - ' + payload.className + '. Amount - ' + payload.amount + '.'
    };

    return template(model);
};

exports.classCreationHtml = function(req, username) {

    var html = '<table><tbody>';
    html += '<tr><td><h3>Teacher Name</h3></td><td>' + req.firstName + ' ' + req.lastName + '</td></tr>';
    html += '<tr><td><h3>User Name</h3></td><td>' + username + '</td></tr>';
    html += '<tr><td><h3>Class Title</h3></td><td>' + req.body.createClassData.title + '</td></tr>';
    html += '<tr><td><h3>Start Date</h3></td><td>' + req.body.createClassData.classStartDate.toString().slice(0, 10) + '</td></tr>';
    html += '<tr><td><h3>End Date</h3></td><td>' + req.body.createClassData.classEndDate.toString().slice(0, 10) + '</td></tr>';
    html += '<tr><td><h3>Category</h3></td><td>' + req.body.createClassData.category + '</td></tr>';
    html += '<tr><td><h3>Category 1</h3></td><td>' + req.body.createClassData.categoryItem1 + '</td></tr>';
    html += '<tr><td><h3>Category 2</h3></td><td>' + req.body.createClassData.categoryItem2 + '</td></tr>';
    html += '<tr><td><h3>Category 3</h3></td><td>' + req.body.createClassData.categoryItem1 + '</td></tr>';
    html += '<tr><td><h3>Class Type</h3></td><td>' + req.body.createClassData.paymentType + '</td></tr>';
    html += '</tbody></table>';

    return html;
};

exports.getExceptionHtml = function(data) {
    var logMsg = '<p style="color: red; font-weight: bold">' + data.logType + '</p>';
    logMsg += '<p style="color: red; font-weight: bold"> Error: ' + data.details.error + '</p>';
    logMsg += '<p style="color: blue"> Stack: ' + data.details.stack + '</p>';
    logMsg += '<p> Route: ' + data.details.route + '</p>';
    logMsg += '<p> Content: ' + JSON.stringify(data.details.content) + '</p>';
    logMsg += '<p> Params: ' + JSON.stringify(data.details.params) + '</p>';
    logMsg += '<p> Body: ' + JSON.stringify(data.details.body) + '</p>';

    return logMsg;
};

exports.getHtmlFeedback = function(data) {
    var viewPath = path.join(__dirname, '..', '..', 'views', 'welcomeEmailTemp.html');
    var html = fs.readFileSync(viewPath, encoding = 'utf8');
    var template = _.template(html);

    var model = {
        title: 'Thank you for feeadback.',
        subTitle: 'We will contact you soon ',
        body: data
    };

    return template(model);
};

exports.resourceUpload = function(data) {
    var logMsg = '<p style="color: red; font-weight: bold"> TITLE :' + data.title + '</p>';
    logMsg += '<p style="color: red; font-weight: bold"> Description: ' + data.description + '</p>';
    logMsg += '<p style="color: red; font-weight: bold"> FileName: ' + data.fileName + '</p>';
    logMsg += '<p style="color: red; font-weight: bold"> FileDisplayName: ' + data.fileDisplayName + '</p>';
    logMsg += '<p style="color: red; font-weight: bold"> FileSize: ' + data.fileSize + '</p>';
    logMsg += '<p style="color: red; font-weight: bold"> resourceType: ' + data.resourceType + '</p>';
    return logMsg;
};


exports.getTransactionTemplate = function(paymentInfo, userData, classData) {
    var body = '<h1 style=" text-decoration: underline">Transaction Details</h1>';

    body += '<p style="color: red; font-weight: bold "> Order Id : ' + paymentInfo.orderId + ' </p>';
    body += '<p style="font-weight: bold">  Class Name : ' + classData.title + ' ( Id : ' + paymentInfo.classId + ' ) </p>';
    body += '<p style=" font-weight: bold">  User name : ' + userData.userName + ' ( Name: ' + userData.profile.firstName + ' ' + userData.profile.lastName + '  )</p>';
    body += '<p style=" font-weight: bold">  Vendor : ' + paymentInfo.paymentVendor + ' </p>';
    body += '<p style=" font-weight: bold">  Transaction State : ' + paymentInfo.transactState + ' </p>';
    body += '<p style=" font-weight: bold">  Amount : ' + paymentInfo.amount + ' </p>';
    body += '<p style=" font-weight: bold">  Payment Date : ' + moment(paymentInfo.paymentDate).format('MMMM Do YYYY, h:mm:ss a') + ' </p>';

    return body;
}