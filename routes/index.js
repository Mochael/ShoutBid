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
  if(req.body.userStatus && req.body.firstName && req.body.lastName && req.body.email && req.body.username && req.body.password && req.body.passwordConfirm){
  res.render('index');
  // console.log(req.body);
  var newUser = new User({
      userStatus: req.body.userStatus,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
  });
  newUser.save(function(err){
      if (err) throw err;
      
  console.log(newUser.find());
  });
};
});

// Unnecessary but I saw this on stackexchange
//./routes/index.js
//exports.index = function(req, res){
//  res.render('index', { title: 'ejs' });};

module.exports = router;
