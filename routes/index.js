var express = require('express');
var fs = require('fs');
var User = require('../models/user');
var flash = require('connect-flash');
///////////////////////////////////////////////////////////////////
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

///////////////////////////////////////////////////////////////////
var bcrypt = require('bcrypt');
var router = express.Router();

const indexpicspath = './public/data/indexpics.json';
// Get Homepage
router.get('/', function(req, res){
	res.render('index', {
    data: JSON.parse(fs.readFileSync(indexpicspath))["pics"],
    user : req.user
    // we can change this later so it checks cookies
  });
});

router.get('/startbid', function(req, res){
	res.render('startbid', {user : req.user});
});

router.post('/bidwar', function(req, res){
	res.render('bidwar');
});


router.get('/search', function(req, res){
	User.findByStatus(true, function(err, creators) {
		res.render('search',{person: null, creators: creators});
	});
});




router.post('/search', function(req, res){
	User.findByStatus(true, function(err, creators) {
		User.findUserByUsername(req.body.search, function(err, person){
			User.findOne({ username: {"$regex": "^" + req.body.search + "\\b", "$options": "i"
			  }}, function (err, user) {
				  	if (user) {
						console.log(user);
						return res.render('search', {person: req.body.search, creators: null});
					}
					else{
						console.log("chitty chitty bang bang");
						return res.render('search', {person: null, creators: creators});
					}
		});
	});
});
});


router.get('/profile', function(req, res){
	res.render('profile');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}

router.get('/creator', function(req, res){
	res.render('creator');
});

router.get('/bidwar', function(req, res){
	res.render('bidwar');
});

module.exports = router;