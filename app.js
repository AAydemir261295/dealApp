var express = require('express');
var path = require('path');
var createRoute = require('./routes/create');
var pickupRoute = require("./routes/pickUp");
var closeRoute = require("./routes/close");
var rejectRoute = require("./routes/reject");
var listRoute = require("./routes/list");
var rejectAllRoute = require("./routes/rejectAll");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/create', createRoute);
app.use('/pickup', pickupRoute);
app.use('/close', closeRoute);
app.use('/reject', rejectRoute);
app.use('/list', listRoute);
app.use('/rejectAll', rejectAllRoute);






module.exports = app;
