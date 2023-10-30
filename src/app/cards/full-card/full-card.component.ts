import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-full-card',
  templateUrl: './full-card.component.html',
  styleUrls: ['./full-card.component.scss']
})
export class FullCardComponent implements OnInit {
  private fullCardSubscription!: Subscription;
  private routeParamsubscription!: Subscription;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  public card!: Card;

  ngOnInit() {
    this.routeParamsubscription = this.route.params.subscribe(params => {
      let id = params['id'];
      this.card = this.data.getCardById(id)!;
      if (this.card == undefined) {
        this.getCardOnRefresh(id);
      }
    });
  }

  getCardOnRefresh(x: string) {
   this.fullCardSubscription = this.data.getCardByName(x)
      .subscribe(success => {
        if (success) {
          this.card = this.data.card;
        }
      });
  }

  ngOnDestroy(): void {
    this.routeParamsubscription.unsubscribe();
  }

}
