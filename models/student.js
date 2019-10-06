
//STUDENTS SCHEMA

const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name:String,
    currentSem:Number,
    rollNo:{type:String, unique:true},
    currentYear:Number,
    yearOfJoining: String,
    dept:String,
    mobile:String,
    cgpa:String



});
module.exports = mongoose.model("Student",studentSchema);
