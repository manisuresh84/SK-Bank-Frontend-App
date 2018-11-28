import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestServerService } from 'src/app/services/restserver.service';
import { UserInfoModel } from 'src/app/model/userinfo.model';
import { stringify } from '@angular/core/src/render3/util';
import { Response } from '@angular/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [RestServerService]
})
export class UserComponent implements OnInit {

  submitted = false;
  user: UserInfoModel = {
    accountNumber: '',
    accountType: '',
    accountHolderName: '',
    accountBalance: 0
  };
  accNo: string;
  //user: {id: number, name: string};
  defaultUserName = 'Suresh Kumar Mani';
  defaultAccNo = '1234567890123456';
  @ViewChild('searchUser') searchUserForm: NgForm;
  constructor(private router: Router, private restService: RestServerService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.accNo = this.searchUserForm.value.accountnumber;
    console.log(this.accNo);
    this.restService.getUser(this.accNo)
      .subscribe((response: Response) => {
        this.user = response.json();
        console.log(this.user);
        this.submitted = true;
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });
    console.log(this.searchUserForm);
  }

  onAddUser() {
    console.log("On Add User!");
    this.router.navigateByUrl('saveuser');
  }
}
