var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    // console.log(Object.keys(req.body));
    res.render('index');
    if (Object.keys(req.body).length == 7){
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
            // console.log(newUser.find());
        });
    }
});

// Unnecessary but I saw this on stackexchange
//./routes/index.js
//exports.index = function(req, res){
//  res.render('index', { title: 'ejs' });};

module.exports = router;
