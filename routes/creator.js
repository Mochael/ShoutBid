var express = require('express');
var router = express.Router();

/* GET creator page. */
router.get('/creator', function(req, res, next) {
  res.render('creator', {
    loggedIn: false
    // we can change this later so it checks cookies
  });
});

module.exports = router;
