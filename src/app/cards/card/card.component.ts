import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, NavigationEnd } from '@angular/router';

import { Card } from '../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public initAnimation: boolean = false;

  constructor(private data: DataService, private router: Router, private renderer: Renderer2) { }
  public cards: Card[] = [];
  private page: number = 1;
  private pageSize: number = 3;
  private isLoading: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      var myWindow = document.getElementById('mat-sidenav-content');
      if (event instanceof NavigationEnd) {
        this.renderer.setProperty(myWindow, 'scrollY', 0);
      }
    });

    this.getCardsThreeAtATime();
    setTimeout(() => {
      var cards = document.getElementsByClassName('go-dis-card');
      if (cards.length > 0) {
        var crdArr = Array.from(cards);
        crdArr[0].classList.add('first-card');
      }
    }, 1000);
    this.animateOnScroll();
  }//end onInit

  animateOnScroll(): void {
    var myWindow = document.getElementById('mat-sidenav-content');
    if (myWindow) {
      myWindow.onscroll = () => {
        setTimeout(() => {
          var myElems = document.getElementsByClassName('go-dis-card');
          if (myElems.length > 0) {
            this.isLoading = false;
            var cardArr = Array.from(myElems);
            this.fetchContentOnScroll(cardArr);// infinite scrolling 
            this.animateCards(cardArr);// adds animations to cards
          }
        }, 1000);
      }//end onscroll
    }
  }//end amimateOnScroll

  getCardsThreeAtATime(): any {
    this.data.getCardsThreeAtATime('Main', this.page, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response) {
            response.forEach((x) => {
              this.cards.push(x);
            });
            return this.cards;
          }
          return;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  fetchContentOnScroll(cardArr: any): void {
    let lastCard = cardArr[cardArr.length - 1];
    let lastPos = lastCard.getBoundingClientRect();
    if (lastPos.top <= 500 && !this.isLoading) {
      this.isLoading = true;
      this.page++;
      this.getCardsThreeAtATime();
    }
  }

  animateCards(cardArr: any): void {
    cardArr.forEach((element: any) => {
      var myCard = element.getBoundingClientRect();
      if (myCard.top <= 900 && !element.classList.contains('first-card')) {
        element.classList.add('scroll-animation');
      }
    });//end foreach
  }
}
