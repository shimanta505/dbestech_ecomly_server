const {expressjwt: expjwt} = require('express-jwt');

const {Token} = require('../models/token');

function authJwt(){
    return expjwt({
       secret: process.env.ACCESS_TOKEN_SECRET,
       algorithms: ['HS256'],
       isRevoked: isRevoked,
    });
}

async function isRevoked(req,jwt){
    const authHeader = req.header('Authorization');

    if(!authHeader.startswith('Bearer')){
        return true;
    }

    const accessToken = authHeader.replace('Bearer','').trim();
    const token = await Token.findOne({accessToken});

    const adminRouteRegex = /^\/api\/v1\/admin\//1;
    const adminFault = !jwt.payload.isAdmin && adminRouteRegex.test(req.originalUrl);

    return adminFault || !token;
}

module.exports = authJwt;