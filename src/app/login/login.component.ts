import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  scrmblArr: string[] = [];
  decArr: string[] = [];
  dumStr: string = 'jhbkfjbkjbfavf';
  uPass!: string;
  uName!: string;

  constructor(private route: Router, private data: DataService) { this.uncheck();}

  public hide = true;
  private storeCred: any = [];
  private keyArr: any = [];
  public errMessage: string = '';
  public creds = {
      username: '',
      password: ''
      }

  public checked: boolean = false;

  onLogin() {
    this.data.login(this.creds)
        .subscribe({
          next: () => {
            this.route.navigate(["select-card"]); 
            if (this.checked == true) {
              this.enc(this.creds);
            }
          },
          error: () => {
            this.errMessage = "Failed to log in";
          }
         })
}

  ngOnInit() {
     this.dec();
      if (this.uName !== undefined) {
          this.creds.username = this.decoder(this.uName);
          this.creds.password = this.decoder(this.uPass);
          this.checked = true;
      }
  }

  decoder(jumbledString: any) :string {
    let mydecoder = new TextDecoder();
    return mydecoder.decode(jumbledString);
  }
  
  uncheck() {
      if (this.checked == true) {
          localStorage.removeItem('exp');
          this.checked != this.checked;
          localStorage.removeItem('tryhardernexttime');
          localStorage.removeItem('doesnotworkforyou');
          this.creds.username = '';
          this.creds.password = '';
      }
  }

  enc(str: any): string {
      this.uName = str.username;
      this.uPass = str.password;
      let concat = this.uName + this.dumStr + this.uPass;

      for (var i = 0; i < concat.length; i++) {
          let keyNum = Math.random() * 10;
          let ascVal: number = concat.charCodeAt(i);
          keyNum = Math.floor(keyNum);
          let newVal: number = ascVal + keyNum;
          if (newVal > 122) {
              keyNum = 0;
              newVal = ascVal + keyNum;
          }
          let curr = String.fromCharCode(newVal);

          this.keyArr.push(keyNum); // needs to be saved to db
          this.storeCred.push(curr);
      }
      var encCred = this.storeCred.join("");
      //scramble keyArr
      this.keyArr.reverse();
      var encKey = this.keyArr.join("");

      for(let k = 0; k < this.keyArr.length; k++) {
          let askey = encKey.charCodeAt(k);
          this.scrmblArr.push(askey + '0OeKgYj');
      }
      let keyStr = this.scrmblArr.join("");
      localStorage.setItem('tryhardernxttime', encCred);
      localStorage.setItem('doesnotworkforyou', keyStr);
      return encCred;
  }


  dec(): void {
      let encCred: string | null = localStorage.getItem('tryhardernxttime');
      let decCred : string | null =  localStorage.getItem('doesnotworkforyou');

      if (encCred !== null && decCred !== null) {
          let scrmArr = decCred.split('0OeKgYj');
          scrmArr.reverse();
          scrmArr.shift();

          for (var i = 0; i < encCred.length; i++) {
              let askeyVal = String.fromCharCode(parseInt(scrmArr[i]));
              let mgk = parseInt(askeyVal);
              let ascVal: number = encCred.charCodeAt(i);
              let initEnc = ascVal - mgk;
              let decoded = String.fromCharCode(initEnc);
              this.decArr.push(decoded);
          }

          let decCreds = this.decArr.join("");
          let uname = decCreds.replace(this.dumStr, " ");
          this.uPass = uname.slice(uname.indexOf(" ") + 1);
          this.uName = uname.split(" ", 1).toString();
          localStorage.removeItem('tryhardernxttime');
          localStorage.removeItem('doesnotworkforyou');
      }
  }

  cancel() {
      this.route.navigate(["/"]);
  }

}
