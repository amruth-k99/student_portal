
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title:{type:String},
    author:String,
    bookNo: Number,
    isbn:{type:String, unique:true},
    publisher:String,
    description:String,
    date: Date,
    dwnldlink:String,
    stock:Number


});
module.exports = mongoose.model("Book",bookSchema);