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
  statusOrder: any = "";
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
        statusOrder: "creadooo"
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
    return this.getOrders$
  }

  getOrderData(): Observable<any> {
    this.orderElement= [];
    this.getData().forEach((e: any) => {
      e.forEach((i: any) => {
        let newOrderElement = new Order();
        newOrderElement.creationTime = new Date(i.payload.doc.data().date.seconds * 1000);
        newOrderElement.nameClient = i.payload.doc.data().nameClient;
        newOrderElement.table = i.payload.doc.data().table;
        newOrderElement.id= i.payload.doc.ref.id;

        i.payload.doc.data().products.forEach((e: any) => {
          let newProduct = new Product();
          newProduct.count = e.count;
          newProduct.nameProduct = e.nameProduct;
          newProduct.price = e.price;
          newOrderElement.products.push(newProduct);
          this.orderProducts.push(newProduct);
        });
        newOrderElement.status = i.payload.doc.data().statusOrder;
        this.orderElement.push(newOrderElement);
      });
    });

    return of(this.orderElement);
  }

  editCard(id: string, state: any): Promise<any> {
    this.statusOrder = state;
    console.log("service ",state);
    return this.db.collection('order').doc(id).update({statusOrder: state});
  }

  updateState(item:Order){
    this.updateCard$.next(item);
  }

  getState(): Observable<any>{
    console.log("Esta es la variable",this.statusOrder );

    return this.updateCard$.asObservable();

  }
}
