/* global __dirname */
var winston = require('winston');
var winstonMongo = require('winston-mongodb').MongoDB;
winston.emitErrs = true;
var path = require('path');
var config = require(path.join(__dirname, '..', '..', 'global', 'config', 'appConfig'));

var logger = new winston.Logger( {
     transports: getInstances(),
    exitOnError: false
});

function getInstances(){    
    var winInstances = [];

    winInstances.push(
        new winston.transports.Console({
            level: 'error',
            handleExceptions: true,
            json: false,
            colorize: true
        }));

        winInstances.push(
            new winston.transports.MongoDB( {
                level: 'error',
                db: config.logdb,
                collection: 'searchindexfaillog',
                handleExceptions: true,
                json: false,
                colorize: true
        }));
 
    return winInstances;
}

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};