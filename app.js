var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy =require('connect-busboy');

var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var imageDownload = require('./routes/auth/images/download');
var albumGet = require('./routes/auth/managealbum/get');
var albumInsert= require('./routes/auth/managealbum/insert');
var albumOption = require('./routes/auth/managealbum/option');
var albumDelete = require('./routes/auth/managealbum/delete');
var imageUpload = require('./routes/auth/images/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(busboy({immediate: true}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login',login);
app.use('/signup',signup);
app.use('/managealbum/get',albumGet);
app.use('/managealbum/insert',albumInsert);
app.use('/managealbum/option',albumOption);
app.use('/managealbum/delete',albumDelete);
app.use('/image/download',imageDownload);
app.use('/image/upload',imageUpload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
