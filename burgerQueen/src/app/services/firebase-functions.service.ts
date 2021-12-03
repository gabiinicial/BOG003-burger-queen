import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../classes/order';
import { Product } from '../classes/orderProduct';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import  * as firebase  from 'firebase/firestore';
import * as firestore from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})

export class firebaseFunctionsService {

  order: Order[] = [];
  product: Product[] = [];
  getOrders$: Observable<any[]> | undefined;
  orderSave: any = [];
  orderProducts: Product[] = [];
  getOrderElements: any = [];
  statusOrder: any = [];
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
        statusOrder: []
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('No se pudo realizar la inserción', err);
      });
  }
  // Obtiene la colección en firebase
  getData() {
    //se crea unicamente si no ha sido creado anteriormente
    if (this.getOrders$ === undefined) {
      this.getOrders$ = this.db.collection('order', ref => ref.orderBy('date', 'desc')).snapshotChanges();
      console.log("se crea observador");

    }
    return this.getOrders$
  }
  // Retorna  los datos de la colección en firebase
  getOrderData(): Observable<any> {
    //se toma la documentacion de snapshotChanges
    // metodo map se importa de rxjs
    //https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
    return this.getData().pipe(map(actions => actions.map(i => {
      let newOrderElement = new Order();
      newOrderElement.creationTime = new Date(i.payload.doc.data().date.seconds * 1000);
      if(i.payload.doc.data().endDate){
        newOrderElement.endDate = new Date(i.payload.doc.data().endDate.seconds * 1000);
      }
      newOrderElement.nameClient = i.payload.doc.data().nameClient;
      newOrderElement.table = i.payload.doc.data().table;
      newOrderElement.id = i.payload.doc.ref.id;

      i.payload.doc.data().products.forEach((e: any) => {
        let newProduct = new Product();
        newProduct.count = e.count;
        newProduct.nameProduct = e.nameProduct;
        newProduct.price = e.price;
        newOrderElement.products.push(newProduct);
        this.orderProducts.push(newProduct);
      });
      newOrderElement.status = i.payload.doc.data().statusOrder;
      return newOrderElement;
    })))
  }

  // actualiza el estado en firestore
  editCard(id: string, state: any): Promise<any> {
    console.log('\n\n estado de la orden y fecha final',state);
    /* if(state.endDate && state.statusOrder ){
      this.statusOrder = { statusOrder: state.statusOrder, endDate: state.endDate };
    } else{
      this.statusOrder = {statusOrder: state.statusOrder};
    } */
    //this.statusOrder = state.statusOrder;
    return this.db.collection('order').doc(id)
    .update({statusOrder : firestore.arrayUnion(state.statusOrder)});
  }


  updateState(item: Order) {
    this.updateCard$.next(item);
  }

  getState(): Observable<any> {
    return this.updateCard$.asObservable();
  }

}
