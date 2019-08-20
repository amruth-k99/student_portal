
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    heading:String,
    description:String,
    date: Date,
    link:String,
    related:String

});
module.exports = mongoose.model("Post",postSchema);