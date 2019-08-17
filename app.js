const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static('public'));


app.get('/',(request,response)=>{
    response.sendFile(__dirname + '/public/student_login.html');
   });

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');