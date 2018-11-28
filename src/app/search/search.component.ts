import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestServerService } from '../services/restserver.service';
import { TransactionDetailModel } from '../model/transactiondetail.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [RestServerService]
})

export class SearchComponent implements OnInit {

  submittedTransId = false;
  submittedAccNo = false;
  accNo: string = '';
  transNo: string = '';

  transactionDetail: TransactionDetailModel = {
    accountNumber: '',
    transactionId: '',
    transactionDescription: '',
    transactionType: '',
    transactionAmount: 0
  };

  transactionDetailList: TransactionDetailModel[] = [];

  @ViewChild('search') searchForm: NgForm;
  defaultAccNo = '1234567890123456';
  defaultTransNo = '1234567903';

  constructor(private restService: RestServerService) { }

  ngOnInit() {
  }

  //Another approach using View Childs.

  onSubmit() {

    this.accNo = this.searchForm.value.accountnumber;
    this.transNo = this.searchForm.value.transactionnumber;

    if (this.accNo !== '') {
      this.restService.getTransactionsByAccNo(this.accNo)
        .subscribe((response: Response) => {
          this.transactionDetailList = response.json();
          console.log(this.transactionDetailList);
          this.submittedAccNo = true;
          this.submittedTransId = false;
          //this.submittedAccNo = true;
        }
          ,
          (error) => {
            console.log(error);
            throw error;
          });
    } else if (this.transNo !== '') {
      console.log("DEBUGGER getTransaction...");
      this.restService.getTransaction(this.transNo)
        .subscribe((response: Response) => {
          //this.transactionDetail = response.json();
          this.transactionDetailList = response.json();
          //console.log("RESPONSE :" + this.transactionDetail);
          this.submittedTransId = true;
          this.submittedAccNo = false;
          //this.submittedAccNo = true;
        }
          ,
          (error) => {
            console.log(error);
            throw error;
          });

    }
    console.log(this.searchForm);
  }
}
