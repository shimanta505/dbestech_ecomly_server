const {Schema,model} = require('mongoose');

const orderItemSchema = Schema({
    product: {type: Schema.Types.ObjectId,ref: 'Product',required: true},
    quantity: {type: Number,default: 1},
    selectedSize: String,
    selectedColor: String,
});

exports.OrderItem = model('OrderItem',orderItemSchema);