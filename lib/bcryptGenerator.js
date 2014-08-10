var bcrypt = require('bcrypt');

bcrypt.genSalt(12, function(err, salt) {
    if (err) console.err("unable to create salt");
    bcrypt.hash(process.argv[2], salt, function(err, hash) {
        if (err) console.error("unable to hash password");
        console.log(process.argv[2]);
        console.log(salt);
        console.log(hash);
    })
});
