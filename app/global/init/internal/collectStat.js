var restify = require('restify');

module.exports = function (app) {        
    /* Audit restify routes */
    app.on('after', function (req, res, route, err) {
        //TODO: Collect statistical data from route calls        
        //console.log('route', route);        
    });   
};