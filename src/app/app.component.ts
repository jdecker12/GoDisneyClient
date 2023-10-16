import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GodisneyClient';

    constructor(private data: DataService) {}

  ngOnInit(): void {
  //   const token = localStorage.getItem('authToken');
  //   this.data.login()
 }
}
