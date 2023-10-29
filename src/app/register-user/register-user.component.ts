import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { RegisterUser } from '../models/register-user';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public user: RegisterUser = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  }

  public hide = true;

  constructor(private route: Router, private data: DataService) { }

  ngOnInit(): void {
  }

  onRegister() : void {
    this.data.registerUser(this.user)
    .subscribe({
      next: (response)=> {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

}
