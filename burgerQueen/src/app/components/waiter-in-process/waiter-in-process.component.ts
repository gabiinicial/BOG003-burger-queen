import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/classes/order';
import { Product } from 'src/app/classes/orderProduct';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';
import { getDataFirestore } from 'src/app/services/get-data-Firestore';

@Component({
  selector: 'app-waiter-in-process',
  templateUrl: './waiter-in-process.component.html',
  styleUrls: ['./waiter-in-process.component.css'],
})
export class WaiterInProcessComponent implements OnInit {

  orderSave: any = [];
  showFirestoreDate: Subscription | undefined;
  orderElement: any = [];
  orderProducts: Product[] = [];
  isTimer: boolean = false;
  timerCount: number = 0;
  sendOrdersSubscription: Subscription | undefined;
  isActive: boolean = false;

  constructor(private firebaseService: firebaseFunctionsService) { }

  ngOnInit(): void {
    this.firebaseService.getData();
    this.showDataFirebase();
    setTimeout(() => {
      this.getOrderData();
    }, 100);
    
  }

  showDataFirebase() {
    this.showFirestoreDate = this.firebaseService
      .getData()
      ?.subscribe((order) => {
        order.forEach((e) => {
          this.orderSave.push(e.payload.doc);
        });
      });
    // console.log('Aqui esta el servicio', this.orderSave);
    this.getOrderData();
  }

  getOrderData(): any {
    this.orderSave.forEach((e: any) => {
      let newOrderElement = new Order();
      newOrderElement.creationTime = new Date(e.data().date.seconds * 1000);
      newOrderElement.nameClient = e.data().nameClient;
      newOrderElement.table = e.data().table;
      e.data().products.forEach((i: any) => {
        let newProduct = new Product();
        newProduct.count = i.count;
        newProduct.nameProduct = i.nameProduct;
        newProduct.price = i.price;
        newOrderElement.products.push(newProduct);
        this.orderProducts.push(newProduct);
      });
      this.orderElement.push(newOrderElement);
      // console.log("aquiiiii", new Date(e.data().date.seconds * 1000).getTime());
    });
    return this.orderElement//.sort((a: any, b: any) => b.creationTime - a.creationTime);
  }

  timer() {
    this.orderSave.forEach((e: any) => {

      console.log("Contador", e.data().nameClient, new Date(Date.now() - e.data().date.nanoseconds).getMinutes());

    });
  }

}
