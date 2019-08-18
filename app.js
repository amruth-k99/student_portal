const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');


//const bcrypt = require('bcrypt');
//const saltRounds = 10;





const database = {
    users:[{
        roll:'ECE17U003',
        name:'Amruth',
        email:'amruthk99@gmail.com',
        password:'1234',
        branch:'ECE',
        current_year:'3rd'
    },
    {
        roll:'ECE17U004',
        name:'Hitesh',
        email:'hiteshatluri@gmail.com',
        password:'hitesh',
        branch:'ECE',
        current_year:'3rd'
    }
]
}









//-----------------------------------
//              ROUTES
//-----------------------------------
app.use(express.static('views'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


    app.get('/signin',(request,response)=>{
        console.log(request.body);
    response.render('student_login');
   });
   
   app.post('/signin',(req,res)=>{

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');

    }
    else{
        res.status(400).json('error logging in');
    }
   })
   
   app.post('/register',(req,res)=>{
       const {email,name,password,branch,current_year} = req.body;

      // bcrypt.hash(password , saltRounds, function(err, hash) {
        // Store hash in your password DB.

    //  });
        database.users.push({
            roll:'234',
            name:name,
            email:email,
            password:password,
            branch:branch,
            current_year:current_year

        })
        res.json(database.users[database.users.length-1]);


   })

   app.get('/profile/:roll',(req,res)=>{
       const {roll} = req.params;
       const found = false;

        database.users.forEach(user=>{
            if(user.roll===roll){
               return res.json(user);
               found = true;

            } 
        })
        if(!found){
            res.status(404).json('not found');        }

   })





    app.get('/',(request,response)=>{
    response.render('home.ejs');
   })
   app.get('/Academics',(request,response)=>{
       let studentInfo = [
           {name:"Hitesh Atluri", Roll:"ECE17U004",image:"hitesh.jpeg",branch:"Electronics and Communication Engineering (ECE)",semester:"5th",currentYear:"3rd",batch:"2017-2021"},
           {name:"Amruth Kuntamalla", Roll:"ECE17U003",image:"amruth.jpeg",branch:"Electronics and Communication Engineering (ECE)",semester:"5th",currentYear:"3rd",batch:"2017-2021"},
           {name:"Satyam Pavan", Roll:"CSE17U017",image:"pavan.jpeg",branch:"Computer Science Engineering (CSE)",semester:"5th",currentYear:"3rd",batch:"2017-2021"}
        ];
    response.render( 'Academic_Summary',{student:studentInfo});
   });
   app.get('/attendance',(request,response)=>{
    response.render('attendance.ejs');
   });
   app.get('/mess',(request,response)=>{
    response.render('mess');
   });
   app.get('/profile',(request,response)=>{
    response.render('profile');
   });
   app.get('/register',(request,response)=>{
    response.render('register');
   });








 // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
//});










//add the router
app.use('/', router);
app.listen(process.env.port || 4000);
console.log('Running at Port 4000');