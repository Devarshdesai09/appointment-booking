const express = require("express");
const router = express.Router();

const Animal = require('../models/animaldetailtreat');
const { route } = require("./doctor");


router.post("/animal",async(req,res)=>{

    try {
        const { farmer_id, species, breed, age, weight, health_status} = req.body;

         // creat the new data for animal 
         const newAnimal = new Animal({
            farmer_id : farmer_id,
            species : species,
            breed:breed,
            age : age,
            weight :weight,
            health_status:health_status,
        });

        await newAnimal.save();
        return res.status(200).json({message : "successfull"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})

    }
})

// get all animal detail 

router.get("/getanimaldetail", async(req,res)=>{

    try {
        const animaldetail = await Animal.find()
    res.json(animaldetail);


    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})

    }

})
module.exports = router;