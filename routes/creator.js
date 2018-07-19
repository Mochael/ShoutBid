var express = require('express');
var router = express.Router();

/* GET creator page. */
router.get('/creator', function(req, res, next) {
  res.render('creator');
});

module.exports = router;
