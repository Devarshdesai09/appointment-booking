const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "BaseUser", // Farmer's ID 
        required: true 
    },
    animal_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Animal", // Animal requiring treatment 
        // required: true 
    },
    doctor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Doctor", 
        // required: true 
    },
    animalname:{
        type:String, 
    },
    state:{
        type:String,

    },
    district:{
        type:String,
        
    },
    taluka:{
        type:String,
        
    },
    village:{
        type:String,
        
    },
   
    appointment_date: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Pending", "approved", "rejected"], 
        default: "Pending" 
    },
    reason: { 
        type: String, 
        required: true 
    }, // Example: "Vaccination", "Injury treatment", etc.
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
