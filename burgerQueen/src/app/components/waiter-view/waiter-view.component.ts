import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css']
})
export class WaiterViewComponent implements OnInit {
  clientName = '';
  tableNumber = '';
  constructor() { }

  ngOnInit(): void {
  }

}
