const bcrypt = require('bcrypt');
const { db, config } = require('../pgp');
class User {
    constructor(db) {
        this.db = db;
    }

    selectUser(email) {
        return this.db.oneOrNone('SELECT * FROM users WHERE email = $1', [email])
    }
    addUser(email, hashPass) {
        return this.db.one('INSERT INTO users (email, password) VALUES($1, $2) RETURNING email, password', [email, hashPass])
    }
}
module.exports = User;