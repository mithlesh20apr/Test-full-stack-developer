const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

var fs = require('fs');
var restify = require('restify');
var path = require('path');
var collectStat = require(path.join(__dirname, 'internal', 'collectStat'));
var crossDomain = require(path.join(__dirname, 'api', 'crossDomain'));
var parser = require(path.join(__dirname, 'api', 'parser'));
var throttle = require(path.join(__dirname, 'api', 'throttle'));
var config = require(path.join(__dirname, '..', 'config', 'appConfig'));
var globalErrorHandler = require(path.join(__dirname, '..', '..', 'service', 'exception', 'globalErrorHandler'));

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died with code ${code}`);
        console.log('Starting a new worker');
        cluster.fork();
    });
  
} else {

    /* API server instance */
    var app = restify.createServer({
        certificate: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'keys', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'keys', 'server.key')),
        name: 'BaiAdminServer',
        version: '1.0.0'
    });

    /* Collect statistical data from route calls */
    collectStat(app);

    /* Cross Domain Access */
    crossDomain(app);

    /* Middleware parsers */
    parser(app);

    /* Global error handler */
    globalErrorHandler(app)

    /* Connect to the primary database */
    require(path.join(__dirname, 'data', 'mongoose'))(config);

    /* Connect to the Redis instance */
    var redisDatabase = require(path.join(__dirname, 'data', 'redis'));
    redisDatabase.startRedis();

   

    /* Throttle http request burst - Denial of service */
    throttle(app, redisDatabase);

    /* Initiate route instances */
    require(path.join(__dirname, 'api', 'routes'))(app);

    /* Start listening */
    app.listen(config.httpsPort, function () {
        console.log(`${app.name} worker started with pid ${process.pid} listening at ${app.url}`);
    });

    /* Insert constant values */
    require(path.join(__dirname, 'data', 'syncConstVal'))();
}