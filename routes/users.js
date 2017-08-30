var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Set up Mongoose schema
var Users = require('../models/users');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

// This route just renders the login page
userRouter.get('/login', function(req, res, next) {
  res.render('../public/login');
});

// This route just renders the signup page
userRouter.get('/signup', function(req, res, next) {
  res.render('../public/signup');
});

userRouter.route('/signup/data')
          .post(function(req, res, next) {
            Users.create({email: req.body.email, password: req.body.password, pollsCreated: req.body.pollsCreated}, function(err, poll) {
              if (err) throw err;
              res.send({redirect: '/polls'});
            });
          });

userRouter.route('/login/data')
          .post(function(req, res, next) {
            console.log(req.body);
            Users.findOne({'user.email': req.body.email}, function(err, user) {
              if (err) throw err;
              if (user) {
                res.send(req.body);
              } else {
                res.send("not working");
              }
            });
          });

module.exports = userRouter;