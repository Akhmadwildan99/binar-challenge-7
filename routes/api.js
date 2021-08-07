var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController');
const restrictJwt = require('../midlewares/restrictJwt')


/* GET users listing. */
router.post('/api/v1/register', api.registerApi);
router.get('/api/v1/allData', api.show);
router.post('/api/v1/auth', api.login);
router.get('/api/v1/auth/whoami', restrictJwt, api.whoami)
module.exports = router;
