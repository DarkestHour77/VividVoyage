const express = require('express');
const { login, signup } = require('../Controllers/AuthController');
// const { LoginData } = require('../Controllers/LoginController');
// const AuthenticateUser = require('../Middleware/Authmiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);



module.exports = router;