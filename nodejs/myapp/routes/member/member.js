var express = require('express');
var router = express.Router();
var db     = require('../../db/dbconnection');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res, next) {
    res.send('member respond with a resource');
});

router.post('/loginview', function(req, res, next) {
    // db.dbconnection().query('SELECT * FROM project2019.member;', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results);
    // });
    
    res.render('./member/login');
});
  
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.post('/registerview', function(req, res, next) {
    res.render('./member/register', {error: req.flash('error')});
});

router.post('/updateview', function(req, res, next) {
    res.render('./member/update', {nameValue: req.user.name, usernameValue: req.user.username});
});

router.post('/register', function(req, res, next) {
    console.log(req.body.name);
    console.log(req.body.username);
    console.log(req.body.password);

    db.dbconnection().query(`INSERT INTO project2019.member (name, username, password, created) VALUES (?, ?, ?, ?);`,
    [req.body.name, req.body.username, req.body.password, new Date()], 
    function (error, results, fields) {
        if (error) {
            // alert("register fail!!")
            // throw error;
            req.flash('error', 'register fail!');
            res.render('./member/register', {error: req.flash('error')});
            return false;
        } else {
            // req.flash("message", 'register sucess!');
            // res.redirect('/');
            //console.log(results);
            // alert("register sucess!!")
            res.redirect('/member/loginview');
            // res.render('./member/login', {username: req.body.username, password: req.body.password});
        }
    });
});

module.exports = router;
  