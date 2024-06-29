const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        if (jwt_payload) return done(null, jwt_payload);
        else return done(null, false);
    }));
}