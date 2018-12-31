var express = require('express');
var router = express.Router();

router.get('/member/login', function(req, res, next) {
    res.render('./member/login');
});
  
module.exports = router;
  