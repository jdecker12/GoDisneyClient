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
  public hasCardImgThree:boolean = false;
  private cardName!: string;

  public test: boolean = this.data.hasCardImg3;

  ngOnInit() {
    this.routeParamsubscription = this.route.params.subscribe(params => {
      this.cardName = params['cardName'];
      this.data.getCardByName(this.cardName)
      .subscribe({
        next: (response) => {
          this.card = response;
          if (response.cardImg3 !== ''){
            this.hasCardImgThree = true;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
      
    });
    console.log(this.test + 'test is here');
    this.card = this.data.card;

    if (this.card == undefined) {
      this.getCardOnRefresh(this.cardName);
    }
   
  }///end ngOnInit

  // functions//////////////////////////
  getCard(cardName: string ): any {
    this.data.getCardByName(cardName).subscribe({
      next: (response) => {
       this.card = response;
        if (this.card.cardImg3) {
        this.hasCardImgThree = true;
        }
        return response;
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCardOnRefresh(x: string): any {
    return this.data.getCardByName(x)
      .subscribe(success => {
        if (success) {
          this.card = success;
          if(this.card.cardImg3){
            this.hasCardImgThree = true;
          }
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
