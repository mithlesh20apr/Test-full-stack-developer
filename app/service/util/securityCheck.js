var path = require('path');
var stripTags = require('strip-tags');

//message
exports.sanityCheckMessage = function (req, res, next) {
    // console.log(req.body);
    req.body.content = removeScriptTag(req.body.content);
    next();
};
//forum thread
exports.sanityCheckForum = function (req, res, next) {
    // console.log(req.body);
    req.body.content = removeScriptTag(req.body.content);
    next();
};
//forum comment
exports.sanityCheckForumComment = function (req, res, next) {
    //console.log(req.body);
    req.body.comment = removeScriptTag(req.body.comment);
    next();
};
//forum subcomment
exports.sanityCheckForumSubComment = function (req, res, next) {
    //console.log(req.body);
    req.body.subComment = removeScriptTag(req.body.subComment);
    next();
};
// notice
exports.sanityCheckNotice = function (req, res, next) {
    //console.log(req.body);
    req.body.content = removeScriptTag(req.body.content);
    next();
};
// test
exports.sanityCheckTest = function (req, res, next) {
    //console.log(req.body.question.question);
    req.body.question.question = removeScriptTag(req.body.question.question);
    next();
};
// presentation
exports.sanityCheckPresentation = function (req, res, next) {
    //console.log(req.body.slides);
    if(req.body.slides && req.body.slides.length > 0){
        for (var i = req.body.slides.length - 1; i >= 0; i--) {
            req.body.slides[i] = removeScriptTag(req.body.slides[i]);
        }
    }
    
    next();
};

// cleaning raw html to clean sanitized html
function removeScriptTag(inputparam) {
    return stripTags(inputparam, ['script']);
}