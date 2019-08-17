const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');












//-----------------------------------
//              ROUTES
//-----------------------------------
app.use(express.static('views'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


    app.get('/',(request,response)=>{
    response.render('student_login');
   });
    app.get('/home',(request,response)=>{
    response.render('home.ejs');
   });
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








//add the router
app.use('/', router);
app.listen(process.env.port || 4000);
console.log('Running at Port 4000');