const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    usage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Medicine', medicineSchema);