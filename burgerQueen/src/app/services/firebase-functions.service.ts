import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../classes/order';
import { Product } from '../classes/orderProduct';
import { Observable } from 'rxjs';
import { query, orderBy } from "firebase/firestore";


@Injectable({
  providedIn: 'root',
  })

export class firebaseFunctionsService {

  order: Order[] = [];
  product: Product[] = [];
  getOrders$: Observable<any[]> | undefined;
  orderSave: any=  [];
  orderElement: any = [];
  orderProducts: Product[] = [];


  constructor(private db: AngularFirestore) {}

  addOrder(order: Order) {
    this.db
      .collection('order')
      .doc()
      .set({
        date: order.creationTime,
        nameClient: order.nameClient,
        table: order.table,
        products: order.products.map((element) =>  element.toFirebase())
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('No se pudo realizar la inserción', err);
      });
  }

  getData(){
    this.getOrders$ = this.db.collection('order', ref => ref.orderBy('date', 'desc')).snapshotChanges();
    console.log("Este es el observable",this.getOrders$);
    this.getOrders$.forEach((e) => {
      this.orderSave.push(e.payload.doc);
    });
    return this.getOrders$

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

}
