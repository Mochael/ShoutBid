var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

router.post("/register", function(req, res){
  var userStatus = req.body.userStatus;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;

  var newUser = new User();
  newUser.userStatus = userStatus;
  newUser.email = email;
  newUser.username = username;
  newUser.password = password;
  newUser.passwordConfirm = passwordConfirm;
  
  if(err){
    console.log(err);
    return res.status(500).send();
  }
  return res.status(200).send();

})



// Unnecessary but I saw this on stackexchange
//./routes/index.js
//exports.index = function(req, res){
//  res.render('index', { title: 'ejs' });};

