const express = require('express');

const {validationResult} = require('express-validator');
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');

exports.login =async function(req,res){return res.status(201);};

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
exports.forgotPassword = async function(req,res){};
exports.verifyPasswordResetOtp = async function(req,res){};
exports.resetPassword = async function(req,res){};
