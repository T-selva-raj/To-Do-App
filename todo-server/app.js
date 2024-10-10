var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require("firebase-admin");
require('./globalFunctions');
require('./config/config');
require('./config/constants');
var serviceAccount = require("./firebase.json");
var CryptoService = require('./services/crypto.service');
require('dotenv').config();
const passport = require("passport");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECTID}.firebaseio.com`
});




models = require("./models");
var AuthRouter = require('./routes/auth');
var TaskRouter = require('./routes/task');
var UserRouter = require('./routes/user');

var app = express();
require('./middleware/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('cors')());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, , OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Cache-Control", "no-cache ,no-store");
  next();
});

app.use(function (req, res, next) {

  if (req && req.headers && req.headers.authorization) {
    const accessToken = CryptoService.decryptDetails(req.headers.authorization);
    req.headers.authorization = accessToken;
  }
  next();
});
app.use('/auth', AuthRouter);
app.use('/task', TaskRouter);
app.use('/user', UserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
