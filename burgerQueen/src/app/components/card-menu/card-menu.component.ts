import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.css']
})
export class CardMenuComponent implements OnInit {
  @Input() addDish : any;
  @Input() myDish: any;
  @Input() incrementNumber:any;
  @Input() decrementNumber:any;
  @Input() screen:any;
  value : number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
