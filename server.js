const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
const mustache = mustacheExpress();
mustache.cache = null;
const {Clinet} = require('pg');
app.engine('mustache',mustache);
app.set('view engine','mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/profile',(req,res)=>{
res.render('profile');
})

app.listen(5001,()=>{
    console.log('listening on port 5001');
})