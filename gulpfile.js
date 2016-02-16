/**
 * Integration file to Gulp
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @license MIT
 */

'use strict';

var spawn = require("child_process").spawn,
    gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    nodeInspector = require("gulp-node-inspector"),
    browserSync = require("browser-sync");
    
gulp.task("default", ["browser-sync", "nodemon", "debug"], function(){

});

gulp.task("browser-sync", function(){
    browserSync({
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        port: 7000
    });
});

gulp.task("nodemon", function(){
    nodemon({
        exec: 'node --debug',
        script: 'app.js',
        ignore: ["public/*"],
        debug: true
    }).on("start");
});

gulp.task('debug', function () {
    gulp.src([])
        .pipe(nodeInspector({
            debugPort: 5858,
            webHost: '0.0.0.0',
            webPort: 8080,
            saveLiveEdit: true,
            preload: true,
            inject: true,
            hidden: [],
            stackTraceLimit: 50,
            sslKey: '',
            sslCert: ''
        }));
});