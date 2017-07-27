var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('polls');
});

router.get('/:id', function(req, res, next) {
  // res.set('Content-Type', 'application/javascript');
  var id = req.params.id;
  console.log(id);
  res.render('poll', { id: id });
});

module.exports = router;