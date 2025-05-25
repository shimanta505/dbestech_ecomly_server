

const {Schema,model} = require('mongoose');
const { Product } = require('./product');

const cartProductSchema = Schema({
Product: {type: Schema.Types.ObjectId,ref: 'product',required: true},
quantity: {type: Number,default: 1},
selectedSize: String,
productName: {type: String,required: true},
productImage: {type: String,required: true}, 
productPrice: {type: Number,required: true},
reservationExpiry: {
    type: Date,
    default: ()=> Date(Date.now() + 30 * 60 * 1000), // added extra seconds
},
reserved: {type: Boolean,default: true},
});

cartProductSchema.set('toObject',{virtuals: true});
cartProductSchema.set('toJson',{virtuals: true});

exports.CartProduct = model('Cart',cartProductSchema);