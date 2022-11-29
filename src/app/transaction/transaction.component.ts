import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  acno:any; //to hold the current acno
  transaction:any; // to hold transaction

  constructor(private ds:DataService) { //dependency injection
    this.acno=this.ds.currentAcno;
    this.transaction=this.ds.getTransaction(this.acno);
    console.log(this.transaction);
    
   }

  ngOnInit(): void {
  }

}
