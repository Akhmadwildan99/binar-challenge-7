var express = require('express');
var router = express.Router();
const pages = require('../controllers/pageController');
const logic = require('../controllers/logicController');

/* GET method */
router.get('/', pages.home);
router.get('/register', pages.register);
router.get('/loginAdmin', pages.loginAdmin);
router.get('/loginUser', pages.loginUser);
router.post('/register/data', logic.register);

module.exports = router;
