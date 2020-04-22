/* global __dirname */
var mongoose = require('mongoose');
var path = require('path');
var customerModel = require(path.join(__dirname, '..', '..', '..', 'models', 'customer', 'customerModel'));


module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db, { useNewUrlParser: true , useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Db opened');
    });
};