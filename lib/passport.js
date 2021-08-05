const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const {user_game} = require('../models');

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret' ,
}

passport.use(new JwtStrategy (options, async (payload, done) => {
user_game.findByPk (payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false))
}));

module.exports = passport
