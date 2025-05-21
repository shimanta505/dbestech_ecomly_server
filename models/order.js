const {Schema,model} = require('mongoose');

const orderSchema = Schema({
    orderItems: [
        {type: Schema.Types.ObjectId,ref: 'OrderItem',required: true},
    ],
    shippingAddress: {type: String,required: true},
    city: {type: String,required: true},
    postalCode: String,
    country: {type: String,required: true},
    phone: {type: String,required: true},
    paymentId: String,
    status: {
        type: String,
        default: 'pending',
        enum: [
            'pending',
            'processed',
            'shipped',
            'out-for-delivery',
            'delivered',
            'canceled',
            'on-hold',
            'expired',
        ],
    },
    statusHistory: {
        type: [String],
        enum: [
            'pending',
            'processed',
            'shipped',
            'out-for-delivery',
            'delivered',
            'canceled',
            'on-hold',
            'expired',
        ],
        required: true,
        default: ['pending'],
    },
    totalPrice: Number,
    user: {type: Schema.Types.ObjectId,ref: 'User'},
    dateOrdered: {type: Date,default: Date.now}, 
});



exports.Order = model('Order',orderSchema);