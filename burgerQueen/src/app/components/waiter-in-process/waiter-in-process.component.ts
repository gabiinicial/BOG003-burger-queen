import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/classes/order';
import { Product } from 'src/app/classes/orderProduct';
import { sendDataService } from 'src/app/services/carry-cards';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';
import { getDataFirestore } from 'src/app/services/get-data-Firestore';

@Component({
  selector: 'app-waiter-in-process',
  templateUrl: './waiter-in-process.component.html',
  styleUrls: ['./waiter-in-process.component.css'],
})
export class WaiterInProcessComponent implements OnInit {

  getOrderSave: any = [];
  showFirestoreDate: Subscription | undefined;
  orderProducts: Product[] = [];
  isTimer: boolean = false;
  timerCount: number = 0;
  sendOrdersSubscription: Subscription | undefined;
  isActive: boolean = false;


  constructor(private firebaseService: firebaseFunctionsService, private  sendCardsService: sendDataService) { }

  ngOnInit(): void {
    // this.firebaseService.getOrderData();
    this.showDataFirebase();
  }

  showDataFirebase() {
   this.firebaseService.getOrderData().subscribe((order: any[]) => {
        this.getOrderSave = order;
      });
  }

}
