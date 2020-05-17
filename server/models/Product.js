const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    continent: {
        type: String,
     },
    sold: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

ProductSchema.index({
    title:'text'
    // description:'text'
},
{
    weights:{
        title: 5

    }
}

)

module.exports = mongoose.model('Product', ProductSchema)