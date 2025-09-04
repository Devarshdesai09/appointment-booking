const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicine");

router.post("/addmedicine", async (req, res) => {
  try {
    const { name, img, description, price, usage } = req.body;

    const newMedicine = new Medicine({
      name, img, description, price, usage
    });

    await newMedicine.save();
    res.status(201).json({ message: "Medicine added successfully", medicine: newMedicine });

  } catch (error) {
    console.error("Add Medicine Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/getallmedicines", async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json(medicines);
    } catch (error) {
        console.error("Get All Medicines Error:", error);
        res.status(500).json({ error: error.message });
    }
    });
    

module.exports = router;
