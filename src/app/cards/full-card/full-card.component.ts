import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { }

  public card!: Card;
  public cardId!: number;
  public hasCardImgThree:boolean = false;

  ngOnInit() {
    this.routeParamsubscription = this.route.params.subscribe(params => {
      let id = params['id'];
      let cardid = parseInt(params['i']) + 1;
      this.cardId = cardid;
      this.card = this.data.getCardById(id)!;
      if (this.card == undefined) {
        this.getCardOnRefresh(id);
      }
    });

    this.hasCardImg3();
  }


  hasCardImg3(): boolean {
    return (this.card !== undefined && this.card.cardImg3 !== null) ? this.hasCardImgThree = true : this.hasCardImgThree = false; 
  }

  getCardOnRefresh(x: string) {
   this.fullCardSubscription = this.data.getCardByName(x)
      .subscribe(success => {
        if (success) {
          console.log(success);
          this.card = this.data.card;
        }
      });
  }

// In FullCardComponent
goBackToList() {
  console.log('cardId ' + this.cardId);
  this.router.navigate(['/card'], { queryParams: { selectedCardId: this.cardId } });
}


  ngOnDestroy(): void {
    this.routeParamsubscription.unsubscribe();
  }

}
