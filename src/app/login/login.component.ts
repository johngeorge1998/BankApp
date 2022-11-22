import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  //3rd executed
  //class- collection of properties and functions
  //properties//variables
  aim="Your perfect banking partner";

  account="Enter your account here";

  acno='';
  pswd='';


//database

userDetails:any={
  1000:{acno:1000,username:"Amal", password:1000, balance:1000},
  1001:{acno:1001,username:"Arjun", password:1001, balance:1000},
  1002:{acno:1002,username:"Arun", password:1002, balance:1000}
}


  //functions/methods -user defined functions //4th executed

  constructor() { //1st execute
    //it automatically invokes when the object is created
    //object intialization
   }

  ngOnInit(): void {  //2 executed
    //its a life cycle hoookes for angular
    //when the component is created at the same time it will initialize or authorize
  }
  
  acnoChange(event:any)
  {
   console.log(event);
   this.acno=event.target.value;
   console.log(this.acno);
  }

  pswdChange(event:any){
    this.pswd=event.target.value;
    console.log(this.pswd);
    
  }


  // login(){
  //   // alert('login clicked');

  //   var acno=this.acno;
  //   var pswd=this.pswd;
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert('login successful');
  //     }
  //     else{
  //       alert('invalid password');
  //     }
  //   }
  //   else{
  //     alert('invalid user detailes');
  //   }

  // }




  
  login(a:any,p:any){
    // alert('login clicked');

    var acno=a.value;
    var pswd=p.value;
    var userDetails=this.userDetails;

    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        alert('login successful');
      }
      else{
        alert('invalid password');
      }
    }
    else{
      alert('invalid user detailes');
    }

  }

}
