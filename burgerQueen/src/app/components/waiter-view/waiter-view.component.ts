import { Component, OnInit } from '@angular/core';
/* import * as data from '../../../assets/aquelarreMenu.json'; */

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css']
})
export class WaiterViewComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  clientName = '';
  tableNumber = '';

  /* getJsonContent(){
    return (data as any);
  } */
}
