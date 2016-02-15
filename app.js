/**
 * Main File Application
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @license MIT
 */


'use strict';

var express = require("express"),//Starting Express
    app = express(),//Creating Application
    morgan = require('morgan'),//Managed logs
    http = require("http").Server(app),//Creating HTTP Server
    cookieParser = require("cookie-parser"),//Module for cookie management in Express
    bodyParser = require("body-parser"),//Module for processing HTTP requests in Express
    compression = require("compression");//Gzip compression module for Express
    
app.use(morgan('dev'));//Enabling Express logs
app.use(compression());//Enabling compression
app.use(cookieParser("MyApp"));//Cookies Management
app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000);
