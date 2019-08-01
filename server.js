const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const students = require('./routes/api/students');

const app = express();
//Bodyparser Middleware
app.use(bodyParser.json())

//DB Config
const db = require('./config/keys').uri;

//connect to DB
mongoose
    .connect(db)
    .then(()=>console.log('mongoDB connected...'))
    .catch(err=>console.log(err));

//use routes
 app.use('/api/students',students);

 const port = process.env.PORT ||5000;
 app.listen(port,()=> console.log("server started on port ${port}") );   


 