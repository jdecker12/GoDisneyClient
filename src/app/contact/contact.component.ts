import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { Contact } from '../models/contact';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private data :DataService) { }

  public contact!: Contact;

  public snackBarMssg: string = '';
  public snackBarAction: string = '';
  private initialFormState: any;

  saveContactForm!: FormGroup;
  name!: FormControl;
  email!: FormControl;
  message!: FormControl;

  ngOnInit(): void {
    this.saveContactForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      message: new FormControl()
    });

    this.initialFormState = { ...this.saveContactForm.value };

  }//end oninit

  saveContact(formValue: object) {
    this.data.saveContact(formValue)
    .subscribe({
      next: (response) => {
        if (response) {
          this.contact = new Contact();
          this.snackBarMssg = "Form Submitted";
          this.snackBarAction = "Success!"
          this.clearForm();
          return true;
        } else {
          this.snackBarMssg = "Form Submission Failed"
          this.snackBarAction = ":("
          return false;
        }

      },
      error: (err) => {
        console.log(err);
        return false;
      }
    })
  }

  clearForm(): void {
    this.saveContactForm.setValue(this.initialFormState);

    if (this.saveContactForm){
      Object.keys(this.saveContactForm.controls).forEach(controlName => {
        this.saveContactForm.get(controlName)?.markAsUntouched();
    });
  }
 
      
      
    
    
  }



}
