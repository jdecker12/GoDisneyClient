import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Contact } from '../models/contact';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-messages',
  templateUrl: './manage-messages.component.html',
  styleUrls: ['./manage-messages.component.scss']
})
export class ManageMessagesComponent implements OnInit {

  messages: any;
  snackBarMssg:string = '';
  snackBarAction: string = '';
  emptyMessageBox: string = 'You have no new messages :('


  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    if (this.data.loginRequired) {
      this.router.navigate(['/login']);
  }
    this.data.getAllMessages()
    .subscribe({
      next: (success) => {
        console.log(success);
        this.messages = success;
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteMessage(name: string): void {
    const index = this.messages.indexOf(name);
    this.data.deleteMessage(name)
    .subscribe({
      next: (response) => {
        if (response) {
          this.snackBarMssg = 'Delete Succeeded'
          this.snackBarAction = 'Sucess!'
          this.messages.splice(index, 1);
        } else {
          this.snackBarMssg = 'Delete Failed'
          this.snackBarAction = ':('
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
