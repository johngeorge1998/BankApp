import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //current user

  currentUser="";


  currentAcno="";

  constructor() { 
    this.getDetails();

  }

//saveDetailes- to save adata to local storage
saveDetails(){
  //DATABASE
  if(this.userDetails){

  localStorage.setItem('Database',JSON.stringify(this.userDetails))
  }
  //current user
  if(this.currentUser){

  localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
  }
  //currentAcno
  if(this.currentAcno){

  localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }
}

getDetails(){
  if(localStorage.getItem('Database')){
    this.userDetails =JSON.parse(localStorage.getItem('Database') || '')
  }

  if(localStorage.getItem('currentUser')){
    this.currentUser =JSON.parse(localStorage.getItem('currentUser') || '')
  }

  if(localStorage.getItem('currentAcno')){
    this.currentAcno =JSON.parse(localStorage.getItem('currentAcno') || '')
  }
}



  userDetails:any={
    1000:{acno:1000,username:"Amal", password:1000, balance:1000,transaction:[]},
    1001:{acno:1001,username:"Arjun", password:1001, balance:1000,transaction:[]},
    1002:{acno:1002,username:"Arun", password:1002, balance:1000,transaction:[]}
  }

  register(acno:any,username:any,password:any){
    let userDetails=this.userDetails;

    if(acno in userDetails){
      return false;
    }
    else{
      userDetails[acno]={
        acno,
        username,
        password,
        balance:0,
        transaction:[]
      }
      console.log("-------+++++++",userDetails);
      return true;
    }

  }

  login(acno:any,pswd:any){
    console.log("insideLogin")

    let userDetails=this.userDetails;
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        this.currentUser=userDetails[acno]['username']
        this.currentAcno=acno;
        this.saveDetails();
        return true;

      }
      else{
        return false;
      }
    }
    else{
      return false;
    }

  }
  deposit(acno:any,pswd:any,amt:any){
    var amount=parseInt(amt)
    let userDetails=this.userDetails;

    if(acno in userDetails){
  
      if(pswd==userDetails[acno]['password']){
        userDetails[acno]['balance']+=amount;
        userDetails[acno]['transaction'].push({
          Type:'Credit',
          Amount:amount
        })
        this.saveDetails();
        console.log(userDetails);
        return userDetails[acno]['balance']
      }
      else{
        alert('password mismatch')
        return false;
      }
    }
    else{
      alert('Invalid data')
      return false;
    }
  }


  withdraw(acno:any,pswd:any,amt:any){
    var amount=parseInt(amt)
    let userDetails=this.userDetails;
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        if(userDetails[acno]['balance']>amount){
        userDetails[acno]['balance']-=amount;
        userDetails[acno]['transaction'].push({
          Type:'Debit',
          Amount:amount
        })

        this.saveDetails();
        console.log(userDetails);
        
        return userDetails[acno]['balance']
        }
        else{
          alert('Transaction failed');
          return false;
        }
      }
      else{
        alert('password mismatch')
        return false;
      }
    }
    else{
      alert('Invalid data')
      return false;
    }


  }

  
  getTransaction(acno:any){
    console.log("transaction",this.userDetails[acno]['transaction'])
   return this.userDetails[acno]['transaction'];

  }
}

