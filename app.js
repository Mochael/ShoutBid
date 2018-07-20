var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
// var createError = require('http-errors');

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

const indexpicspath = './public/data/indexpics.json';

const dbname = 'shoutbid';
//var mongoDB = 'mongodb://MisterManMan:PoopPee123Dee@ds143511.mlab.com:43511/' + dbname;
var mongoDB = 'mongodb://localhost:27017/' + dbname;

mongoose.connect(mongoDB, {useNewUrlParser: true});
// 27017 for now, MONGODB should have fix soon
// ^^this is a very recent error MONGODB put out, normally the port number '27017'
// would not be in this url. it was like beginning of july i saw this on stack exchange.

mongoose.connect(mongoDB, {useNewUrlParser: true});

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

init();

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

module.exports = app

// put whatever in this function to run on startup to initialize new shit
function init(){
	var indexpics = JSON.parse(fs.readFileSync(indexpicspath));
	fs.readdir('./public/indexpics', function(err, files){
		createNewData({"pics":[]}, indexpics["pics"], files, function(newData){
			fs.writeFile(indexpicspath, JSON.stringify(newData, null, 4), function(err){
				if (err) throw err;
			});
		}, '"path": "indexpics/~~obj~~"', '"name": "~~obj.split(".")[0]~~"');
	});
}

// trying to make this universal, can probably route this instead of putting it into app.js..
// for now it can stay here
function createNewData(format, current, updated, cb, ...pushInfo){
	let newData = format;
	let key = Object.keys(newData)[0];

	newData[key] = current;
	compare(current, updated, function(changes){
		newData[key].forEach(function(obj, i){
			if(changes.remove.includes(obj.id)){
				newData[key] = newData[key].filter(function(id){ return id !== obj; });
			}
		});
		changes.add.forEach(function(obj, i){
			let pushing = '{"id": "' + obj + '", ';
			pushInfo.forEach(function(param, j){
				let p = pushInfo[j].split('~~');
				p.forEach(function(variable, index){
					if(index % 2 && variable !== '') pushing = pushing + eval(variable);
					else pushing = pushing + variable;
				});
				if(j == pushInfo.length - 1) pushing = pushing + '}'; else pushing = pushing + ', '
			});
			newData[key].push(JSON.parse(pushing));
		});
	});
	cb(newData);
}

// ONLY WORKS WITH DATA THAT HAVE 'ID' AND IS COMPARING TO LIST OF NEW 'ID''S
// can change to be even MORE universal with big data, where 2 datasets are just compared
// and uobj and cobj are compared as uobj.id and cobj.id
function compare(current, updated, cb){
	let changes = {"exists":[], "add":[], "remove":[]};
	updated.forEach(function(uobj, i){ // updated obj
		current.forEach(function(cobj, j){ // current obj
			if(cobj.id == uobj){
				changes.exists.push(uobj);
				changes.add = changes.add.filter(function(id){ return id !== uobj; });
				changes.remove = changes.remove.filter(function(id){ return id !== cobj.id; });
			}else if(!changes.exists.includes(uobj) && !changes.add.includes(uobj)){
				changes.add.push(uobj);
			}else if(!changes.exists.includes(cobj.id) && !changes.remove.includes(cobj.id)){
				changes.remove.push(cobj.id);
			}
		});
	});
	cb(changes);
}
