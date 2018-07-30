var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next){
    res.render('login', {
      loggedIn: false
      // we can change this later so it checks cookies
    });
  });

module.exports = router;
