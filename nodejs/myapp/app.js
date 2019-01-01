var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session  = require('express-session');
var FileStore = require('session-file-store')(session);
var flash    = require('connect-flash');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var db     = require('./db/dbconnection');
var useragent = require('useragent');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberRouter = require('./routes/member/member');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret: 'deutschstudy2018',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  console.log(user);
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  console.log('deserializeUser');
  console.log(user);
  // console.log(id);
  done(null, user);
});

passport.use(new LocalStrategy({
  passReqToCallback : true
},
  function(req, username, password, done) {
    console.log('username : ' + username);
    console.log('password : ' + password);
  db.dbconnection().query('SELECT * FROM project2019.member where username=? and password = ?;',
  [username, password],
  function (error, results, fields) {
    if (error) {
      return done(null, false);
      // throw error;
    } else {
      if (results.length <= 0) {
        return done(null, false);
      }
      if (results[0].username === username && results[0].password === password) {
        req.flash('message', `${results[0].username} is login success!`);
        return done(null, results[0]);
      }  
    }
  });
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member', memberRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.url);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
