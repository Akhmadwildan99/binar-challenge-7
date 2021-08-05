var express = require('express');
const passport = require('../lib/passport');
var router = express.Router();
const api = require('../controllers/apiController');
const restrict = require('../midlewares/restrict')


/* GET users listing. */
router.post('/api/v1/register', api.registerApi);
router.get('/api/v1/allData', restrict, api.show);
router.post('/api/v1/auth', api.login);
router.get('/api/v1/auth/whoami', restrict, api.whoami)
module.exports = router;
