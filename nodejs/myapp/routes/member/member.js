var express = require('express');
var router = express.Router();
var db     = require('../../db/dbconnection');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var useragent = require('useragent');

router.get('/', function(req, res, next) {
    console.log(useragent.parse(req.headers['user-agent']));
    console.log(useragent.is(req.headers['user-agent']));
    res.send('member respond with a resource');
});

router.get('/loginview', function(req, res, next) {
    // db.dbconnection().query('SELECT * FROM project2019.member;', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results);
    // });
    
    res.render('./member/login');
});
  
router.post('/loginview', function(req, res, next) {
    // db.dbconnection().query('SELECT * FROM project2019.member;', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results);
    // });
    
    res.render('./member/login');
});

router.post('/login', function(req, res, next) {
    /* look at the 2nd parameter to the below call */
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.redirect('/member/loginview'); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            var isAndroid = false;
            console.log(useragent.is(req.headers['user-agent']));
            if (useragent.is(req.header['user-agent']).android) {
                isAndroid = true;
            }
            if (isAndroid) {
                res.send(JSON.stringify(req.user));
            }
            console.log(JSON.stringify(req.user));
            return res.redirect('/');
        });
    })(req, res, next);
});

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
            // res.redirect('/member/loginview');
            // res.render('./member/login', {username: req.body.username, password: req.body.password});
            var user = {
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            }
            req.login(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/');
            });
        }
    });
});

module.exports = router;
  