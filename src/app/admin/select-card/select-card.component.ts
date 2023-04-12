import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Card} from '../../models/card';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
//import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss']
})
export class SelectCardComponent implements OnInit {

  cardLink: any;
 
  constructor(private data: DataService, private router: Router) { }
  public images: string[] = [];
  public cards: Card[] = [];
  public card!: Card;
  public name: any;
  public formValue: any;
  public selected: boolean = false;
  public result: any;
  public crdCntns: any;
  public isChecked!: string;

  updateCardForm!: FormGroup;
  cardContents!: FormGroup;
  radioGroup!: FormControl;
  cardCategory!: FormControl;
  cardTitle!: FormControl;
  cardIcon!: FormControl;
  cardImg!: FormControl;
  cardImg3!: FormControl;
  cardLinkName!: FormControl;
  paraOne!: FormControl;
  paraTwo!: FormControl;
  paraThree!: FormControl;
  paraFour!: FormControl;
  cardId!: FormControl;


  ngOnInit() {
      if (this.data.loginRequired) {
          this.router.navigate(['/login']);
      }
      this.data.getImageList()
      .subscribe((success) => {
          if(success) {
             this.images  = success as Array<string>;
          }
      });

      this.card = new Card();
      this.data.loadCards()
          .subscribe((success: any) => {
              if (success) {
                  this.cards = this.data.cards;
                 
              }
          })
      let radioGroup = new FormControl('new');
      let cardTitle = new FormControl();
      let cardCategory = new FormControl('Main');
      let cardIcon = new FormControl('');
      let cardImg = new FormControl('');
      let cardImg3 = new FormControl('');
      let cardLink = new FormControl('');
      let cardLinkName = new FormControl('');
      let paraOne = new FormControl('');
      let paraTwo = new FormControl('');
      let paraThree = new FormControl('');
      let paraFour = new FormControl('');
      
      this.updateCardForm = new FormGroup({
          radioGroup: radioGroup,
          cardTitle: cardTitle,
          cardCategory: cardCategory,
          cardIcon: cardIcon,
          cardImg: cardImg,
          cardImg3: cardImg3,
          cardLink: cardLink,
          cardLinkName: cardLinkName,
          cardContents: new FormGroup({
              paraOne: paraOne,
              paraTwo: paraTwo,
              paraThree: paraThree,
              paraFour: paraFour,
              })
         
      });
  }/////end of onInit

  onSelected(imgName: string[]) {
      if(imgName[1] === '1') {
          this.updateCardForm.patchValue({cardImg: imgName[0]})
      }else {
          this.updateCardForm.patchValue({cardImg3: imgName[0]})
      }
      
  }

  clearForm() {
      this.updateCardForm.reset();
      this.card.cardImg = '';
      this.card.cardIcon = '';
  }

  getErrorMessage() {
      return this.cardTitle.hasError('required') ? 'You must enter a value' : '';
  }

  updateFormData(formValue: { cardContents: any[]; }) {
      formValue.cardContents = [formValue.cardContents];
      this.data.updateCard(this.card.cardTitle, formValue)
          .subscribe((success: any) => {
              if (success) {
                  this.card = new Card();
                  this.router.navigate(['/']);
                  return true;
              }
              return;
          });
  }

  saveFormData(formValue: { cardContents: any[]; }) {
      formValue.cardContents = [formValue.cardContents];
      this.data.admin(formValue)
          .subscribe((success: any) => {
              if (success) {
                  this.card = new Card();
                  this.router.navigate(['/']);
                  return true;
              }

return;
              
          });

  }

  getRadioVal() {
      this.isChecked = this.updateCardForm.get('radioGroup')?.value;
      console.log(this.isChecked);
  }

  deleteSelectCard(): void {
      var name = this.updateCardForm.get('cardTitle')?.value;
      this.data.deleteCard(name)
          .subscribe((success: any) => {
              if (success) {
                  return true;
              }
             return;
          });
      this.router.navigate(['/']);
  }

  selectName(formValue: any) {
      this.data.getCardByName(formValue)
          .subscribe((success: any) => {
              if (success) {
                  this.card = this.data.card;  
                  this.selected = true;
                  var shortHand = this.card.cardContents[0];
                  
                  (this.isChecked == 'update') ? this.radioGroup = new FormControl('update'): this.radioGroup = new FormControl('delete');
                  this.cardTitle = new FormControl(this.card.cardTitle);
                  this.cardCategory = new FormControl(this.card.cardCategory);
                  this.cardIcon = new FormControl(this.card.cardIcon);
                  this.cardImg = new FormControl(this.card.cardImg);
                  this.cardImg3 = new FormControl(this.card.cardImg3);
                  this.cardLink = new FormControl(this.card.cardLink);
                  this.cardLinkName = new FormControl(this.card.cardLinkName);
                  this.paraOne = new FormControl(shortHand.paraOne);
                  this.paraTwo = new FormControl(shortHand.paraTwo);
                  this.paraThree = new FormControl(shortHand.paraThree);
                  this.paraFour = new FormControl(shortHand.paraFour);
                 
                  this.updateCardForm = new FormGroup({
                      radioGroup: this.radioGroup,
                      cardTitle: this.cardTitle,
                      cardCategory: this.cardCategory,
                      cardIcon: this.cardIcon,
                      cardImg: this.cardImg,
                      cardImg3: this.cardImg3,
                      cardLink: this.cardLink,
                      cardLinkName: this.cardLinkName,
                      cardContents: new FormGroup({
                          paraOne: this.paraOne,
                          paraTwo: this.paraTwo,
                          paraThree: this.paraThree,
                          paraFour: this.paraFour,
                      })
                  });
              }
          })
      }

  cancel() {
      this.router.navigate(["/card"]);
  }

}
