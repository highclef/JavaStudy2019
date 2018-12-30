var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/member/login', function(req, res, next) {
  res.render('./member/login');
});

module.exports = router;
