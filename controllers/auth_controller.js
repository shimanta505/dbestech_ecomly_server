const express = require('express');

const {validationResult} = require('express-validator');
const {User} = require('../models/user');
const {Token} = require('../models/token')
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const mailSender = require('../helpers/email_sender');

exports.login =async function(req,res){
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(404).json({message: `user not found \n check your email and try again.`});
        }
         if(!bcrypt.compareSync(password,user.passwordHash)){
           return res.status(400).json({message: 'incorrect password'});
        }

        const accessToken = jwt.sign(
            {id: user.id,isAdmin: user.isAdmin},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '24h'},
        );

        const refreshToken = jwt.sign({id: user.id,isAdmin: user.isAdmin},  
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '60d'},
        );

        const token = await Token.findOne({userId: user.id});

        if(token) await token.deleteOne();

        await new Token({
            userId: user.id,
            accessToken,
            refreshToken: refreshToken
        }).save();

        user.passwordHash = undefined;
        return res.json({...user._doc,accessToken})

    }catch(error){
        console.log('JWT_SECRET:', process.env.REFRESH_TOKEN_SECRET);

        return res.status(500).json({type: error.name,message: error.message});
    }
};

exports.register = async function(req,res){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        const errorMessages = errors.array().map((error)=> 
        ({field: error.path,message: error.message})
        );
        return res.status(400).json({errors: errorMessages});
    }
    else {
        try{
            let user = new User({...req.body,passwordHash: bcrypt
                .hashSync(req.body.password, 8)});
           user = await user.save();
           if(!user){
            return res.status(500).json({type: 'Internal Server Error',
                message: 'couldnot created a new user '
            });
           }
           return res.status(201).json(user);
        }catch(error){
            if(error.message.includes('email_1 dup key')){
                return res.status(409).json({
                    type: 'AuthError',
                    message: 'user with that email already exists'
                });
            }
            return res.status(500).json({type: error.name,message: error.message});
        }
    }
};

exports.verifyToken = async function(req,res) {
    try{
        const accessToken = req.headers.Authorization;

        if(!accessToken) return res.json(false);
        accessToken = accessToken.replace('Bearer','').trim();

        const token = await Token.findOne({accessToken});
        if(!token) return res.json(false);

        const tokenData = jwt.decode(token.refreshToken);

        const user = await User.findById(tokenData.id);

        if(!user) return res.json(false);

        const isValid = jwt.verify(token.refreshToken,process.env.REFRESH_TOKEN_SECRET);

        if(!isValid) return res.json(false);
        return res.json(true);
    }catch(error){

    }
}
exports.forgotPassword = async function(req,res){

    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: 'User with that email doesnot exist'});
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = Date.now() + 600000;

        await user.save();

        const response = await mailSender.sendMail(email,'password reset otp',`your otp for reset password is: ${otp}`);
        if(response.status === 200){
            return res.status(200).json({message: 'password reset otp sent to your email'});
        }else{
        return res.status(200).json({response});
        }
        
    }catch(error){
        return res.status(500).json({type: error.name,message: error.message});
    }
};
exports.verifyPasswordResetOtp = async function(req,res){

    try{
        const {email,otp} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: 'User not found!'})
        }
        if(user.resetPasswordOtp != +otp || Date.now() > user.resetPasswordOtpExpires){
            return res.status(401).json({message: 'Invalid or expired OTP'});
        }

        user.resetPasswordOtp = 1;
        user.resetPasswordOtpExpires = undefined;

        await user.save();

        return res.json({message: 'OTP confirmed successfully.'});
    }catch(error){
        console.error(error);
        return res.status(500).json({type: error.name,message: error.message});
    }
};
exports.resetPassword = async function(req,res){};
