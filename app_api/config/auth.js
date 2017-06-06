(function () {

    const passport = require("passport");
    const passportJWT = require("passport-jwt");

    const ExtractJwt = passportJWT.ExtractJwt;

    const Strategy = passportJWT.Strategy;
    const User = require('../models/user');
    const Environment = require('./environment');

    const params = {
        secretOrKey: Environment.JWT_USER_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    module.exports = function () {

        const strategy = new Strategy(params, function (payload, done) {
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