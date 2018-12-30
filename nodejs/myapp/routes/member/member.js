var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('member respond with a resource');
});

router.post('/loginview', function(req, res, next) {
    res.render('./member/login');
});
  
router.post('/login', function(req, res, next) {
    res.send(`try to login ${req.body.username} : ${req.body.password}`);
});

module.exports = router;
  