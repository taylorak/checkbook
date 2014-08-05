var express = require('express');
var auth = require('../lib/middleware/auth');
var router = express.Router();


router.route('/')

    /* GET home page. */
    .get(auth, function(req, res, next) {
        res.render('index', { title: 'Checkbook', balance: 500 });
    })

    .post(auth, function(req, res, next) {
        
        res.redirect('/');
    })

module.exports = router;
