// node modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shoutbid', { useNewUrlParser: true });
var db = mongoose.connection;

// page routing
var routes = require('./routes/index');
var users = require('./routes/users');

// local modules
var localdata = require('./src/localdata');
//Set up mongoose connection
// download community server from:
// https://www.mongodb.com/download-center#community

// Init App
var app = express();


// some constants
const indexpicspath = './public/data/indexpics.json';

//var mongoDB = 'mongodb://localhost:27017/' + dbname;
// 27017 for now, MONGODB should have fix soon
// ^^this is a very recent error MONGODB put out, normally the port number '27017'
// would not be in this url. it was like beginning of july i saw this on stack exchange.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('ejs', exphbs({defaultLayout:'ejs'}));
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// using routers
app.use('/', routes);
app.use('/', users);

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

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

init();

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
module.exports = app;