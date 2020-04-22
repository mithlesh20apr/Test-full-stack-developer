/* global __dirname */
var path = require('path');
var userApi = require(path.join(__dirname, '..', '..', '..', 'routes', 'subscriber', 'userApi'));
var authApi = require(path.join(__dirname, '..', '..', '..', 'routes', 'subscriber', 'authApi'));



module.exports = function(app) {

    //User authentication management
    userApi(app);
    authApi(app)
};
