import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-btm-sheet',
  templateUrl: './btm-sheet.component.html',
  styleUrls: ['./btm-sheet.component.scss']
})
export class BtmSheetComponent implements OnInit {

  @Input() privacy:any;
  @Input() terms: any;
  constructor(private _bottomSheet: MatBottomSheet) { }

  public labelText!: string;
  public asPrivacy: boolean = false;
  public asTerms: boolean = false;

  openBottomSheet(): void {
      this._bottomSheet.open(BottomSheetOverviewExampleSheet, {data: [this.asPrivacy, this.asTerms]});
  }

  ngOnInit() {
      this.chooseDisclaimer();
  }

  chooseDisclaimer(): boolean {
      if (this.privacy) {
          this.labelText = 'Privacy Policy';
          this.asPrivacy = true;
      } else if (this.terms) {
          this.labelText = "Terms of Use";
          this.asTerms = true;
      }

      return true;
  }

}//end class

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
 

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }
  public asPrivacy: boolean = this.data[0];
  public asTerms: boolean = this.data[1];
   
  openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
  }
}//end class
