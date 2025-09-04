const mongoose = require("mongoose");

const doctor = new mongoose.Schema({

     userId: { type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        required: true },

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password : {
        type : String,
        required : true,
    },
    phoneNumber: {
        type: String,
        required : true
    },
    specialization: { 
        type: String 
    },
    qualification:{
        type : String,
    },
    experience: { 
        type: String, 
    },
    fees: { 
        type: Number 
    },
    totalRatings: { 
        type: Number, 
        default: 0 // Keeps a sum of all ratings received 
    },
    ratingCount: { 
        type: Number, 
        default: 0 // Tracks the number of ratings 
    },
    averageRating: { 
        type: Number, 
        default: 0 // Stores the average rating for easy access 
    },
    address: { 
        type : String,
        required:true,
    },
    // availability: [
    //     {
    //         day: { type: String, required: true },
    //         startTime: { type: String, required: true },
    //         endTime: { type: String, required: true },
    //     },
    // ],
    // appointments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Appointment',
    //     },
    // ],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appoinment" }]
    }, { timestamps: true });





const Doctor = mongoose.model('Doctor', doctor);

module.exports = Doctor;