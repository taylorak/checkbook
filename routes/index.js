var express = require('express');
var auth = require('../lib/middleware/auth');
var router = express.Router();


router.route('/')

    /* GET home page. */
    .get(auth, function(req, res, next) {
        var all = 'class=active';
        var stm = "SELECT payee, amount, memo, category FROM checkbook_entry WHERE user_id='"
            + req.session.uid + "'";
        console.log(stm);
        req.db.all(stm, function(err, rows) {
            if(err) return next(err);
            res.render('index', { title: 'Checkbook', rows: rows, all: all});
        });
    })

    .post(auth, function(req, res, next) {
        var user_id = req.session.uid;
        var date = new Date().getTime();
        var payee = req.body.payee;
        var amount = (req.body.amount * 100).toFixed(0);
        var memo = req.body.memo;
        var category = req.body.category;
        var stm = "INSERT INTO checkbook_entry(user_id, date, payee,"
            + " amount, memo, category) VALUES (" + user_id + ", "
            + date + ", '" + payee + "', " + amount + ", '"
            + memo + "', '" + category + "');";
        console.log(stm);
        req.db.run(stm);
        res.redirect('back');
    })

router.get('/:type', auth, function(req, res, next) {
    console.log(req.params.type);
    var deposit;
    var transfer;
    var withdraw;
    if (req.params.type == "deposit") {
       deposit = 'class=active';
    } else if (req.params.type == "transfer") {
       transfer = 'class=active';
    }else if (req.params.type == "withdraw") {
       withdraw = 'class=active';
    }
    console.log(deposit);
    console.log(transfer);
    console.log(withdraw);


    var stm = "SELECT * FROM checkbook_entry WHERE user_id='"
        + req.session.uid + "' AND category='" + req.params.type + "'";
    console.log(stm);
    req.db.all(stm, function(err, rows) {
        if(err) return next(err);
        res.render('index', { title: 'Checkbook-' + req.params.type, rows: rows, deposit: deposit, transfer: transfer, withdraw: withdraw });
    });

})

module.exports = router;
