
//STUDENTS SCHEMA

const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name:String,
    rollNo:String,
    yearOfJoining: Number,
    currentYear:Number,
    dept:String

});
module.exports = mongoose.model("Student",studentSchema);
