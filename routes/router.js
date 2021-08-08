var express = require('express');
var router = express.Router();
const pages = require('../controllers/pageController');
const logic = require('../controllers/logicController');
const restrict = require('../midlewares/restrict');
const passport = require('../lib/passport')



/* GET method */
router.get('/', pages.home);
router.get('/register', pages.register);
router.get('/loginAdmin', pages.loginAdmin);
router.get('/loginUser', pages.loginUser);
router.get('/dashboard', pages.dashboard);
router.post('/register/data', logic.register);
router.post('/login', 
passport.authenticate('local',{ 
    successRedirect: '/',
    failureRedirect: '/dashboard',
    failureFlash: true 
}));

module.exports = router;
