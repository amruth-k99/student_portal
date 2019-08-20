const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const mongoose = require("mongoose");
const Student = require("./models/student");
const Post = require("./models/post");
const LocalStatergy = require("passport-local");
const User = require("./models/user") ;
const connect =require('connect');
const cookierParser =require('cookie-parser');

mongoose.connect("mongodb://localhost:27017/student_portal",{useNewUrlParser:true});
mongoose.set('useCreateIndex', true);


app.use(express.static('views'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


app.use(require("express-session")({
    secret:"Some random String this is not salt actually",
    resave:false,
    saveUninitialized:false
}));


   // Student.create({
   // name:"Amruth K",
   // rollNo:"ECE17U003",
   // yearOfJoining: 2017,
  //  currentYear:3,
   // dept:"ECE"

  //  },function(err,student){
  // // console.log(err);
   // else{
   //     console.log("created student");
   //     console.log(student);
//
  //  }
   // })



//---------------------------------------
//      NEWS SCHEMA
//---------------------------------------


//  Post.create({
 //  heading:"Hi",
 //   description:"babakjdjn",
 //   date: 24-05-1999,
 //   link:"String",
 //   related:"String"
//
//   },function(err,student){
 //      if(err)
 // console.log(err);
 //   else{
 //       console.log("created student");
 //       console.log(student);

// }
  // })





/*
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
};
*/



//-----------------------------------
//              PASSPORT AUTH
//-----------------------------------

//app.use(connect.cookieParser());
// app.use(connect.session({ secret: 'keyboard cat' }));
// app.use(passport.initialize());
// app.use(passport.session());





app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//-----------------------------------
//              AUTH
//-----------------------------------
  
        
////////////////////////////////////////////////////////


app.get("/login",(request,response)=>{
  
response.render('login');
});

////////////////////////////////////////////////////////

app.post("/login",passport.authenticate("local",
  {    successRedirect: "/",
     failureRedirect: "/login" 
    }),function(req,res){
       const rollNo = req.body.username;
        console.log(rollNo.username);
        
    });

////////////////////////////////////////////////////////

app.get('/register',(request,response)=>{
      response.render('register'); 
     });

////////////////////////////////////////////////////


 app.post("/register",function(req,res){
  
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
       if(err){
        console.log(err);
        return res.render("register");
         }   

         
        passport.authenticate('local')(req,res,function(){
            res.redirect("/");

        });
         });
         });
   
////////////////////////////////////////////////////////

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login");

});


//-----------------------------------
//              ROUTES
//-----------------------------------
         app.get('/',isLoggedIn,function(request,response){
             console.log(request.user);
         Post.find({},function(err,allPosts){
        if(err){
            console.log(err);
        }
        else{
            response.render("home.ejs",{posts:allPosts});
        }
        })
         response.render('home.ejs');
        });


        app.get('/Academics',isLoggedIn,(request,response)=>{
             response.render( 'Academic_Summary',{student:studentInfo});
        });


        app.get('/attendance',isLoggedIn,(request,response)=>{
         response.render('attendance.ejs');
        });


        app.get('/mess',isLoggedIn,(request,response)=>{
         response.render('mess');
        });

        
        app.get('/profile',isLoggedIn,(request,response)=>{
         response.render('profile');
        });
      
     
     

////////////////////////////////////////////////////////

  
   app.get('/profile/:roll',isLoggedIn,(req,res)=>{
       const {roll} = req.params;
       const found = false;

        database.users.forEach(user=>{
            if(user.roll===roll){
               return res.json(user);
               found = true;

            } 
        })
        if(!found){
            res.status(404).json('not found');}

   });



////////////////////////////////////////////////////////

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}
////////////////////////////////////////////////////////




//add the router
app.use('/', router);
app.listen(process.env.port || 4000);
console.log('Running at Port 4000');