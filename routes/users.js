var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// GET for register

router.get('/register', function(req, res, next){
    res.render('registration', {
  
      // we can change this later so it checks cookies
    });
  });

router.get('/login', function(req, res, next){
  res.render('login', {

    // we can change this later so it checks cookies
  });
});

router.post('/register', function (req, res) {
    var userStatus = req.body.userStatus;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
      var email = req.body.email;
      var username = req.body.username;
      var password = req.body.password;
      var passwordConfirm = req.body.passwordConfirm;
  
    // Validation
    req.checkBody('userStatus', 'User Status is required').notEmpty();
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('username', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('username', 'Username is required').notEmpty();
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('passwordConfirm', 'Passwords do not match').equals(req.body.password);
  
      var errors = req.validationErrors();
  
      if (errors) {
          res.render('registration', {
              errors: errors
          });
      }
      else {
          //checking for email and username are already taken
          User.findOne({ username: { 
              "$regex": "^" + username + "\\b", "$options": "i"
      }}, function (err, user) {
              User.findOne({ email: { 
                  "$regex": "^" + email + "\\b", "$options": "i"
          }}, function (err, mail) {
                  if (user || mail) {
                      res.render('registration', {
                          user: user
                      });
                  }
                  else {
                      var newUser = new User({
                          userStatus: req.body.userStatus,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              username: req.body.username,
              password: hash
                      });
                      User.createUser(newUser, function (err, user) {
                          if (err) throw err;
                          console.log(user);
                      });
               req.flash('success_msg', 'You are registered and can now login');
                      res.redirect('/login');
                  }
              });
          });
      }
  });
  
  passport.use(new LocalStrategy(
      function (username, password, done) {
          User.getUserByUsername(username, function (err, user) {
              if (err) throw err;
              if (!user) {
                  return done(null, false, { message: 'Unknown User' });
              }
  
              User.comparePassword(password, user.password, function (err, isMatch) {
                  if (err) throw err;
                  if (isMatch) {
                      return done(null, user);
                  } else {
                      return done(null, false, { message: 'Invalid password' });
                  }
              });
          });
      }));
  
  passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    
  passport.deserializeUser(function (id, done) {
      User.getUserById(id, function (err, user) {
        done(err, user);
      });
    });
  
  router.post('/login',
      passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
      function (req, res) {
      res.render('index', {data: JSON.parse(fs.readFileSync(indexpicspath))["pics"]});
      });
  
  router.get('/logout', function (req, res) {
      req.logout();
  
      req.flash('success_msg', 'You are logged out');
  
      res.redirect('/login');
  });
  
  module.exports = router;