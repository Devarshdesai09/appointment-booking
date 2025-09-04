const router = require("express").Router();
const user = require('../models/user')
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userauth")
const bcrypt = require("bcrypt")
const sendEmail = require("../emailservices/emailser")
router.post("/sign-up",async(req,res)=>{
    try {
        const {firstname , lastname , email, password , phoneNumber , age , gender , address ,Appointment, role  } = req.body;

      // check email already exist ?
      const existingemail = await user.findOne({email:email});
      if(existingemail){
          return res.status(400).json({message : "email is allready exist"})
      }
      // check password length 
      if(password.length <6)
          {
              return res.status(200).json({message : " password length should be greater then 6"})
          }
           // using bcrypt to hide password using hash
        const hassPass = await bcrypt.hash(password,10);

          // newdata of user
          const newUser = new user({
            firstname : firstname,
            lastname : lastname,
            email:email,
            phoneNumber:phoneNumber,
            age : age,
            gender :gender,
            password:hassPass,
            address:address,
            Appointment: Appointment || [], // Default to empty array if not provided
            role: role || 'farmer', // Default to 'farmer' if role is
        });

        await newUser.save();

  // ✅ Send Confirmation Email
  const subject = "🎉 Welcome to Animal Husbandry System!";
  const message = `Hello ${lastname},\n\nWelcome to the Animal Husbandry System! Your account has been successfully created.\n\nBest Regards,\nTeam Animal Care  `;

  await sendEmail(email, subject, message);  
          // res.status(201).json({ message: "Appointment booked successfully & email sent!", appointment: newAppointment });
        return res.status(200).json({message : "successfull"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})

    }
})

// sign-in 
router.post("/sign-in",async(req,res)=>{
    try {
      
        const {firstname , lastname , email, password , phoneNumber} = req.body;


      // check password length 
      if(password.length <6)
          {
              return res.status(200).json({message : "length should be greater then 6"})
          }
          const existingUser = await user.findOne({email})
        if(!existingUser){
            res.status(400).json({message : "invalid credentials"})
        }
          await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data)
            {
                // code for jsonwebtoken 
                const authClaims = [
                    {name:existingUser.username},
                    {role:existingUser.role},
                    {email:existingUser.email},
                    {lastname:existingUser.lastname},
                    {firstname:existingUser.firstname},
                ]
                const token = jwt.sign({authClaims}, "bookstore123",{expiresIn:"30d"})
                res.status(200).json(
                {
                    id : existingUser._id , 
                    role : existingUser.role , 
                    token:token ,
                    email:existingUser.email,
                    firstname:existingUser.firstname,
                    lastname:existingUser.lastname,
                })
            }
            else{
                res.status(400).json({message : "invalid credentials"})
            }
        })
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// get user information 
router.get("/get-user-information", async (req, res) => {
    try {
      const userId = req.headers.id; // Assuming id is in the header
  
      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      const User = await user.findById(userId).select("-password"); // Assuming Mongoose //hiding password
  
      if (!User) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(User);
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Route: GET /api/user/:id
router.get('/user/:id', async (req, res) => {
  try {
    const User = await user.findById(req.params.id).select("firstname lastname email role");
    res.json(User);
  } catch (err) {
    res.status(500).json({ error: "User not found" });
  }
});

  

module.exports = router;