import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, NavigationEnd } from '@angular/router';

import { Card } from '../../models/card';
import { window } from 'rxjs/operators';
import { SignalrHubServiceService } from 'src/app/service/signalr-hub-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public initAnimation: boolean = false;

  public signlrName: string = '';
  public sgnlrMssage: string = '';
  public signlrMessageList: any[] = [];
  public signlrResponse = {
    user: this.signlrName,
    message: this.sgnlrMssage
  }


  constructor(private data: DataService, private router: Router, private renderer: Renderer2, private signalrService: SignalrHubServiceService) { }
  public cards: Card[] = [];

  ngOnInit(): void {
    this.router.events.subscribe(event => {
        var myWindow = document.getElementById('mat-sidenav-content');
        if (event instanceof NavigationEnd) {
          this.renderer.setProperty(myWindow, 'scrollY', 0);
        }
      });
      this.data.loadCardsByCategory('Main')
          .subscribe((success: any) => {
              if (success) {
                  this.cards = this.data.cards;
                  return true;
              }
              return;
          });
      setTimeout(() => {
          var cards = document.getElementsByClassName('go-dis-card');
          if (cards.length > 0) {
            var crdArr = Array.from(cards);
            crdArr[0].classList.add('first-card');
          }
      }, 3000);


      this.animateOnScroll();

      this.signalrService.onChatMessageReceived((user, message) => {
        console.log(`Received message from ${user}: ${message}`);
        if (user && message) {
         const newMessage = {user, message}

          this.signlrMessageList.push(newMessage)
        }
        
    });

  }//end onInit


  animateOnScroll(): void {
      var myWindow = document.getElementById('mat-sidenav-content');
      if (myWindow) {
        myWindow.onscroll = () => {
          setTimeout(() => {
              var myElems = document.getElementsByClassName('go-dis-card');
              if (myElems.length > 0) {
                var cardArr = Array.from(myElems);
                cardArr.forEach((element) => {
                    var myCard = element.getBoundingClientRect();
                    if (myCard.top <= 900 && !element.classList.contains('first-card')) {
                        element.classList.add('scroll-animation');
                    }
                });//end foreach
              }
          }, 1000);
      }//end onscroll
    }
  }//end amimateOnScroll

  sendMessage(user: string, message: string) {
    console.log(`Sending message from ${user}: ${message}`);
    this.signalrService.sendChatMessage(user, message);
}


}
