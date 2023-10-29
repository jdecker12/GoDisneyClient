import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

import * as jwt from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GodisneyClient';

  constructor(private data: DataService) { }

  ngOnInit(): void {
    const token: any = localStorage.getItem('authToken') as string | null;

    this.checkTokenExpiration(token);
    this.validateToken(token);
  }

  checkTokenExpiration(token: string): boolean {
    var decoded: any;
    let isExpired: boolean = false;
    if (token) {
      decoded = jwt.jwtDecode(token);
      isExpired = decoded.exp <= Date.now() / 1000;
    }

    if (isExpired) {
      localStorage.removeItem('authToken');
    }
    return isExpired;
  }

  validateToken(token: string): boolean {
    let isValid: boolean = false;
    if (token) {
      this.data.validateToken(token)
        .subscribe({
          next: (response) => {
            isValid = response;
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
    return isValid
  }

}
