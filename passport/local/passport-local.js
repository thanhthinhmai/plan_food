const { db, } = require('../../pgp');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'em',
        passwordField: 'pwd'
    }, function(em, pwd, done) {
        db.one('SELECT * FROM users WHERE email = $1', em)
            .then(data => {
                if (data) {
                    bcrypt.compare(pwd, data.password, function(err, res) {
                        if (err) return done(err.message);

                        if (res) return done(null, data.email);

                        return done(null, false, { message: 'Incorrect password.' });
                    });
                } else {
                    return done(null, false, { message: 'Incorrect email.' })
                }
            })
            .catch(error => {
                return done(null, false, { message: 'Incorrect email.' })
            })
    }));
}