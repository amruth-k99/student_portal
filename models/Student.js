const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    roll: {
        type:String,
        required:true
    }


});

module.exports = Student = mongoose.model('student',StudentSchema);