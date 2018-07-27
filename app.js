// node modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var session = require('express-session');

// local modules
var localdata = require('./src/localdata');

// page routing
var indexRouter = require('./routes/index');
var creatorRouter = require('./routes/creator');
var regRouter = require('./routes/registration');
var loginRouter = require('./routes/login');

//Set up mongoose connection
var mongoose = require('mongoose');
// download community server from:
// https://www.mongodb.com/download-center#community

// some constants
const indexpicspath = './public/data/indexpics.json';
const dbname = 'shoutbid';

var mongoDB = 'mongodb://localhost:27017/' + dbname;
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

// init function.. add anything you want to be initialized on startup
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

// Initializing sessions and cookies Not Sure what this stuff means need to go through express-sessions module
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false
}));

// using routers
app.use('/', indexRouter);
app.use('/', creatorRouter);
app.use('/', regRouter);
app.use('/', loginRouter);

// error handler
// app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};
// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });

// ^^^^^^^^^^^ you were right michael this will be proven to be better later on
// here, if an error occurs in our actual site, we can say the following:
// res.render('error') WHERE we have a page called error.ejs
// and the html in it can just say something like "oops, something went wrong!" yaknow

module.exports = app

// put whatever in this function to run on startup to initialize new shit
function init(){

	// file to indexpics directory DATA
	var indexpics = JSON.parse(fs.readFileSync(indexpicspath));
	// reading images in indexpics directory
	fs.readdir('./public/indexpics', function(err, files){

		localdata.compare(indexpics["pics"], files, function(changes){
			console.log(changes);
		});
		// ^^^^^^^^^^^^^^^^^
		// this doesnt have to be here, but i just want to log it to show u guys exactly how
		// this function is thinking. if you add / remove items from public/indexpics/, it will
		// show here on what it is updating

		localdata.updateData({"pics":[]}, indexpics["pics"], files, function(newData){
			// writes file at indexpicspath with newData to be passed when rendering index.ejs
			fs.writeFile(indexpicspath, JSON.stringify(newData, null, 2), function(err){
				if (err) throw err;
			});
		}, '"path": "indexpics/~~obj~~"', '"name": "~~obj.split(".")[0]~~"', '"msg": "null"');
	});
	// add more to be initialized here:

}
