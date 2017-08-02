var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('../public/polls');
});

router.get('/:id', function(req, res, next) {
  // res.set('Content-Type', 'application/javascript');
  res.end('Will send details of poll number ' + req.params.id + ' to you');
});

module.exports = router;