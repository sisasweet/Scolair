var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var login = require('./routes/login');
var config = require('./config/database');
let port = process.env.PORT || 5000
mongoose.connect(config.database);
var notFound = require('./routes/not_found');
var admin = require('./routes/admin/admin');
var introduction = require('./routes/introduction');
var listModule = require('./routes/admin/module');
var enseignant = require('./routes/admin/enseignant');
var student = require('./routes/admin/student');
var delib = require('./routes/admin/delib');
var moduleDeEnseignant = require('./routes/enseignant/module');
var moduleDeEtudiant = require('./routes/student/module');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(passport.initialize());

// app.get('/', function(req, res) {
  // res.send('Page under construction.');
// });

app.use('/login', login);
app.use('/', introduction);
//app.use('/login', login);
app.use('/admin', admin);
app.use('/admin/module', listModule);
app.use('/admin/enseignant', enseignant);
app.use('/admin/student', student);
app.use('/admin/delib', delib);
app.use('/enseignant/module', moduleDeEnseignant);
app.use('/student/module', moduleDeEtudiant);

// catch 404 and forward to error handler
// catch 404 error
app.use(notFound);
 //deployement acess and compression data
 const cors = require("cors");
 app.use(cors());


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('notFound');
});

module.exports = app;

app.listen(port, function() {
  console.log('We have successfully connected to port: ', port);
});
