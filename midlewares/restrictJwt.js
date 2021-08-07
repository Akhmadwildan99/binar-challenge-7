const passporJwt = require('../lib/passportJwt')
module.exports = passporJwt.authenticate('jwt', {
    session: false
})

