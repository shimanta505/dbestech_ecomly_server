const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controller');

const {body} = require('express-validator');

const validateUser = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('please enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('password must be at least 8 characters')
    .isStrongPassword().withMessage('password must be contain at least one uppercase,one lowercase and one sybbol'),
    body('phone').isMobilePhone().withMessage('please enter a valid phone number')
];

router.post('/login', authController.login);

router.post('/register',validateUser, authController.register);

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