import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { RegisterUser } from '../models/register-user';

@Component({
  selector: 'app-register-user-admin',
  templateUrl: './register-user-admin.component.html',
  styleUrls: ['./register-user-admin.component.scss']
})
export class RegisterUserAdminComponent implements OnInit {
  public user: RegisterUser = {
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    userRole: ''
  }

  public snackBarMssg: string ='';
  public snackBarAction: string = '';

  public hide = true;

  constructor(private route: Router, private data: DataService) { }

  ngOnInit(): void {
  }

  onRegisterAdmin() : void {
    this.data.registerUser(this.user)
    .subscribe({
      next: ()=> {
          this.snackBarAction = 'Success';
          this.snackBarMssg = 'User Created Successfully';
      },
      error: (err) => {
        console.log(err);
        this.snackBarAction = 'Fail';
        this.snackBarMssg = 'User not created';
      }
    });
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

}
