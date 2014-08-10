var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

router.route('/')

    /* GET home page. */
    .get(function(req, res, next) {
        res.render('login', { title: 'Login', csrf: req.csrfToken() });
    })

    .post(function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if(!email || !password) {
            res.error("All fields must be filled");
            res.redirect('back');
        } else {
            //var stm = "SELECT user_id FROM user WHERE email=? AND password=?" 
            var stm = "SELECT * FROM user WHERE email=?" 
            console.log(stm);
            req.db.get(stm, email, function(err, row) {
                if (err) return next(err);
                if(!row) {
                    res.error("Invalid credentials!");
                    res.redirect('back');
                } else {
                    bcrypt.hash(password, row.salt, function(err, hash) {
                        console.log("finished hashing");
                        if(err) return next(err);
                        if(hash == row.password) {
                            req.session.uid = row.user_id;
                            res.redirect('/');
                        }
                    });
                }
                //if(row) {
                    //for(var key in row) {
                        //console.log(row[key]);
                        //console.log(key);
                    //}
                    //req.session.uid = row.user_id;
                    //res.redirect('/');
                //} else {
                    //res.error("Invalid credentials!");
                    //res.redirect('back');
                //}
            });
        }
    })

module.exports = router;
