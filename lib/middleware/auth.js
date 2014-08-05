module.exports = function restrict(req, res, next) {
    var uid = req.session.uid;
    if (!uid) {
        res.redirect('/login');
    } else {
        var stm = "SELECT username FROM user WHERE "
            + "user_id='" + uid + "'";
        console.log(stm);
        req.db.get(stm, function(err, row) {
            if (err) return next(err);
            if(row) {
                res.locals.username = row.username;
                next();
            } else {
                res.redirect('/login');
            }
        });
    }
};

