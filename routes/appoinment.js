const express = require("express");
const router = express.Router();
const appoinment = require('../models/appointment')
const sendEmail = require('../emailservices/emailser')
const user = require('../models/user');
const appointment = require("../models/appointment");


router.post("/appointment", async (req, res) => {
  try {
    const {
      user_id,
      doctor_id,
      animal_id,
      appointment_date,
      status,
      reason,
      animalname,
      state,
      district,
      taluka,
      village,
    } = req.body;

    const newAppointment = new appoinment({
      user_id,
      doctor_id,
      appointment_date,
      status,
      reason,
      animalname,
      state,
      district,
      taluka,
      village,
    });

    await newAppointment.save();

    // ✅ Push appointment to user's appointments array
    await user.findByIdAndUpdate(user_id, {
      $push: { appointments: newAppointment._id }
    });

   

    // ✅ Get user details for sending email
    const User = await user.findById(user_id);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Send email
    const subject = "📅 Appointment Confirmation - Animal Husbandry System";
    const message = `Hello ${User.name || "User"},\n\nYour appointment has been successfully booked on ${appointment_date}.\n\nReason: ${reason}\n\nPlease wait for the doctor's confirmation.\n\nBest Regards,\nAnimal Care Team`;

    await sendEmail(User.email, subject, message);

    res.status(201).json({
      message: "Appointment booked and email sent successfully",
      appointment: newAppointment,
    });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: error.message });
  }
});

  // GET /appointment/doctor/:doctorId
router.get("/appointment/doctor/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const appointments = await appointment.find({ doctor_id: doctorId })
    .populate("user_id", "firstname lastname email ")
    .populate("doctor_id", "name email specialization")
    ;
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments by doctor ID" });
  }
});



const mongoose = require("mongoose");


// GET /appointment/history/:id
router.get("/appointment/history/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await appoinment
      .find({ user_id: id })
      .populate("doctor_id", "name email specialization")
      .sort({ appointment_date: -1 });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointment history found" });
    }

    res.status(200).json({
      status: "success",
      appointments,
    });

  } catch (error) {
    console.error("Error fetching appointment history:", error);
    res.status(500).json({ error: error.message });
  }
});

// update appointment status
// Approve or reject appointment
router.put("/update-status/:id", async (req, res) => {
 
  try {
     const { id } = req.params;
     await appointment.findByIdAndUpdate(
      id,
      { status : req.body.status },
      { new: true }

    );

   

    res.json({ message: "Status updated", });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




module.exports = router;
