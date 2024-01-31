import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav-toolbar',
  templateUrl: './sidenav-toolbar.component.html',
  styleUrls: ['./sidenav-toolbar.component.scss']
})
export class SidenavToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('myButton', { static: true }) myButton!: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    const myElem = this.elementRef.nativeElement.querySelector('button #myButton');
    //myElem.style.backgroundColor = 'red';

    console.log(myElem);
  }

  ngAfterViewInit(): void {
    console.log('Component:', this.elementRef.nativeElement);
  
    const myRefElement = this.elementRef.nativeElement.myButton;
    console.log(myRefElement);
  
    if (myRefElement) {
      this.renderer.setStyle(myRefElement, 'background-color', 'red');
    }
  }
  

}
