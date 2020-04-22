/* global __dirname */
var Path = require('path');
var CustomerCtrl = require(Path.join(__dirname, '..', '..', 'controllers', 'customer', 'customerCtrl'));
var jwt = require(Path.join(__dirname, '..', '..', 'service', 'auth', 'jwt'));

module.exports = function(app, upload){
	
    app.post('/api/v1/website/customer', 
        CustomerCtrl.checkDuplicateUser,
        CustomerCtrl.createCustomer,
    );

}