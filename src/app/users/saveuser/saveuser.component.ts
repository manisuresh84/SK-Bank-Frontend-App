import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInfoModel } from 'src/app/model/userinfo.model';
import { RestServerService } from 'src/app/services/restserver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saveuser',
  templateUrl: './saveuser.component.html',
  styleUrls: ['./saveuser.component.css'],
  providers: [RestServerService]
})
export class SaveuserComponent implements OnInit {

  @ViewChild('saveuser') saveUserForm: NgForm;
  defaultAccNo = '1234567890123456';
  defaultAccType = 'Salary';
  defaultAccHolderName = 'Suresh Kumar Mani';
  defaultAmt = '10000';

  user: UserInfoModel = {
    accountNumber: '',
    accountType: '',
    accountHolderName: '',
    accountBalance: 0
  };

  submitted = false;


  constructor(private restService: RestServerService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    this.submitted = true;

    this.user.accountNumber = this.saveUserForm.value.accountNumber;
    this.user.accountType = this.saveUserForm.value.accountType;
    this.user.accountHolderName = this.saveUserForm.value.accHolderName;
    this.user.accountBalance = this.saveUserForm.value.amount;

    // console.log(this.saveUserForm);
    this.restService.storeUser(this.user)
      .subscribe((response) => console.log(response),
        (error) => {
          console.log(error);
          throw error;
        });
    this.saveUserForm.reset();

    this.router.navigateByUrl('users');
  }
}
