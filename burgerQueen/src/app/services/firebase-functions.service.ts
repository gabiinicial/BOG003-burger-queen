import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../classes/order';
import { Product } from '../classes/orderProduct';
import { Observable, of, Subject } from 'rxjs';
import { query, orderBy } from "firebase/firestore";


@Injectable({
  providedIn: 'root',
})

export class firebaseFunctionsService {

  order: Order[] = [];
  product: Product[] = [];
  getOrders$: Observable<any[]> | undefined;
  orderSave: any = [];
  orderElement: any = [];
  orderProducts: Product[] = [];
  getOrderElements: any = [];
  private updateCard$ = new Subject<any>();



  constructor(private db: AngularFirestore) { }

  addOrder(order: Order) {
    this.db
      .collection('order')
      .doc()
      .set({
        date: order.creationTime,
        nameClient: order.nameClient,
        table: order.table,
        products: order.products.map((element) => element.toFirebase()),
        statusOrder: order.status
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('No se pudo realizar la inserción', err);
      });
  }

  getData() {
    this.getOrders$ = this.db.collection('order', ref => ref.orderBy('date', 'desc')).snapshotChanges();
    console.log("Este es el observable", this.getOrders$);
    return this.getOrders$
  }

  selectArray() {
    this.getData().forEach((e: any) => {
      this.orderSave.push(e);
      /* e.forEach((i: any) => {
       // this.getOrderElements = [];
      }); */
      console.log("trae i", this.orderSave.length);
    });
    //console.log("Esta es order Save", this.orderSave);
    return this.orderSave;
  }

  getOrderData(): Observable<any> {
    console.log("Prueba....", this.getData());
    this.orderElement= [];
    this.getData().forEach((e: any) => {
      console.log("Entra al foreach", e);
      e.forEach((i: any) => {
        let newOrderElement = new Order();
        newOrderElement.creationTime = new Date(i.payload.doc.data().date.seconds * 1000);
        newOrderElement.nameClient = i.payload.doc.data().nameClient;
        newOrderElement.table = i.payload.doc.data().table;
        newOrderElement.id= i.payload.doc.ref.id;

        i.payload.doc.data().products.forEach((i: any) => {
          let newProduct = new Product();
          newProduct.count = i.count;
          newProduct.nameProduct = i.nameProduct;
          newProduct.price = i.price;
          newOrderElement.products.push(newProduct);
          this.orderProducts.push(newProduct);
        });
        this.orderElement.push(newOrderElement);
      });
      console.log(this.orderElement.length);
      //console.log("aquiiiii", new Date(e[.data().date.seconds * 1000).getTime());
    });
    // this.getOrderElements$ = this.orderElement;

    return of(this.orderElement)//.sort((a: any, b: any) => b.creationTime - a.creationTime);
  }

  updateState(item: any){
    this.updateCard$.next(item);
  }

  getState(): Observable<any>{
 return this.updateCard$.asObservable()
  }
}
