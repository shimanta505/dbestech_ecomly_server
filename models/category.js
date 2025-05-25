const {Schema,model} = require('mongoose');

const categorySchema = Schema(
    {
        name: {type: String,required: true},
        color: {type: String,default: '#000000'},
        image: {type: String,required: true},
        markedForDeletion: {type: Boolean,default: false},
    }
);

categorySchema.set('toObject',{virtuals: true});
categorySchema.set('toJson',{virtuals: true});

exports.Category = model('Category',categorySchema);