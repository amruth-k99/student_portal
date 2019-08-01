const express = require('express');
const router = express.Router();

//Item Model

const Student = require('../../models/Student');
//@router GET app
router.get('/',(req,res)=>{
    Student.find()
    .sort({ roll:-1})
    .then(students=>res.json(students));

});

//@router POST app
router.post('/',(req,res)=>{
    const newStudent = new Student({
        name : req.body.name,
        roll: req.body.name
    });
    newStudent.save().then(student=>res.json(student)); 
});


module.exports =router;
