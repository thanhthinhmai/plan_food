const LocalStratery = require('passport-local').Strategy;
const { db, } = require('../pgp');

module.exports = function(passport) {
    // Sử dụng khi người dùng đăng nhập vào phiên làm việc lần đầu
    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(user, done) {
        db.one('SELECT * FROM users WHERE email =$1', user)
            .then(data => {
                done(null, data.email)
            })
            .catch(err => {
                done(null, err)
            })
    })

}