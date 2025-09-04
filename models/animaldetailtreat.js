const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
    farmer_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: ' BaseUser',  // Farmer's ID
        required: true 
    },
    species: { type: String, required: true }, // e.g., "Cow", "Buffalo", "Goat"
    breed: { type: String, required: true },
    age: { type: Number, required: true }, // Age in years
    weight: { type: Number, required: true }, // Weight in KG
    health_status: { type: String, default: "Healthy" }, // Current health condition

});

const Animal = mongoose.model('Animal', AnimalSchema);
module.exports = Animal;