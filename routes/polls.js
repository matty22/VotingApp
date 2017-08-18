var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Set up Mongoose schema
var Polls = require('../models/polls');

var pollRouter = express.Router();
pollRouter.use(bodyParser.json());

// Route to render polls.html page
pollRouter.get('/', function(req, res, next) {
  res.render('../public/polls');
});

// Route for client JS to hit to retrieve data
pollRouter.route('/data')
          // Method to get all polls
          .get(function(req, res, next) {
            Polls.find({}, function(err, poll) {
              if (err) throw err;
              res.json(poll);
            });
          })
          // Method to create new poll
          .post(function(req, res, next) {
            Polls.create(req.body, function(err, poll) {
              if (err) throw err;
              // FINISH POST METHOD HERE
            });
          });

// Route to just render poll.html page
pollRouter.get('/:id', function(req, res, next) {
  res.render('../public/poll');
});

// Routes for client JS to hit to perform actions
pollRouter.route('/:id/data')
          // Method to get individual poll
          .get(function(req, res, next) {
            Polls.findById(+req.params.id, function(err, poll) {
              if (err) throw err;
              res.json(poll);
            });
          })
          // Method to edit individual poll
          .put(function(req, res, next) {
              //FINISH PUT METHOD HERE
              Polls.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, function(err, poll) {
                if (err) throw err;
                res.json(poll);
              });
          })
          // Method to delete individual poll
          .delete(function(req, res, next) {
            Polls.findByIdAndRemove(req.params.id, function(err, resp) {
              if (err) throw err;
              res.json(resp);
            });
          });

module.exports = pollRouter;