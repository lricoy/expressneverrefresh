/**
 * Integration file to Gulp
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @license MIT
 */

'use strict';

var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    browserSync = require("browser-sync");
    
gulp.task("default", ["browser-sync", "nodemon"], function(){

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
        script: 'app.js',
        ignore: ["public/*"],
    }).on("start");
});