import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms-email',
  templateUrl: './cms-email.component.html',
  styleUrls: ['./cms-email.component.scss']
})
export class CmsEmailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
