var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var logined = false;
  var loginId = '';
  if (req.user) {
    logined = true;
    loginId = req.user.username;
    loginId += ' : ';
    // console.log('username : ' + req.user.username);
  }
  // console.log('logined : ' + logined);
  // console.log('user : ' + req.user)
  res.render('index', {
    message:req.flash('message'), 
    loginId: loginId, 
    title: 'Express', 
    isLogined:logined });
});

module.exports = router;
