var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  // michael here, err is not defined. so it was giving me another error lmao
  // if(err){
  //   console.log(err);
  //   return res.status(500).send();
  // }
  // return res.status(200).send();
});

router.post('/', function(req, res, next) {
  res.render('index');
  // console.log(req.body);
  var newUser = new User({
      userStatus: false,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
  });
  newUser.save(function(err){
      if (err) throw err;
  });
});

// Unnecessary but I saw this on stackexchange
//./routes/index.js
//exports.index = function(req, res){
//  res.render('index', { title: 'ejs' });};

module.exports = router;
