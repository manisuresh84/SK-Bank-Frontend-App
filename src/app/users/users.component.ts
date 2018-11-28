import { Component, OnInit } from '@angular/core';
import { RestServerService } from '../services/restserver.service';
import { Response } from '@angular/http';
import { UserInfoModel } from '../model/userinfo.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [RestServerService]
})
export class UsersComponent implements OnInit {

  users: UserInfoModel[] = [];

  filteredUserInfo = '';

  constructor(private restService: RestServerService) { }

  ngOnInit() {
    this.restService.getUsers()
      .subscribe((data: any[]) => {
        this.users = data;
        console.log(this.users);
      }
        ,
        (error) => {
          console.log(error);
          throw error;
        });
  }

}
