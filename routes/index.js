var express = require('express');
var auth = require('../lib/middleware/auth');
var router = express.Router();


router.route('/')

    /* GET home page. */
    .get(auth, function(req, res, next) {
        var entries = false;
        var all = 'class=active';
        var stm = "SELECT * FROM checkbook_entry WHERE user_id='"
            + req.session.uid + "' ORDER BY date DESC;";
        console.log(stm);
        req.db.all(stm, function(err, rows) {
            if(err) return next(err);
            if(rows.length > 0) entries = true;
            res.render('index', { title: 'Checkbook', entries: entries, rows: rows, all: all});
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

router.get('/delete/:id', auth, function(req, res, next) {
    var stm = "DELETE FROM checkbook_entry WHERE entry_id='"
        + req.params.id + "';";
    console.log(stm);
    req.db.run(stm,function(err) {
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

    if (req.params.type == "deposit") {
       deposit = 'class=active';
    } else if (req.params.type == "transfer") {
       transfer = 'class=active';
    }else if (req.params.type == "withdraw") {
       withdraw = 'class=active';
    }

    var stm = "SELECT * FROM checkbook_entry WHERE user_id='"
        + req.session.uid + "' AND category='" + req.params.type + "' ORDER BY date DESC;";
    console.log(stm);
    req.db.all(stm, function(err, rows) {
        if(err) return next(err);
        if(rows.length > 0) entries = true;
        res.render('index', { title: 'Checkbook', entries: entries, 
            rows: rows, deposit: deposit, transfer: transfer, withdraw: withdraw });
    });

})

module.exports = router;
