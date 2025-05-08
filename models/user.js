const { Schema, model } = require("mongoose");


const userSchema = Schema({
    name: {type: String,required: true,trim: true},
    // email: {type: String,required: true,trim: true,validate: {validator: (value)=>{
    //     const re = /^-!#$%&'*+\/0-9=?A-Z^_a-z{|}~*@a-zA-Z0-9*\.a-zA-Z+$/;
    //     return value.match(re);
    // },message: "please enter a valid email address"}},
    passwordHash: {type: String,required: true},
    street: String,
    apartment: String,
    city: String,
    postalcode: String,
    country: String,
    phone: {type: String,required: true,trim: true},
    isAdmin: {type: Boolean,default: false},
    resetPasswordOtp: Number,
    resetPasswordOtpExpires: Date,
    wishList: [
        {
            produstId: {type: Schema.Types.ObjectId,ref: 'product',required: true},
            productImage: {type: String,required: true},
            produstPrice: {type: Number,required: true},
        }
    ]
});
userSchema.index({email: 1},{unique: true});

exports.User = model('user',userSchema); 