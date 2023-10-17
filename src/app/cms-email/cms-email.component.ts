import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-cms-email',
  templateUrl: './cms-email.component.html',
  styleUrls: ['./cms-email.component.scss']
})
export class CmsEmailComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {
    if (this.data.loginRequired) {
      let validToken = this.data.validateToken(this.data.getToken());
      if (!validToken) {
        this.router.navigate(['/login']);
      } 
  }
  }

  goToManageMessages(): void {
    this.router.navigate(['manage-messages']);
  }
  goToContentCreator(): void {
    this.router.navigate(['select-card']);
  }

  cancel(): void {
    this.router.navigate(['card']);
  }

}
