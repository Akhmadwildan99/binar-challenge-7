const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy,
//       ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const {user_game} = require('../models');



async function authenticate(username, password, done) {
    try {
        const user = await user_game.authenticate({username, password});
        return done(null, user)
    } catch (err) {
        return done(null, false, {message: err.message})
    }
}

passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticate))


passport.serializeUser(
(user, done) => done(null, user.id)
)
passport.deserializeUser(
async (id, done) => done(null, await user_game.findByPk(id))
)

module.exports = passport


// // JWT strategy
// const options = {
//     jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey : 'secret' ,
// }

// passport.use(new JwtStrategy (options, async (payload, done) => {
// user_game.findByPk (payload.id)
//     .then(user => done(null, user))
//     .catch(err => done(err, false, {message: err.message}))
// }));


