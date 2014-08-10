var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var messages = require('./lib/messages');
var sqlite3 = require('sqlite3').verbose();
//var fs = require('fs');

/**if(!fs.existsSync('db')) {
    fs.mkdirSync('db');
}
**/
var db = new sqlite3.Database('db/sqlite.db');

var routes = require('./routes/index');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('partials', {messages: 'partials/messages', navbar: 'partials/navbar'});
app.engine('html', require('hogan-express'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'keyboard cat'
}));
app.use(csrf());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(messages);
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use('/login', login);
app.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        console.log("session destroyed");
        res.redirect('/login');
    })
})
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
