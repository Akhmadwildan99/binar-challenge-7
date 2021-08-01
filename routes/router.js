var express = require('express');
var router = express.Router();
const pages = require('../controllers/pageController')

/* GET home page. */
router.get('/', pages.home);
router.get('/register', pages.register);

module.exports = router;
