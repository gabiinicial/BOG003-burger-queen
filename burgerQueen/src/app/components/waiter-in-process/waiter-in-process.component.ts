import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/classes/order';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';

@Component({
  selector: 'app-waiter-in-process',
  templateUrl: './waiter-in-process.component.html',
  styleUrls: ['./waiter-in-process.component.css'],
})
export class WaiterInProcessComponent implements OnInit {
  orderSave: any = [];
  showFirestoreDate: Subscription | undefined;

  constructor(private firebaseService: firebaseFunctionsService) {}

  ngOnInit(): void {
    this.showFirestoreDate = this.firebaseService.getOrders$?.subscribe(
      (order) => {
        this.orderSave = order;
      }

    );
  }

  showDataFirebase() {
    this.firebaseService.getData();
    console.log('Aqui esta el servicio', this.orderSave);
  }
}
