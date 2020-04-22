/* global __dirname */
var path = require('path');
var jwt = require(path.join(__dirname, '..', '..', 'service', 'auth', 'jwt'));
var CustomerCtrl = require(path.join(__dirname, '..', '..', 'controllers', 'customer', 'customerCtrl'));

module.exports = function(app) {
  app.post('/api/v1/website/customer/login', 
      // userVld.verifyUserSignIn, 
        CustomerCtrl.authenticate
    );
};