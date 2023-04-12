import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  panelOpenState = false;

    cards$!: Observable<Card[]>;

    constructor(private data: DataService) { }

    step:number = 0;

    ngOnInit() {
        this.cards$ = this.data.loadCardsByCategory('News');
    }


    setStep() {
        var n = document.getElementsByClassName('panel');
   
  }

  nextStep() {
      this.step++;
  }

  prevStep() {
    this.step--;
  }

}
