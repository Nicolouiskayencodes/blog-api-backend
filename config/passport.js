const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
}

passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
  //change to grab from database
    if (jwt_payload.username === "nico") {
        return done(null, true)
    }
    return done(null, false)
}) )