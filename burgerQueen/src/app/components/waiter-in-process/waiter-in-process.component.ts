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
  currentState: string = '';
  currentStateOrder: any;
  stateBarChangeValue: string = "";
  currentIdOrder: any;


  constructor(private firebaseService: firebaseFunctionsService, private sendCardsService: sendDataService) { }

  ngOnInit(): void {
    // this.firebaseService.getOrderData();
    this.showDataFirebase();
    this.stateOrderGet();
    this.valueOrderState();
    this.firebaseService.getState().subscribe((res: any) => {
      this.currentIdOrder = res.id;
      this.cardChefEdit(this.currentIdOrder);
    })
  }
  //metodo para traer los datos para el servicio
  showDataFirebase() {
    this.firebaseService.getOrderData().subscribe((order: any[]) => {
      this.getOrderSave = order;
    });
  }
  // trae el estado
  stateOrderGet() {
    this.sendCardsService.stateOrder$.subscribe((order: any) => {
      this.currentState = order;
    });
  }

  valueOrderState() {
    this.sendCardsService.sendStateOrderService().subscribe((res) => {
      this.currentStateOrder = res;
    });
  }
  stateOrderChangeInProcess(event: string) {
    this.stateBarChangeValue = event;
  }

  cardChefEdit(id: string) {
    const order: any = {
      statusOrder: this.stateBarChangeValue
    }
    if (this.stateBarChangeValue !== '') {
      //Funcion lleva el estado para actualizarlo en firebase
      this.firebaseService.editCard(id, order.statusOrder)
        .then((res) => {
          console.log("-----", res);
        }, error => {
          console.log("NO", error);
        })
    }
  }
}
