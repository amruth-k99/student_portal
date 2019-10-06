const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const assert = require('assert');
const cors = require('cors');
const mongo = require('mongodb');
const mongoose = require("mongoose");
const Student = require("./models/student");
const Subject = require("./models/subject");
const Marks = require("./models/marks");
const Book = require("./models/book");
const IssuedBook = require("./models/issuedBook");
const Post = require("./models/post");
const Issue = require("./models/issue");
const LocalStatergy = require("passport-local");
const User = require("./models/user") ;
const connect =require('connect');
const cookierParser =require('cookie-parser');
const arraySort = require('array-sort');


mongoose.connect("mongodb://localhost:27017/student_portal",{useNewUrlParser:true});
mongoose.set('useCreateIndex', true);


app.use(express.static('views'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true},{useUnifiedTopology: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(require("express-session")({
    secret:"Some random String this is not salt actually",
    resave:false,
    saveUninitialized:false
}));


//---------------------------------------
 //     STUDENT SCHEMA
//---------------------------------------

/*
Student.find({yearOfJoining:"2017"},(function(err, students){
  if(err){
      console.log(err);
    }

 else{    
  
  Subject.find({},(function(err,subjects){

    students.forEach(function(student){
      subjects.forEach(function(subject){




        Marks.create({
          name:subject.name,
          year:2019,
          dept:'CSE',
          sem:5,
          sub_code:subject.sub_code,
          //marks and attendance
          ct1:parseInt((Math.random())*20),
          ct2:parseInt((Math.random())*20),
          assignment:parseInt((Math.random())*10),
          EndSem:parseInt((Math.random())*100),
          lastUpdate:Date.now(),
          totalClasses:35,
          attendedClasses:34,
          student_roll:student.rollNo,
          student_name: student.name, 
          //teacher details
          lecturerName:subject.lecturerName,
          lecturerId:subject.lecturerId
      
      
        },function(err,subject){
            if(err)
              console.log(err);
              else{
                console.log("created subject");
                console.log(subject);
        }
        })
















      });
 
    });


  }));











 }
}));




*/



/*


   Student.create({
   name:"Student Name",
   rollNo:"CSE17U000",
   yearOfJoining: 2017,
   currentYear:3,
   currentSem:5,
   dept:"CSE",
   cgpa:"8.8",
   mobile:9999999999
   
   },function(err,student){
       if(err)
         console.log(err);
         else{
           console.log("created student");
           console.log(student);
   }
   })

*/

//---------------------------------------
//      NEWS SCHEMA
//---------------------------------------

/*
 Post.create({
   title:"Holiday Declared on 18-09-2019",
    description:"This is to inform holiday is declared on 18th September",
    date: 19-09-2019,
    by:"college admin"

   },function(err,student){
       if(err)
  console.log(err);
    else{
        console.log("created student");
        console.log(student);

 }
   })

*/


//---------------------------------------
//      SUBJECT SCHEMA
//---------------------------------------

/*
  Marks.create({
    name:'Computer Graphics',
    year:2019,
    dept:'CSE',
    sem:5,
    sub_code:"CSOE11",
    //marks and attendance
    ct1:19,
    ct2:20,
    assignment:9,
    EndSem:90,
    lastUpdate:Date.now(),
    totalClasses:35,
    attendedClasses:34,
    student_roll:'CSE17U026',
    student_name: 'G Thilakar Rajaa', 
    //teacher details
    lecturerName:"R.Shatanaa",
    lecturerId:"IT201706"


  },function(err,subject){
      if(err)
        console.log(err);
        else{
          console.log("created subject");
          console.log(subject);
  }
  })
*/

/*
  Subject.create({
    name:'Software Engineering',
    sub_code:"CSPC34",
    dept:'CSE',
    sem:5,
    year:2019,
    //teacher details
    lecturerName:"A M Siva Krishna",
    lecturerId:"IT201723",
    batch:"2017-2021",
    totalStudents:26,
    totalClassesTaken:26,
    averageAttendance:68,
    totalCredits:4



  },function(err,subject){
      if(err)
        console.log(err);
        else{
          console.log("created subject");
          console.log(subject);
  }
  })
*/
  
/*
 Book.create({
    title:'Data Structures  and Algorithms',
    author:"Randy Anderson",
    bookNo:325,
    isbn:"29718-0-017-07-0702028-0",
    publisher:"O'Weilly Education",
    description:"Coding",
    date:Date.now(),
    dwnldlink:"www.fb.com.com",
    stock:4,
    //teacher details


  },function(err,book){
      if(err)
        console.log(err);
        else{
          console.log("added book");
          console.log(book);
  }
  })

*/

/*
 IssuedBook.create({
    issuedTo:"Sai Teja Reddy Banda",
    issuedTo_ID:"CSE17U005",
    bookNo:325,
    isbn:"29718-0-017-07-0702028-0",
    title:'Data Structures  and Algorithms',
    author:"Randy Anderson",
    publisher:"O'Weilly Education",
    issuedDate:Date.now(),
    

  },function(err,book){
      if(err)
        console.log(err);
        else{
          console.log("added book");
          console.log(book);
  }
  })

*/
  


//-----------------------------------
//              PASSPORT AUTH
//-----------------------------------

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
        
    });

