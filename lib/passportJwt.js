const passport = require('passport');
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt' )


const {user_game} = require('../models');
// JWT strategy
const options = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : 'secret' ,
}

passport.use(new JwtStrategy(options, async (payload, done) => {
user_game.findByPk (payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false, {message: err.message}))
}));

module.exports = passport