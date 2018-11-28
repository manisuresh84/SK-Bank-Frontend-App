import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { RestServerService } from '../services/restserver.service';
import { PerformTransactionModel } from '../model/performtranaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [RestServerService]
})
export class TransactionComponent implements OnInit {

  @ViewChild('transaction') transactionForm: NgForm;
  defaultAccNo = '1234567890123456';
  defaultTransType = 'Withdrawal';
  defaultTransDesc = 'For Personal';
  defaultTransAmt = '5000';

  transDetail: PerformTransactionModel = {
    transactionType: '',
    transactionDescription: '',
    transactionAmount: 0
  };

  submitted = false;
  accNo: string = '';
  responseStatus: number = 0;

  constructor(private restService: RestServerService, private alertService: AlertsService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    this.accNo = this.transactionForm.value.accountnumber;
    this.transDetail.transactionType = this.transactionForm.value.transactiontype;
    this.transDetail.transactionDescription = this.transactionForm.value.transactiondescription;
    this.transDetail.transactionAmount = this.transactionForm.value.transactionamount;

    this.submitted = true;

    this.restService.performTransaction(this.accNo, this.transDetail)
      .subscribe((response) => {
        console.log(response);
        this.responseStatus = response.status;
        console.log("HTTP Status Code :" + this.responseStatus);
        if (this.responseStatus === 200) {
          this.onSuccess("Successfully performed" + this.transDetail.transactionType + "transaction!");
        }
      },
        (error) => {
          console.log(error);
          throw error;
        });
    this.transactionForm.reset();
    this.router.navigateByUrl('users');
  }

  onSuccess(message: string) {
    this.alertService.setMessage(message, 'success');
  }

  onError(message: string) {
    this.alertService.setMessage(message, 'error');
  }

  onWarn(message: string) {
    this.alertService.setMessage(message, 'warn');
  }

}
