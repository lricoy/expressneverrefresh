/**
 * Main File Application
 *
 * @author André Ferreira <andrehrf@gmail.com>
 * @license MIT
 */

'use strict';

var cluster = require("cluster"),//Usage Cluster of Node.js
    express = require("express"),//Starting Express
    app = express(),//Creating Application
    morgan = require('morgan'),//Managed logs
    http = require("http").Server(app),//Creating HTTP Server
    cookieParser = require("cookie-parser"),//Module for cookie management in Express
    bodyParser = require("body-parser"),//Module for processing HTTP requests in Express
    compression = require("compression");//Gzip compression module for Express

if(cluster.isMaster){
    var cpuCount = require('os').cpus().length;

    for(var i = 0; i < cpuCount; i += 1)
        cluster.fork();

    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });
}
else{
    app.use(morgan('dev'));//Enabling Express logs
    app.use(compression());//Enabling compression
    app.use(cookieParser("MyApp"));//Cookies Management
    app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}));
    app.use(bodyParser.json());
    // app.use(express.static("public"));

    app.get("/", function(req, res){
        res.send("<h1>Hello from worker: " +cluster.worker.id+"</h2>");
    });

    http.listen(3000, function(){
        console.log("Server HTTP run: 3000 (cluster "+cluster.worker.id+")");
    });
}
