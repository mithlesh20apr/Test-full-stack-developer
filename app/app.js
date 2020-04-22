/* global __dirname */
var fs = require('fs');
var http = require('http');
 var https = require('https');
var restify = require('restify');
var path = require('path');
// var collectStat = require(path.join(__dirname, 'global', 'init', 'internal', 'collectStat'));
var crossDomain = require(path.join(__dirname, 'global', 'init', 'api', 'crossDomain'));
var parser = require(path.join(__dirname, 'global', 'init', 'api', 'parser'));
// var throttle = require(path.join(__dirname, 'global', 'init', 'api', 'throttle'));
var config = require(path.join(__dirname, 'global', 'config', 'appConfig'));
var express = require('express');
var bodyParser  = require('body-parser');
var router = express.Router();
var cors= require('cors');
var globalErrorHandler = require(path.join(__dirname, 'service', 'exception', 'globalErrorHandler'));


/* API server instance */

var app = {};

if (config.SSLOn === true) {
    app = restify.createServer({
        certificate: fs.readFileSync(path.join(__dirname, '..', 'keys', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, '..', 'keys', 'server.key')),
        name: 'test',
        version: config.currentVersion
    });
} else {
    app = restify.createServer({
        name: 'test',
        version: config.currentVersion
    });
}

/* Collect statistical data from route calls */
// collectStat(app);

/* Cross Domain Access */
crossDomain(app);

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true, parameterLimit:50000}));
/* Middleware parsers */
// parser(app);

/* Global error handler */
globalErrorHandler(app);

/* Connect to the primary database */
require(path.join(__dirname, 'global', 'init', 'data', 'mongoose'))(config);

//mongodb - Client
var db = require(path.join(__dirname, 'global', 'init', 'data', 'mongodb'));
db.initDb();

/* Connect to the Redis instance */
var redisDatabase = require(path.join(__dirname, 'global', 'init', 'data', 'redis'));
redisDatabase.startRedis();

/* Throttle http request burst - Denial of service */
// throttle(app, redisDatabase);

/* Initiate route instances */
require(path.join(__dirname, 'global', 'init', 'api', 'routes'))(app);

/* Start listening */
if (config.SSLOn === true) {
    app.listen(config.httpsPort, function() {
        console.log(app.name, ' SSL on listening at ', app.url);
    });
} else {
    app.listen(config.httpPort, function() {
        console.log(app.name, ' listening at ', app.url);
    });
}
