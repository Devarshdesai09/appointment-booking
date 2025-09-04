const express = require("express");
const router = express.Router();
exports.router = router;
// const VeterinaryOfficer = require("../models/doctor");
const appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const cors = require('cors');


//  1. Register a New Veterinary Officer
router.post("/", async (req, res) => {
    try {
        const { userId ,name, email, password, phoneNumber, qualification, experience, specialization,  address , fees} = req.body;

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ error: "Doctor already registered with this email" });
        }

        // Create new doctor
        const newDoctor = new Doctor({
           userId, name, email, password, phoneNumber, qualification, experience, specialization, address , fees
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Veterinary Officers
router.get("/getalldoctor", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// get doctor detials
// router.get("/get-doctor-information", async (req, res) => {
//     try {
//       const docotrId = req.headers.id; // Assuming id is in the header
  
//       // Validate userId
//       if (!docotrId) {
//         return res.status(400).json({ message: "User ID is missing" });
//       }
  
//       const User = await Doctor.findById(docotrId).select("-password"); // Assuming Mongoose //hiding password
  
//       if (!User) {
//         return res.status(404).json({ message: "Doctor not found" });
//       }
  
//       res.status(200).json(User);
//     } catch (error) {
//       console.error("Error fetching user information:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

// router.get("/doctor/:id", async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });
//     res.json(doctor);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

router.get("/get-doctor-by-user/:userId", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.params.userId });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (err) {
    console.error("Error fetching doctor by userId:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//4. Update a Doctor's Information
router.put("/updatedoctor/:id", async (req, res) => {
    try {
        const { name, phone, qualification, experience, specialization, address } = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { name, phone, qualification, experience, specialization, address },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a Doctor
router.delete("/deletedoctor/:id", async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// search doctor 
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
      ],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
