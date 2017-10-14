var express = require('express');
var path = require('path'); // working with file and directory paths
// var favicon = require('serve-favicon'); // caches favicon
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser');

var config = require('./bin/config')

var index = require('./routes/index');
var receive_text = require('./routes/receive_text');
// var users = require('./routes/users');
var app = express();
// var formData = require('express-form-data');
//
// const multipartyOptions = {
//     autoFiles: true
// };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setting secrets
app.set('config', config);
//
// // parse a data with connect-multiparty.
// app.use(formData.parse(multipartyOptions));
// // clear all empty files (size == 0)
// app.use(formData.format());
// //
// app.use(formData.stream());
// // union body and files
// app.use(formData.union());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enabling cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', index);
// app.use('/users', users);
app.use('/', receive_text);


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
