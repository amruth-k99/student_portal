
//MARKS SCHEMA

const mongoose = require("mongoose");
const marksSchema = new mongoose.Schema({
    //sub details
    name:{type:String},
    year:Number,
    dept:String,
    sem:Number,
    sub_code:{type:String},
    //marks and attendance
    ct1:Number,
    ct2:Number,
    assignment:Number,
    EndSem:Number,
    lastUpdate:Date,
    totalClasses:Number,
    attendedClasses:Number,
     //Student details
    student_roll:String,
    student_name:String,
    //teacher details
    lecturerName:String,
    lecturerId:String



});
module.exports = mongoose.model("Marks",marksSchema);
