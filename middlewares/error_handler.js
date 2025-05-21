const jwt = require('jsonwebtoken');
const { Token } = require('../models/token');
const {User} = require('../models/user');

async function errorHandler(error,req,res,next){
    if(error.name === 'UnauthorizedError'){

        if(!error.message.includes('jwt expired')){
            return res.status(error.status).json({type: error.name,message: error.message});
        }

        try{
            const tokenHeader = req.header('Authorization');
            const accessToken = tokenHeader?.split(' ')[1];
            console.log(accessToken);
            const token =await Token.findOne({accessToken}); // refreshToken: {$exists: true} 

            if(!token){
                console.error('error handeler error');
                return res.status(401).json({type: 'Unauthorized',message: 'Token doesnot exist'});
            }

            const userData = jwt.verify(token.refreshToken,process.env.REFRESH_TOKEN_SECRET);

            const user = await User.findById(userData.id);

            if(!user){
                return res.status(404).json({message: 'Invalid user!'})
            }

            const newAccessToken = jwt.sign({id: user.id,isAdmin: user.isAdmin}
                ,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '24h'});

            req.headers['authorization'] = `Bearer ${newAccessToken}`;

            token.accessToken = newAccessToken;
            await token.save();

            res.set('Authorization',`Bearer ${newAccessToken}`);

            return next();

        }catch(refreshError){
            return res.status(401).json({type: 'Unauthorized',message: refreshError.message});
        }
    }
    return res.status(404).json({type: error.name,message: error.message});
}

module.exports = errorHandler;