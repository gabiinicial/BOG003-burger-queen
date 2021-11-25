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
  orderProducts: Product[] =[];
  
  constructor(private firebaseService: firebaseFunctionsService, private sendOrderFirebase:getDataFirestore) {}
  
  ngOnInit(): void {
    this.firebaseService.getData();
    this.showDataFirebase();
    this.getOrderData();
  }
  showDataFirebase() {
    this.showFirestoreDate = this.firebaseService
    .getData()
      ?.subscribe((order) => {
        order.forEach((e) => {
          this.orderSave.push(e.payload.doc);
        });
      });
      console.log('Aqui esta el servicio', this.orderSave);
      this.getOrderData();
    }
    
    getOrderData():any {
      this.orderSave.forEach((e: any) => {
      let newOrderElement = new Order();
      newOrderElement.creationTime = e.data().date;
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
      console.log("aquiiiii", Date.parse(e.data().date.seconds), new Date(e.data().date.seconds));
    });
    return this.orderElement.sort((a: any,b: any)=>a.date-b.date);
  }
 sendOrdersService(){
  this.sendOrderFirebase.sendOrders$.emit(this.orderElement);
  } 
}
