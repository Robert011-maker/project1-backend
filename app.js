const express = require('express');
const app = express();
const dotenv=require('dotenv');
const path=require('path');
const hbs=require('hbs');
const controller=require('./controller/controller');
const connectdb=require('./server/database/connection');
const axios = require('axios');
const bodyParser= require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



//
dotenv.config({path:'/config.env'});
const port =  9000;
const templates_path=path.join(__dirname,'/templates/views/');
const partials_path=path.join(__dirname,'/templates/partials')
//
hbs.registerPartials(partials_path);

connectdb();



//css
app.use('/css',express.static(path.resolve(__dirname,'./public/css')));
app.use('/js',express.static(path.resolve(__dirname,'./public/js')))
app.use(express.static('../public'));
//set templates
app.set('view engine','hbs');
app.set('views',templates_path);

//form
app.get('/form',(req,res)=>{
    res.render('form');
});


//update user
app.get('/user',(req,res)=>{
    res.render('update');
})





// get request
app.get('/home/transfermoney/VieallCustomers',(req,res)=>{
    axios.get(`http://localhost:${port}/api/users`)
     .then(resp=>{
        res.render('view',{users: resp.data});
     })
     .catch(err=>{
        res.status(404).send(err);
     })     
 });


app.get('/',(req,res)=>{
res.render('index');
})
app.get('/home',(req,res)=>{
    res.render('home');
})
//get data in form
app.get('/home/transfermoney/transaction',async (req,res)=> {
    try {
        let user = await axios.get(`http://localhost:${port}/api/user/`,{params: {id: req.query.id}})
                              .then( response => response.data);
        let users = await axios.get(`http://localhost:${port}/api/users`)
                               .then( response => response.data);
        res.render('transcation',{ user: user, users:  users});
    } catch (error) {
        res.status(404).send(error);
    }
});

   

app.get('/home/moneytransfer',async(req,res)=>{
    try {
       
        let users = await axios.get(`http://localhost:${port}/api/users`)
        .then( response => response.data);
        res.render('money',{  users:  users});
    } catch (error) {
     
        res.status(404).send(error);
    }
    
})


app.post('/api/users',controller.create);

app.get('/api/users',controller.findAll);
app.get('/api/user',controller.findOne);





//port listener
app.listen(port,()=>{
    console.log(`${port}`)
});
