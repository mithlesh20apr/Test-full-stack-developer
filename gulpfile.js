var argv = require('yargs').argv;
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var reporter = require('jshint-stylish').reporter;
var defineModule = require('gulp-define-module');
var jsonTransform = require('gulp-json-transform');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var server = require('gulp-develop-server');
var livereload = require('gulp-livereload');

gulp.task('code-quality', function () {
    gulp.src('./app/**/*.js')
        .pipe(jshint({
            expr: true
        }))
        .pipe(jshint.reporter(reporter));
});

gulp.task('mocha', function () {
    return gulp.src([

         'test/user-spec.js',         
//         'test/class-spec.js',
        
        // 'test/test-spec.js',
        // 'test/classForum-spec.js',
        // 'test/payment-spec.js',
        // 'test/message-spec.js',
        // 'test/resource-spec.js'

        ], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000
        }))
        .on('error', gutil.log);
});

//USAGE: gulp set-env-config -e "local"
gulp.task('set-env-config', function () {
    gulp.src('./appConfig.json')
        .pipe(jsonTransform(function (data) {
            return data[argv.e];
        }))
        .pipe(defineModule('node'))
        .pipe(gulp.dest('./app/global/config/'))
});

//USAGE: gulp copy-client -p "C:/_Rishi/venture/aws/cloud-school_launch-pad/CloudSchool/"
gulp.task('copy-api', function () {
    gulp.src('./**')
        .pipe(gulp.dest(argv.p));
});
// 
// gulp.task('bundle-validation', function(){
//     return gulp.src(
//             [
//                 'app/validation/validationUtil.js',
//                 'app/validation/controller/testCtrlVld.js', 
//                 'app/validation/controller/teacherCtrlVld.js',
//                 'app/validation/controller/classCtrlVld.js',
//                 'app/validation/controller/classForumCtrlVld.js',
//                 'app/validation/controller/messageCtrlVld.js',
//                 'app/validation/controller/userCtrlVld.js'                
//             ])
//         .pipe(concat('csvalidation.bundle.js'))  
//         .pipe(gulp.dest('./app/validation/controller/'))
// });

gulp.task('server:start', function () {
    server.listen({
        path: './app/global/init/serverstart.js'
    });
});

gulp.task('cluster:start', function () {
    server.listen({
        path: './app/global/init/clusterstart.js'
    });
})

gulp.task('server:restart', function () {
    server.restart(function (error) {
        if (!error) livereload.reload();
    });
});
