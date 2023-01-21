//server creation


//1 import express

const express = require('express')

//import dataservices

const dataService=require('./services/data.service')


//import cors

const cors =require('cors')


//2 create an application using express

const app =express()

//give command to share data via cors

app.use(cors({
    origin:['http://localhost:4200', 'http://192.168.0.134:8080']
}))



//import jwt

const jwt =require('jsonwebtoken')


//to parse json from request body
app.use(express.json())


3// create a port number

app.listen(3000,()=> {
    console.log('listening on port 3000');
})

//Application specific middleware

const appMiddleware =(req,rs,next)=>{
    console.log('Application specific middleware');
    next();

}
app.use(appMiddleware)

//router specific middleware

const jwtMiddleware =(req,res,next)=>{

    try{
    console.log('router specific middleware');

    const token=req.headers['x-access-token']; //bvvghdkhjhl67ghfj09yuygf
    const data=jwt.verify(token,'superkey2022')
    console.log(data);
    next();
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'Please login first'
        })
    }
}

4// resolving http request
// get, post, put, patch, delete


//resolving get request

// API request

//registration request

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.pswd)
    .then(result=>{
    res.status(result.statusCode).json(result)
})
    
    // if(result){
    //     res.send('register successful')
    // }
    // else{
    //     res.send('user already registered')
    // }
    
})

//login request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
    .then(result=>{
  res.status(result.statusCode).json(result)
})
})


// deposit request

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result);
})
})

//withdraw request

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result);
})
})
//transaction request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
    res.status(result.statusCode).json(result);
})
})


//delete request


app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
    res.status(result.statusCode).json(result);
})
})
