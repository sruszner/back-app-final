const express = require('express');
const router = express.Router();
const ResetPassword = require('../controllers/resetPasswordController');

router.post('/', ResetPassword.handleResetPassword);

module.exports = router;