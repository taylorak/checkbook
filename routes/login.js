var express = require('express');
var sha1 = require('sha1');
var router = express.Router();

router.route('/')

    /* GET home page. */
    .get(function(req, res, next) {
        res.render('login', { title: 'Login' });
    })

    .post(function(req, res, next) {
        var stm = "SELECT user_id FROM user WHERE email='" 
            + req.body.email + "' AND password='" 
            + sha1(req.body.password) + "'";
        console.log(stm);
        req.db.get(stm, function(err, row) {
            if (err) return next(err);
            if(row) {
                req.session.uid = row.user_id;
                res.redirect('/');
            } else {
                res.error("Invalid credentials!");
                res.redirect('back');
            }
        });
    })

module.exports = router;
