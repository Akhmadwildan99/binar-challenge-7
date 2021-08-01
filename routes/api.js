var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController');

/* GET users listing. */
router.post('/api/v1/register', api.registerApi)
module.exports = router;
