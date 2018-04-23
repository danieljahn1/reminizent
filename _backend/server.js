var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var customersRouter = require('./routes/customers');
var adminsRouter = require('./routes/admins');
var activityRouter = require('./routes/activity');
var contactActivityRouter = require('./routes/contactactivity');
var campaignRouter = require('./routes/campaign');
var campaignSentRouter = require('./routes/campaignsent');

var app = express();

require('dotenv').load();
// require('./config/db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/customer', customersRouter);
app.use('/admin', adminsRouter);
app.use('/activity', activityRouter);
app.use('/contactactivity', contactActivityRouter);
app.use('/campaign', campaignRouter);
app.use('/campaignsent', campaignSentRouter);

module.exports = app;
