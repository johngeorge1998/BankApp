import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;

//deposit properties
  acno="";
  pswd="";
  amount="";

  //withdraw properties
  acno1="";
  pswd1="";
  amount1="";


  //current user property

  user="";

  sdate:any;

  depositForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  withdrawForm = this.fb.group({
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds:DataService, private fb:FormBuilder, private router:Router) {
    this.user=this.ds.currentUser;
    this.sdate= new Date();
   }

  ngOnInit(): void {
    
    if(!localStorage.getItem('currentAcno')){
      alert('Please login first');
      this.router.navigateByUrl('');
    }
  }

  deposit(){
    // alert('clicked');
    var acno=this.depositForm.value.acno;
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    
    const result=this.ds.deposit(acno, pswd, amount)
    if(result){
      alert(`${amount} is credited...available balance is ${result}`)
    }
  }

  withdraw(){
    // alert('clicked');
      var acno=this.withdrawForm.value.acno1;
      var pswd=this.withdrawForm.value.pswd1;
      var amount=this.withdrawForm.value.amount1;
      
      const result=this.ds.withdraw(acno, pswd, amount)
      if(result){
        alert(`${amount} is debited...available balance is ${result}`)
      }
    }

    logout(){
      // alert('clicked');
      localStorage.removeItem('currentAcno');
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('');

    }
    delete(){
      // alert('clicked');
      this.acno=JSON.parse(localStorage.getItem('currentAcno') || '');

    }
  }