////////////////////////////////////////////////////////

app.get('/register',(request,response)=>{
      response.render('register'); 
     });

////////////////////////////////////////////////////


 app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username.toUpperCase()});
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
             
            const rollNo = request.user.username.toUpperCase();
            var now = new Date();
           var time = dateFormat(now);
           console.log(time);

            var name = '';
            Student.find  ({rollNo:rollNo},(function(err, users){
                 if(err){
                     console.log(err);}
             
                else{

                  Post.find({},function(err,allPosts){
                    if(err){
                        console.log(err);
                    }
                    else{
                      
                      var posts = arraySort(allPosts, 'date', {reverse: true});
                      console.log(allPosts);
                        response.render("home.ejs",{user:users[0].name,posts:allPosts});
                    }
                    })



      
                }
            }
                ));
             

       

         
        });


        app.get('/Academics',isLoggedIn,(request,response)=>{
            const rollNo = request.user.username.toUpperCase();
            Student.find({rollNo:rollNo},(function(err, users){
                if(err){
                    console.log(err);
                  }
            
               else{    
                Marks.find({student_roll:rollNo},(function(err,subjects){
                    if(err){
                        console.log(err);}
                
                   else{
                      
                   
                   
                   response.render( 'Academic_Summary',{user:users[0],subjects:subjects});
                }
    
                }));
               }
            }));
             
              });

              app.get('/attendance',isLoggedIn,(request,response)=>{
                const rollNo = request.user.username.toUpperCase();
                Student.find({rollNo:rollNo},(function(err, users){
                    if(err){
                        console.log(err);}
                
                   else{
                    Subject.find({student_roll:rollNo},(function(err,subjects){
                        if(err){
                            console.log(err);}
                    
                       else{
                          
                       
                       
                       response.render( 'attendance',{user:users[0],subjects:subjects});
                    }
        
                    }));
                   }
                }));
                 
                  });
       


        app.get('/hostel',isLoggedIn,(request,response)=>{
          const id = request.user.username;
          var body= request.body;
         console.log(id);
         response.render('hostel',{alert:false});
        });

        
        
        app.get('/profile',isLoggedIn,(request,response)=>{
          const rollNo = request.user.username.toUpperCase();
          Student.find({rollNo:rollNo},(function(err, users){
              if(err){
                  console.log(err);}
          
             else{    
              Marks.find({student_roll:rollNo},(function(err,subjects){
                  if(err){
                      console.log(err);}
              
                 else{
                    
                 
                 
                 response.render( 'profile',{user:users[0],subjects:subjects});
              }
  
              }));
             }
          }));
           
            });
 

            app.get('/library',(request,response)=>{

              Book.find({},(function(err, books){
                if(err){
                    console.log(err);}
            
               else{
                    var issued=[];
                   response.render('library.ejs',{books:books,issuedBooks:issued});
     
               }
           }
               ));
    
                   }); 
      
     
     

////////////////////////////////////////////////////////

  //POST


  const url = 'mongodb://localhost:27017/student_portal';

  app.post("/hostel",isLoggedIn,function(req,res){
   
    const id = req.user.username;
    var body= req.body;
   console.log(id);
   Issue.create({
    
    subject:body.subject,
    message:body.message,
    roll:id

  },function(err,issue){
      if(err){
        console.log(err);
        res.render('hostel',{alert:false});
        
      }
        else{
          console.log("created issue");
          console.log(issue);     
res.render('hostel',{alert:true});
  }
  })


     
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
