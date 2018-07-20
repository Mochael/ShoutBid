var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var creatorRouter = require('./routes/creator');
var regRouter = require('./routes/registration');

//Set up mongoose connection
var mongoose = require('mongoose');
// var mongoDB = 'mongodb://MisterManMan:PoopPee123Dee@ds143511.mlab.com:43511/local_library123';
// since michael had this URL to access his mongodb, this URL may be variable from person to person...
// when i have been using mongodb i downloaded it from :
// https://www.mongodb.com/download-center#community
// and stored it locally. not sure if this URL will work for everyone.. but still ill push it

// also michael i see you called your DB local_library123, do u wanna use something like 'shoutbid'?
// thats what im using below

const dbname = 'shoutbid';
//var mongoDB = 'mongodb://MisterManMan:PoopPee123Dee@ds143511.mlab.com:43511/' + dbname;
var mongoDB = 'mongodb://localhost:27017/' + dbname;

mongoose.connect(mongoDB, {useNewUrlParser: true});
// 27017 for now, MONGODB should have fix soon
// ^^this is a very recent error MONGODB put out, normally the port number '27017'
// would not be in this url. it was like beginning of july i saw this on stack exchange.

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// check for DB errors
db.on('error', function(err){
	console.log(err);
});
// check DB connection
db.once('open', function(){
	console.log('Connected to MongoDB (' + dbname + ').');
});
// bring in DB models
// var User = require('./models/user');
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', creatorRouter);
app.use('/', regRouter);
//Added by Michael for users
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// ^^^^ i fucking hate this thing so fucking annoying
// always gives an error because it cant FIND the error... retarded

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
    BY THE WAY anything you put after a module.export line, it will not run
    so putting the mongodb stuff afterward wont do anything. inside of index.js
    there is also code (which will be useful in the future) for a registration
    page for parsing a form body, but it is never run since the route is being
    exported before it can get to it
*/

module.exports = app;
