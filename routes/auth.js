const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controller');

router.post('/login',(req,res)=> authController.login());


router.post('/register',(req,res)=>
    authController.register()
);

router.post('/forgot-password',(req,res)=>
    authController.forgotPassword()
);

router.post('/verify-otp',(req,res)=>
    authController.verifyPasswordResetOtp()
);

router.post('/reset-password',(req,res)=>
    authController.resetPassword()
);


//router.get()

module.exports = router;