//import JWT
const { urlencoded } = require('express');
const jwt=require('jsonwebtoken');
//database

//import db

const db=require('./db')


userDetails={
    1000:{acno:1000,username:"Amal", password:1000, balance:1000,transaction:[]},
    1001:{acno:1001,username:"Arjun", password:1001, balance:1000,transaction:[]},
    1002:{acno:1002,username:"Arun", password:1002, balance:1000,transaction:[]}
  }



   const register=(acno,username,password)=>{
    return db.User.findOne({acno})
    .then(user=>{
    if(user){
      return{
        status:'false',
        statusCode:400,
        message:'User already registered'
      }
    }
  
    else{
       const newUser=new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      })
      newUser.save();

      return{
            status:'true',
            statusCode:200,
            message:'Registration successful'
      }
    }
  }
)
}


    const login=(acno,pswd)=>{
      return db.User.findOne({acno,password:pswd})
      .then(user=>{
        if(user){
          currentUser=user.username
          currentAcno=acno;
          const token=jwt.sign({currentAcno:acno},'superkey2022') 
          return {
            status:'true',
            statusCode:200,
            message:'Login successful',
            token:token,
            currentUser:currentUser,
            currentAcno:acno

          }
  
        }
         else{
        return {
          status:'false',
          statusCode:400,
          message:'invalid user detailes'
        }
      }
    })
  }
  
    


    const deposit=(acno,pswd,amt)=>{
      var amount=parseInt(amt)  
      return db.User.findOne({acno,pswd})
      .then(user=>{
        if(user){
          user.balance +=amount;
          user.transaction.push({
            Type:'Credit',
            Amount:amount
          })
          user.save();
          return{
            status:'true',
            statusCode:200,
            message:`${amount} is credited and balance is : ${user.balance}`
          }

        }
      
       

      else{
        // alert('Invalid data')
        return {
          status:'false',
          statusCode:400,
          message:'invalid user detailes'
        }
      }
    })
  }


  const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)  
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        user.balance -=amount;
        user.transaction.push({
          Type:'Credit',
          Amount:amount
        })
        user.save();
        return{
          status:'true',
          statusCode:200,
          message:`${amount} is debited and balance is : ${user.balance}`
        }

      }

    else{
      // alert('Invalid data')
      return {
        status:'false',
        statusCode:400,
        message:'invalid user detailes'
      }
    }
  })
}

    const getTransaction=(acno)=>{
      return db.User.findOne({acno})
      .then(user=>{
        if(user){
      return{
        status:'true',
        statusCode:200,
        transaction:user.transaction
      
      }
    }
    return {
      status:'false',
      statusCode:400,
      message:'User not found'
    }
  })
}


//to delete account

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){

      return{
        status:'true',
        statusCode:200,
        message:'User deleted successfully'
      }
    }
    else{
      return {
        status:'false',
        statusCode:400,
        message:'User not found'
      }
    }
  })
}


  

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }