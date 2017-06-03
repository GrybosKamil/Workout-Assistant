(function () {

    const mongoose = require('../config/db.connection');
    const crypto = require('crypto');
    const jwt = require('jsonwebtoken');
    const Schema = mongoose.Schema;

    const JWT_USER_SECRET = require('../config/environment').JWT_USER_SECRET;

    const User = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        privileges: {
            type: String,
            enum: ['NONE', 'MODERATOR', 'ADMINISTRATOR'],
            default: 'NONE'
        },
        hash: String,
        salt: String
    });

    User.methods.hasNone = function () {
        return this.privileges === 'NONE';
    };

    User.methods.hasModerator = function () {
        return this.privileges === 'MODERATOR';
    };

    User.methods.hasAdministrator = function () {
        return this.privileges === 'ADMINISTRATOR';
    };

    User.methods.setPassword = function (password) {
        this.salt = crypto.randomBytes(16)
            .toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
            .toString('hex');
    };

    User.methods.validPassword = function (password) {
        let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
            .toString('hex');
        return this.hash === hash;
    };

    User.methods.generateJwt = function () {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
            exp: parseInt(expiry.getTime() / 1000),
        }, JWT_USER_SECRET);
    };

    module.exports = mongoose.model('User', User);

})();