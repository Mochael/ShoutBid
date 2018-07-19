var express = require('express');
var router = express.Router();

// GET for register
router.get('/register', function(req, res, next){
  res.render('registration');
});

module.exports = router;
