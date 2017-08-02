var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('../public/login');
});

router.get('/signup', function(req, res, next) {
  // res.set('Content-Type', 'application/javascript');
  res.render('../public/signup');
});

module.exports = router;