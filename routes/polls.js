var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Set up Mongoose schema
var Polls = require('../models/polls');

var pollRouter = express.Router();
pollRouter.use(bodyParser.json());
pollRouter.route('/')
          .get(function(req, res, next) {
            Polls.find({}, function(err, poll) {
              if (err) throw err;
              res.json(poll);
            });
          });

pollRouter.route('/:id')
          .get(function(req, res, next) {
            Polls.findById(+req.params.id, function(err, poll) {
              if (err) throw err;
              res.render('../public/poll', {data: poll});
            });
          })
          .delete(function(req, res, next) {
            Polls.findByIdAndRemove(req.params.id, function(err, resp) {
              if (err) throw err;
              res.json(resp);
            });
          });

// This needs finished
pollRouter.route('/add')
          .post(function(req, res, next) {
            Polls.create(req.body, function(err, dish) {
              if (err) throw err;
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('Added the poll with id: ' + req.body._id);
            });
          });







// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('../public/polls');
// });

// router.get('/:id', function(req, res, next) {
//   // res.set('Content-Type', 'application/javascript');
//   res.end('Will send details of poll number ' + req.params.id + ' to you');
// });

module.exports = pollRouter;