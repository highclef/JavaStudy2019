var express = require('express');
var router = express.Router();
var db     = require('../../db/dbconnection');

router.get('/', function(req, res, next) {
    res.send('member respond with a resource');
});

router.post('/loginview', function(req, res, next) {
    db.dbconnection().query('SELECT * FROM project2019.member;', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    
    res.render('./member/login');
});
  
router.post('/login', function(req, res, next) {
    res.send(`try to login ${req.body.username} : ${req.body.password}`);
});

module.exports = router;
  