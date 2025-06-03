var express = require('express');
var path = require('path');
var createRoute = require('./routes/create');


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', createRoute);

module.exports = app;
