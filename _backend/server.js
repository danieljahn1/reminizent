var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

require('dotenv').load();

var customersRouter = require('./routes/customers');
var adminsRouter = require('./routes/admins');
var activityRouter = require('./routes/activity');
var contactActivityRouter = require('./routes/contactactivity');
var campaignRouter = require('./routes/campaign');
var subscriptionsRouter = require('./routes/subscriptions');
var campaignSentRouter = require('./routes/campaignsent');
var realtorRouter = require('./routes/realtor');

var app = express();

// require('./config/db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('views'));

// Passport intialization
app.use(passport.initialize());

app.use('/customer', customersRouter);
app.use('/admin', adminsRouter);
app.use('/activity', activityRouter);
app.use('/contactactivity', contactActivityRouter);
app.use('/campaign', campaignRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/campaignsent', campaignSentRouter);
app.use('/realtor', realtorRouter);

module.exports = app;
