var express = require('express');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { db, } = require('../pgp')
const moment = require('moment')
const User = require('../model/user');
const user = new User(db);

router.route('/signin')
    .get((req, res) => {
        let message = '';
        if (req.session.flash) {
            message = req.session.flash.error.length > 0 ? req.session.flash.error[0] : '';
        }
        req.session.flash = '';
        res.json({
            message: message
        })
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/users/signin',
        failureFlash: true
    }), (req, res) => {
        res.json({ msg: 'Sign in success' })
    });

router.get('/private', (req, res) => {
    console.log(req.session)
    if (req.isAuthenticated()) {
        res.send('Đã login')
    } else {
        res.send('Chưa login')
    }
});

router.post('/signup', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (password[0] !== password[1]) {
        res.json({ msgErr: 'incorrect password' })
    } else {
        user.selectUser(email)
            .then(data => {
                if (data === null) {
                    bcrypt.hash(password[0], 5, function(err, hash) {
                        user.addUser(email, hash)
                            .then(() => {
                                req.session.email = email;
                                res.json({ msg: 'Sign up success' })
                                console.log(req.session);
                            })
                            .catch(err => {
                                res.json({ msgErr: err.message })
                            })
                    })
                } else {
                    res.json({ msgErr: 'Email exist' })
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }
})

router.get('/logout', (req, res) => {
    delete req.session.destroy();
    res.redirect('/')
})


module.exports = router;