(function () {

    const jwt = require('express-jwt');

    const JWT_USER_SECRET = process.env.WORKOUT_ASSISTANT_JWT_USER_SECRET;
    const auth = jwt({
        secret: JWT_USER_SECRET,
        userProperty: 'payload'
    });

    module.exports = {
        JWT_USER_SECRET: JWT_USER_SECRET,
        auth: auth
    };

})();
