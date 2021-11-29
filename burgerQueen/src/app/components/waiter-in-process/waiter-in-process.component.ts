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
        console.log("trae el array", this.getOrderSave);

      });

    // console.log('Aqui esta el servicio', this.orderSave);
    // this.getOrderData();
  }

  // getOrderData(): any {
  //   this.orderSave.forEach((e: any) => {
  //     let newOrderElement = new Order();
  //     newOrderElement.creationTime = new Date(e.data().date.seconds * 1000);
  //     newOrderElement.nameClient = e.data().nameClient;
  //     newOrderElement.table = e.data().table;
  //     e.data().products.forEach((i: any) => {
  //       let newProduct = new Product();
  //       newProduct.count = i.count;
  //       newProduct.nameProduct = i.nameProduct;
  //       newProduct.price = i.price;
  //       newOrderElement.products.push(newProduct);
  //       this.orderProducts.push(newProduct);
  //     });
  //     this.orderElement.push(newOrderElement);
  //     // console.log("aquiiiii", new Date(e.data().date.seconds * 1000).getTime());
  //   });
  //   return this.orderElement//.sort((a: any, b: any) => b.creationTime - a.creationTime);
  // }

  // arrayOrderSend(){
  //   this.sendCardsService.carryCards$.emit(this.orderElement);

  // }
}
