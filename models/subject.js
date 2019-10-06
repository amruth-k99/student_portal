
//SUBJECT SCHEMA

const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
    //sub details
    name:{type:String},
    sub_code:{type:String,uniqure:true},
    dept:String,
    year:Number,
    sem:Number,
    lecturerId:String,
    lecturerName:String,
    totalStudents:Number,
    totalClassesTaken:Number,
    averageAttendance:Number,
    totalCredits:Number,
    batch:String

    


});
module.exports = mongoose.model("Subject",subjectSchema);
