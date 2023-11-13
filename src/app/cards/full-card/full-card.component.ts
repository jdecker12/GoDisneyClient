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
  private routeParamsubscription!: Subscription;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { }

  public card!: Card;
  //public cardId!: number;
  public hasCardImgThree:boolean = false;
  private cardName!: string;

  ngOnInit() {
    this.routeParamsubscription = this.route.params.subscribe(params => {
      this.cardName = params['cardName'];
      this.getCard(params['cardName']);
    });

    this.card = this.data.card;

    if (this.card == undefined) {
      this.getCardOnRefresh(this.cardName);
    }
    this.hasCardImg3();
  }///end ngOnInit

  // functions//////////////////////////
  getCard(cardName: string ): any {
    return this.data.getCardByName(cardName).subscribe({
      next: (response) => {
        this.card = response;
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }

  hasCardImg3(): boolean {
    this.hasCardImgThree = (this.card !== undefined && this.card.cardImg3 !== undefined) ? this.hasCardImgThree = true : this.hasCardImgThree = false; 
    return this.hasCardImgThree;
  }

  getCardOnRefresh(x: string) {
    this.data.getCardByName(x)
      .subscribe(success => {
        if (success) {
          console.log(success);
          this.card = success;
        }
      });
  }


goBackToList() {
  this.router.navigate(['/card']);
}

  ngOnDestroy(): void {
    this.routeParamsubscription.unsubscribe();
  }

}
