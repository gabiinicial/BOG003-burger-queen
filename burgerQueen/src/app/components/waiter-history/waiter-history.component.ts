import { Component, OnInit } from '@angular/core';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';

@Component({
  selector: 'app-waiter-history',
  templateUrl: './waiter-history.component.html',
  styleUrls: ['./waiter-history.component.css']
})
export class WaiterHistoryComponent implements OnInit {
  getOrderSaveChef: any[]= [];

  constructor(private firebaseService: firebaseFunctionsService ) { }

  ngOnInit(): void {
  }
  showDataEndChef() {
    this.firebaseService.getOrderData().subscribe((order: any[]) => {
      this.getOrderSaveChef = order;
    });
  }
}

