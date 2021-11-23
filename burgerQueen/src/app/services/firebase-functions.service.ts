import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IOrder } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})

export class firebaseFunctionsService {

  constructor(private db: AngularFirestore) { }

  addOrder(order:IOrder){
      this.db.collection('order').doc().set({
          "nameClient": order.nameClient,
          "table": order.table,
          "nameProduct": order.nameProduct,
          "price": order.price,
          "count": order.count,
      })
      .then((res) => {
          console.log(res);
      })
      .catch((err) =>{
          console.log("No se pudo realizar la inserción", err);
      })
  }


}
