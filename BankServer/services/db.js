// server  - mongodb integration

// 1 import mongoose

const mongoose= require('mongoose');

//2 state connecton string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true // to avoid unwanted warnings
});


//3 Define bank db model

const User  = mongoose.model('User',
{
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});

//export collection

module.exports={
    User
}


