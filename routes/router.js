var express = require('express');
var router = express.Router();
const pages = require('../controllers/pageController');
const logic = require('../controllers/logicController');
const restrict = require('../midlewares/restrict');



/* GET method */
router.get('/', pages.home);
router.get('/register', pages.register);
router.get('/loginAdmin', pages.loginAdmin);
router.get('/loginUser', pages.loginUser);
router.get('/dashboard', pages.dashboard);
router.get('/game', pages.games);
router.get('/delete/data/:id', logic.delete);
router.get('/update/data/:id', pages.update);
router.post('/update/data/:id', logic.updateData);
router.post('/register/data', logic.register);
router.post('/login', logic.loginAdmin);
router.post('/loginUser', logic.loginUser);


module.exports = router
