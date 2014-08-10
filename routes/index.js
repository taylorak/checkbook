var express = require('express');
var auth = require('../lib/middleware/auth');
var router = express.Router();


router.route('/')

    /* GET home page. */
    .get(auth, function(req, res, next) {
        var entries = false;
        var uid = req.session.uid;
        var all = 'class=active';
        var stm = "SELECT * FROM checkbook_entry WHERE user_id=?  ORDER BY date DESC";
        console.log(stm);
        req.db.all(stm, uid, function(err, rows) {
            if(err) return next(err);
            if(rows.length > 0) entries = true;
            var balance = 0;
            for(var i=0; i < rows.length; i++) {
                rows[i].amount = (rows[i].amount*1.0/100).toFixed(2);
                balance += rows[i].amount
            }
            res.render('index', { title: 'Checkbook', entries: entries, rows: rows, all: all, balance: balance, csrf: req.csrfToken()});
        });
    })

    .post(auth, function(req, res, next) {
        var user_id = req.session.uid;
        var date = new Date().getTime();
        var payee = req.body.payee;
        var amount = (req.body.amount * 100).toFixed(0);
        var memo = req.body.memo;
        var category = req.body.category;

        if(!payee || !amount || !amount || !memo || !category)  {
            res.error("All fields must be filled");
            res.redirect('back');
        } else if(isNaN(amount)) {
            res.error("Amount must be a number");
            res.redirect('back');
        } else {
            var stm = "INSERT INTO checkbook_entry(user_id, date, payee,"
                + " amount, memo, category) VALUES (?, ?, ?, ?, ?, ?)";
            console.log(stm);
            req.db.run(stm, user_id, date, payee, amount, memo, category, function(err) {
                if(err) return next(err);
                res.redirect('back');
            });
        }
    })

router.delete('/delete/:id', auth, function(req, res, next) {
    var entry_id = req.params.id;
    var stm = "DELETE FROM checkbook_entry WHERE entry_id=?";
    console.log(stm);
    req.db.run(stm, entry_id, function(err) {
        if(err) return next(err);
        res.redirect('/');
    });
})

router.get('/:type', auth, function(req, res, next) {
    console.log(req.params.type);

    var deposit;
    var transfer;
    var withdraw;
    var entries = false;
    var uid = req.session.uid;
    var category = req.params.type;

    if (req.params.type == "deposit") {
       deposit = 'class=active';
    } else if (req.params.type == "transfer") {
       transfer = 'class=active';
    }else if (req.params.type == "withdraw") {
       withdraw = 'class=active';
    } else {
        //var err = new Error('Not Found');
        //err.status = 404;
        //next(err);
        next();
    }

    var stm = "SELECT * FROM checkbook_entry WHERE user_id=? AND category=? ORDER BY date DESC;";
    console.log(stm);
    req.db.all(stm, uid, category, function(err, rows) {
        if(err) return next(err);
        if(rows.length > 0) entries = true;
        var balance = 0;
        for(var i=0; i < rows.length; i++) {
            rows[i].amount = (rows[i].amount*1.0/100).toFixed(2);
            balance += rows[i].amount
        }
        res.render('index', { title: 'Checkbook', entries: entries, 
            rows: rows, deposit: deposit, transfer: transfer, withdraw: withdraw, balance: balance, csrf: req.csrfToken()});
    });

})

module.exports = router;
