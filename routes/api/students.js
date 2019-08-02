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
        roll: req.body.roll,
        email:req.body.email
    });
    newStudent.save().then(student=>res.json(student)); 
});


//@router POST app
router.delete('/:id',(req,res)=>{
    Student.findById(req.params.id)
    .then(student=>student.remove().then(()=>res.json({success:true})))
 
.catch(err=>res.status(404).json({success:false}));
});


module.exports =router;
