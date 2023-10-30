
import { Component, NgZone, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Card } from '../models/card';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, AfterViewInit {

  navActive: boolean = false;
    cardData: Card[] = [];

    private loadCardsSubscription!: Subscription;
    

    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);
    private iphoneMediaMatcher: MediaQueryList = matchMedia(`(min-device-width : 375px) 
    and (max-device-width : 667px)`);
    private iphone8MediaMatcher: MediaQueryList = matchMedia(`(min-device-width : 375px) 
    and (max-device-width : 667px)`);
    private iphoneXMediaMatcher: MediaQueryList = matchMedia(`and (device-width : 375px) 
    and (device-height : 812px) 
    and (-webkit-device-pixel-ratio : 3)`);
        

    constructor(private zone: NgZone, private breakpointObserver: BreakpointObserver, private data: DataService, private router: Router, private viewportScroller: ViewportScroller) {
        this.mediaMatcher.addListener(mql => 
            zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));

        this.iphoneMediaMatcher.addListener(mql => 
            zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 375px) 
            and (max-device-width : 667px)
            and (-webkit-device-pixel-ratio : 2)`)));

            this.iphone8MediaMatcher.addListener(mql => 
                zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 414px) 
                and (max-device-width : 736px)
                and (-webkit-device-pixel-ratio : 3)`)));

                this.iphone8MediaMatcher.addListener(mql => 
                    zone.run(() => this.iphoneMediaMatcher = matchMedia(`(min-device-width : 375px) 
                    and (max-device-width : 812px)
                    and (-webkit-device-pixel-ratio : 3)`)));

            breakpointObserver.observe([
                Breakpoints.HandsetLandscape,
                Breakpoints.HandsetPortrait
              ]).subscribe(result => {
                if (result.matches) {
                 this.isScreenSmall() == true;
                }
              });
    }

    ngOnInit() {
        this.loadCardsSubscription = this.data.loadCards()
            .subscribe((success: any) => {
                if (success) {
                    this.cardData = this.data.cards;
                    return true;
                }
                return false;          
            });
}

public renderSpinner: boolean = false;

ngAfterViewInit(): void {
}
    events: string[] = [];
    opened: boolean = false;
    navTrue: boolean = false;

    public testArr: any[] = [];

    isScreenSmall(): boolean {
       if(this.iphoneMediaMatcher.matches == true || this.mediaMatcher.matches == true || this.iphone8MediaMatcher.matches == true || this.iphoneXMediaMatcher.matches == true) {
        this.navTrue = false;
        return true;
       }
       return false;
    }

    get isLoaded(): boolean {
        const imageElements = document.getElementsByTagName('img').length;
        console.log(imageElements);

        return (this.cardData.length >= imageElements) || imageElements == 1;
      }

      get isSpecificElementPresent(): boolean {
        const selector = 'mat-card#card-1.mat-card.mat-focus-indicator.go-dis-card.mat-elevation-z13.fade-in.first-card';
        const isFullCard = document.querySelector('#full-card');
        const element = document.querySelector(selector);
        const contact = document.querySelector('#contact');
        const about = document.querySelector('#about');
        const admin = document.querySelector('#admin');
        const mssgs = document.querySelector('#manage-messages');
        const slctcrd = document.querySelector('#select-card');

        let test = !!isFullCard || !!element || !!about || !!contact || !!admin || !!mssgs || !!slctcrd? true : false;

        return test; 
      }
      

    

    onAdmin(): void {
        this.data.loginRequired ? this.router.navigate(['login']) : this.router.navigate(['cms-email']);
    }

    ngOnDestroy(): void {
      this.loadCardsSubscription.unsubscribe();
    }

}
