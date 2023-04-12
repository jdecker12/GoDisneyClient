import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private data: DataService) { }

  card$!: Observable<Card[]>;

  copyDate: number = new Date().getFullYear();

  public privacy: any;
  public terms: any;

  ngOnInit() {
      this.card$ = this.data.loadCardsByCategory('Main');
      this.privacy = document.getElementById('privacy');
      this.terms = document.getElementById('terms');
  }

}
