import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.css']
})
export class CardMenuComponent implements OnInit {
  @Input() dish : any;

  constructor() { }

  ngOnInit(): void {
  }

}
