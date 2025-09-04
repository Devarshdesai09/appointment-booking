const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors')
const mongoose = require('mongoose');
const Mongo_url = "mongodb://127.0.0.1:27017/animalhusbandary";
const baseUser  = require('./models/user')
const doctor = require('./models/doctor')
const animaldetailtreat = require('./models/animaldetailtreat')
const appointment = require('./models/appointment')
const user = require('./routes/user')
const Doctor = require('./routes/doctor')
const Animal = require('./routes/animaltreat')
const Appointment = require('./routes/appoinment')
const Medicine = require('./routes/medicine')
app.use(cors());
app.use(express.json());
app.use("/api/v1",user);
app.use("/api/v1/doctor",Doctor);
app.use("/api/v1",Animal);
app.use("/api/v1",Appointment);
app.use("/api/v1",Medicine);


main().then(()=>{
    console.log("Connected to DB :)");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(Mongo_url);

}


app.get("/",(req,res)=>{
    res.send("working properly");
})


app.listen(port,()=>{
    console.log(`listing at ${port} is successfull`);
})
