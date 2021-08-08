const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');





const router = require('./routes/router');
const api = require('./routes/api');
const room = require('./routes/room')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secret'));// Konfigurasi flash
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

app.use(router);
app.use(api);
app.use(room);

const passport = require('./lib/passport');
const passportJwt = require('./lib/passportJwt');
app.use(passportJwt.initialize())
app.use(passport.initialize());
app.use(passport.session())


// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
