const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');

// GET register form
router.get('/register', auth_controller.getRegister);

// POST register
router.post('/register', auth_controller.postRegister);

// GET login form
router.get('/login', auth_controller.getLogin);

// POST login
router.post('/login', auth_controller.postLogin);

// GET forgot password form
router.get('/forgot', auth_controller.getForgot);

// POST forgot password
router.post('/forgot', auth_controller.postForgot);

// POST logout
router.post('/logout', auth_controller.logout);

module.exports = router;
