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
	//Creates list of creators
	User.findByStatus(true, function(err, creators) {
		res.render('search', {creators: creators});
		console.log(creators);
	});
});

router.post('/search', function(req, res){
	res.redirect('/search');
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

module.exports = router;