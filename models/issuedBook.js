
const mongoose = require("mongoose");
const issuedBookSchema = new mongoose.Schema({
    issuedTo:String,
    issuedTo_ID:String,
    bookNo: Number,
    title:{type:String},
    author:String,
    isbn:{type:String, unique:true},
    publisher:String,
    issuedDate: Date


});
module.exports = mongoose.model("IssuedBook",issuedBookSchema);