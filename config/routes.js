var router = require('express').Router();
var usersController = require('../controllers/users');

//Signup
router.post('/signup', usersController.signUp);

//Login
router.get('/login/:user', usersController.login);

//Send Email
router.post('/sendEmail', usersController.sendEmail);

module.exports = router;
