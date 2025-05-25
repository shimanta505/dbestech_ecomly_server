const {Schema,model} = require('mongoose');

const reviewSchema = Schema({
    user: { type: Schema.Types.ObjectId,ref: 'User',required: true},
    userName: {type: String,required: true},
    comment: {type: String,required: true},
    rating: {type: String,required: true},
    date: {type: Date,default: Date.now}
});

orderItemSchema.set('toObject',{virtuals: true});
orderItemSchema.set('toJson',{virtuals: true});

exports.Review = model('Review',reviewSchema);