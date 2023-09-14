import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service'; 
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/card';

@Component({
  selector: 'app-full-card',
  templateUrl: './full-card.component.html',
  styleUrls: ['./full-card.component.scss']
})
export class FullCardComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute) { }

  public card!: Card;

  ngOnInit() {
      this.route.params.subscribe(params => {
          let id = params['id'];
          this.card = this.data.getCardById(id)!;
          if (this.card == undefined) {
            this.getCardOnRefresh(id);
          }
      });
}

getCardOnRefresh(x: string) {
  this.data.getCardByName(x)
  .subscribe(success => {
    if(success){
    this.card = this.data.card;
    }
  });
}

}
