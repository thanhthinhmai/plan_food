var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks')
const validator = require('express-validator');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
})

app.use('/', express.static(path.join(__dirname, 'public')));

app.engine('html', nunjucks.render)
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mimixautinh',
    cookie: {
        max: 86400000
    },
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
require('./passport/passport')(passport)
require('./passport/local/passport-local')(passport)

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.login = true;
        req.session.email = req.user;
    } else {
        req.session.login = false;
        req.session.email = {};
        // console.log(req.session);
    }
    next();
});


app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;