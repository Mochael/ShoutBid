var express = require('express');
var fs = require('fs');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var router = express.Router();

const indexpicspath = './public/data/indexpics.json';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    data: JSON.parse(fs.readFileSync(indexpicspath))["pics"]
  });
});

router.post('/', function(req, res, next) {
  // console.log(Object.keys(req.body));
  res.render('index', {
    data: JSON.parse(fs.readFileSync(indexpicspath))["pics"]
  });
  // do we need to check if passwords match here? bc if they dont, they
  // are already stopped by filledout.js. just some thoughts
  bcrypt.hash(req.body.password, 10, function(err, hash){
    if (err) throw err;
    if (Object.keys(req.body).length == 7 && req.body.password == req.body.passwordConfirm){
      var newUser = new User({
        userStatus: req.body.userStatus,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: hash
      });
      newUser.save(function(err){
        if (err) throw err;
        // console.log(newUser.find());
      });
    }
  });
});

// Unnecessary but I saw this on stackexchange
//./routes/index.js
//exports.index = function(req, res){
//  res.render('index', { title: 'ejs' });};

module.exports = router;
