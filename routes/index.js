var express = require('express');
var fs = require('fs');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var router = express.Router();

const indexpicspath = './public/data/indexpics.json';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    data: JSON.parse(fs.readFileSync(indexpicspath))["pics"],
    loggedIn: false
    // we can change this later so it checks cookies
  });
});

router.post('/', function(req, res, next) {
  // console.log(Object.keys(req.body));
  // do we need to check if passwords match here? bc if they dont, they
  // are already stopped by filledout.js. just some thoughts
  if (Object.keys(req.body).length == 2){ //sees if there is a username and password
    User.findOne({username: req.body.username}, function(err, user){
      if (err) throw err;
      if (!user) res.render('login', {incorrect: 'incorrect credentials', loggedIn: false});
      else{
        bcrypt.compare(req.body.password, user.password, function(err, valid){
          //cant call this res again.. we need to render in here, renamed to valid
          if (valid) {
            res.render('index', {
              data: JSON.parse(fs.readFileSync(indexpicspath))["pics"],
              loggedIn: true
            });
          } else res.render('login', {incorrect: 'incorrect credentials', loggedIn: false});
        });
      }
    });
  }
  else if (Object.keys(req.body).length == 7 && req.body.password == req.body.passwordConfirm){
    bcrypt.hash(req.body.password, 10, function(err, hash){
      if (err) throw err;
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
      res.render('index', {
        data: JSON.parse(fs.readFileSync(indexpicspath))["pics"],
        loggedIn: true
      });
    });
  }else{
    res.render('index', {
      data: JSON.parse(fs.readFileSync(indexpicspath))["pics"],
      loggedIn: false
    });
  }
});

/*
  one thing i wanted to say michael, is you can only have ONE get and ONE post
  request per url... in this case, when there is a get request to
  localhost:3000/ then it will not know whether to run the code you have below,
  or the code you have on top.
  also, if u make this a get request, the request url will show on top.. so if
  u uncomment this, comment out the other GET request, AND change the login
  form in login.ejs to "get" instead of "post", you will see how the url
  will show the request LMAO and u dont wanna show ur password in the url
*/

// router.get("/", function(req, res, next){
//   res.render('index', {
//     data: JSON.parse(fs.readFileSync(indexpicspath))["pics"]
//   });
//   if (Object.keys(req.body).length == 2){ //sees if there is a username and password
//     User.findOne({username: req.body.username}, function(err, user){
//       if (err) throw err;
//       else if (!user) console.log("No user found");
//       else{
//         bcrypt.compare(req.body.password, user.password, function(err,res){
//           if (res) {
//             console.log("Found user");
//           }
//         });
//       }
//     });
//   }
// });

// Unnecessary but I saw this on stackexchange
//./routes/index.js
//exports.index = function(req, res){
//  res.render('index', { title: 'ejs' });};

module.exports = router;
