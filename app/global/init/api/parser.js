var restify = require('restify');

module.exports = function (app) {
        
    /* Parse server known types */
    app.use(restify.acceptParser(app.acceptable));
    /* Parses HTTP query string */
    app.use(restify.queryParser());
    /* Parses HTTP request body */
    app.use(restify.bodyParser(
        {
            maxBodySize: 1000000 /* Restrict to 1 MB data size */            
        }
    ));
       
    /* Remove redundant slashes from route paths */
    app.pre(restify.pre.sanitizePath());   
    
    /* Zip server response objects */
    app.use(restify.gzipResponse());
};

/* prefix timestamp at log */
var originalConsoleLog = console.log;
global.console.log = function() {
    args = [];
    dateTimeOption = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
};
    args.push( '\x1b[36m[' + (new Date).toLocaleTimeString("en-US",dateTimeOption) + ']\x1b[0m' );
    // Note: arguments is part of the prototype
    for( var i = 0; i < arguments.length; i++ ) {
        args.push( arguments[i] );
    }
    originalConsoleLog.apply( console, args );
};


/* prefix timestamp at log */
var originalConsoleError= console.error;
global.console.error = function() {
    args = [];
    dateTimeOption = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
};
    args.push( '\033[31merror: \033[91m \x1b[36m[' + (new Date).toLocaleTimeString("en-US",dateTimeOption) + ']\x1b[0m' );
    // Note: arguments is part of the prototype
    for( var i = 0; i < arguments.length; i++ ) {
        args.push( arguments[i] );
    }
    originalConsoleError.apply( console, args );
};

/* prefix timestamp at log */
var originalConsoleInfo= console.info;
global.console.info = function() {
    args = [];
    dateTimeOption = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
};
    args.push( '\x1b[32minfo: \033[91m \x1b[36m[' + (new Date).toLocaleTimeString("en-US",dateTimeOption) + ']\x1b[0m' );
    // Note: arguments is part of the prototype
    for( var i = 0; i < arguments.length; i++ ) {
        args.push( arguments[i] );
    }
    originalConsoleInfo.apply( console, args );
};