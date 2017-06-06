(function () {

    const LocalStrategy = require('passport-local').Strategy;
    const User = require('../../models/user');

    const config = function (username, password, done) {
        User.findOne({username: username})
            .then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }

                if (!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }

                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Password is wrong'
                    });
                }

                return done(null, user);
            })
            .catch((error) => {
                return done(error);
            });

    };

    module.exports = new LocalStrategy({usernameField: ' username'}, config);

})();