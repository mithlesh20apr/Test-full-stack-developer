var restify = require('restify');

module.exports = function (app) {
    app.use(restify.throttle({
        burst: 200,
        rate: 150,
        ip: true,
        overrides: {
            '127.0.0.1': {
                rate: 0,        // unlimited
                burst: 0
            }
        }
    }));
};