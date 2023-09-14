import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, FormRecord} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Images {
  images: string[],
  location:string
}
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
 
  @Input() images = [] as Array<string>;
  @Output() selectImg = new EventEmitter<string[]>();
 
 
  constructor(public dialog: MatDialog) {}
  myselect = new FormControl();
  img?: string;
  selectedImg: string = '';
  myLocation?: string;
  myData: any;

  getSelValue() : string {
      this.selectedImg = this.myselect.value;
      return this.selectedImg;
  }



  openDialog(): void {
    this.getSelValue();
   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '50%',
    data: {images: this.selectedImg, location: ''}
  });

  dialogRef.afterClosed().subscribe(result => {
    let img = result[0];
    let selInput = result[1];
    let nameArr = Array.from(img);
    let count = nameArr.indexOf('.');
    let truncName = nameArr.splice(0, count);
    let imgName = truncName.join("");
    this.selectImg.emit([imgName, selInput]);
  });

  }


  ngOnInit() {
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./image-modal.component.scss']
})
export class DialogOverviewExampleDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Images, private _formBuilder: FormBuilder) {}

    isChecked?: boolean;
    selectImageForm: FormGroup = new FormGroup({
      selectImageRadioGroup: new FormControl('1')
    })

    getRadioVal(): string {
      const selectedValue = this.selectImageForm.get('selectImageRadioGroup');

      this.data.location = selectedValue?.value;
      return this.data.location;
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.selectImageForm = this._formBuilder.group({
      selectImageRadioGroup: [('1')]
    })
  }

}




