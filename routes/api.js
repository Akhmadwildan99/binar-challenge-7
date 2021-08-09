var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController');
const restrictJwt = require('../midlewares/restrictJwt')


/* GET & POST users listing. */
router.post('/api/v1/register', api.registerApi);
router.get('/api/v1/allData', api.show);
router.get('/api/v1/userHistory', api.history);
router.post('/api/v1/auth', api.login);
router.get('/api/v1/auth/whoami', restrictJwt, api.whoami);
router.post('/api/v1/generate/room', restrictJwt, api.generateRoom);
router.post('/api/v1/join/room/:id', restrictJwt, api.joinRoom);
router.post('/api/v1/fight/room/:id', restrictJwt, api.fight);
router.post('/api/v1/result/room/:id', restrictJwt, api.result);

module.exports = router;
