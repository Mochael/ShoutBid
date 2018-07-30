var express = require('express');
var router = express.Router();

// GET for register
router.get('/register', function(req, res, next){
  res.render('registration', {
    loggedIn: false
    // we can change this later so it checks cookies
  });
});

module.exports = router;
