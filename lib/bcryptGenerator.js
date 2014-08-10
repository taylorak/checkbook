var bcrypt = require('bcrypt');

/**
 * generates a salt and password from command line input
 * ex. node bcryptGenerator.js password
 * will hash the word password with a 12 character long salt
 */
bcrypt.genSalt(12, function(err, salt) {
    if (err) console.err("unable to create salt");
    bcrypt.hash(process.argv[2], salt, function(err, hash) {
        if (err) console.error("unable to hash password");
        console.log(salt);
        console.log(hash);
    })
});
