(function () {

    const passport = require("passport");
    const passportJWT = require("passport-jwt");

    const ExtractJwt = passportJWT.ExtractJwt;

    // const LocalStrategy = require('passport-local').Strategy;
    const Strategy = passportJWT.Strategy;
    const User = require('../models/user');
    const Environment = require('./environment');

    const params = {
        secretOrKey: Environment.JWT_USER_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    // const config = function (username, password, done) {
    //     User.findOne({username: username})
    //         .then((user) => {
    //             if (!user) {
    //                 return done(null, false, {
    //                     message: 'User not found'
    //                 });
    //             }
    //
    //             if (!user.validPassword(password)) {
    //                 return done(null, false, {
    //                     message: 'Password is wrong'
    //                 });
    //             }
    //
    //             return done(null, user);
    //         })
    //         .catch((error) => {
    //             return done(error);
    //         });
    //
    // };

    // const config = function () {
    //     let strategy = new Strategy(params, function (payload, done) {
    //         // let user = users[payload.id] || null;
    //         User.findOne({_id: payload.id})
    //             .then((user) => {
    //                 if (!user) {
    //                     // return done(null, false, {
    //                     //     message: 'User not found'
    //                     // });
    //                     return done(new Error("User not found"), null);
    //                 }
    //
    //                 return done(null, user);
    //             })
    //     });
    //     passport.use(strategy);
    //     return {
    //         initialize: function () {
    //             return passport.initialize();
    //         },
    //         authenticate: function () {
    //             return passport.authenticate("jwt", Environment.JWT_SESSION);
    //         }
    //     };
    //
    // };

    // module.exports = new LocalStrategy({usernameField: ' username'}, config);

    module.exports = function () {
        let strategy = new Strategy(params, function (payload, done) {
            // console.log(payload);
            User.findOne({_id: payload._id})
                .then((user) => {
                    if (!user) {
                        // return done(null, false, {
                        //     message: 'User not found'
                        // });
                        return done(new Error("User not found"), null);
                    }

                    return done(null, user);
                })
        });
        passport.use(strategy);
        return {
            initialize: function () {
                return passport.initialize();
            },
            authenticate: function () {
                return passport.authenticate("jwt", Environment.JWT_SESSION);
            }
        };
    };

})();