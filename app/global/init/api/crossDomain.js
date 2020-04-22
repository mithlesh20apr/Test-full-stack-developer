var restify = require('restify');

module.exports = function (app) {    
    /* Cross Domain Access */
    restify.CORS.ALLOW_HEADERS.push('authorization');
    //restify.CORS.ALLOW_HEADERS.push('user');
    //TODO: Set origin; defaults to ['*']
    //TODO: Set credentials; defaults to false
    app.use(restify.CORS());       
};