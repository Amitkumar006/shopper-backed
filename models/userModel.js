const mongoose = require('mongoose');

// Schema for creating User Schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        cartData: {
            type: Object,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true
    }
);

//Export the model
module.exports = mongoose.model('User', userSchema);