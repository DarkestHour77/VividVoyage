const express = require('express');
const { LoginData } = require('../Controllers/LoginController');
const AuthenticateUser = require('../Middleware/Authmiddleware');

const router = express.Router();

router.post('/login', AuthenticateUser,LoginData);


module.exports = router;