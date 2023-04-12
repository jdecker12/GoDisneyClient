import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Component({
  selector: 'app-gdb-hero',
  templateUrl: './gdb-hero.component.html',
  styleUrls: ['./gdb-hero.component.scss']
})
export class GdbHeroComponent implements OnInit {

  constructor(private data: DataService) { }

    cards$!: Observable<Card[]>;

    ngOnInit() {
        this.cards$ = this.data.loadCardLinks('Main');
    }

    truncEight(x: string): string {
       return  x.slice(x.indexOf('-') + 1);
    }

}
