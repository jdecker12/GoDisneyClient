import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnChanges {

  @Input() message: string[] = [];

  constructor(private _snackbar: MatSnackBar) { }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['message'].currentValue.every((item: string) => item !== '') ) {
        this.openSnackBar(this.message[0], this.message[1]);
     }
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
    });
  }

}
