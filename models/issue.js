var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var IssueSchema = new mongoose.Schema({
    subject:{type:String},
    message:String,
    roll:String
    
});
IssueSchema.plugin(passportLocalMongoose);   

module.exports = mongoose.model("Issue",IssueSchema);