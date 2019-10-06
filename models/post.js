
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title:{type:String},
    by:String,
    description:String,
    date: Date

});
module.exports = mongoose.model("Post",postSchema);