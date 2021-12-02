import { Component, OnInit } from '@angular/core';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';

@Component({
  selector: 'app-history-order-chef',
  templateUrl: './history-order-chef.component.html',
  styleUrls: ['./history-order-chef.component.css']
})
export class HistoryOrderChefComponent implements OnInit {

  getOrderSaveChef: any[]= [];

  constructor(private firebaseService: firebaseFunctionsService ) { }

  ngOnInit(): void {
    this.showDataEndChef();
  }
  showDataEndChef() {
    this.firebaseService.getOrderData().subscribe((order: any[]) => {
      this.getOrderSaveChef = order;
    });
  }

}
