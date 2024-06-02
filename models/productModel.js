const mongoose = require('mongoose'); // Erase if already required

// Schema for creating Product Schema
const productSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        new_price: {
            type: Number
        },
        old_price: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now,
        },
        available: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true
    }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);