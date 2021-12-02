import { Component, OnInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { sendDataService } from 'src/app/services/carry-cards';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';

@Component({
  selector: 'app-view-chef-order',
  templateUrl: './view-chef-order.component.html',
  styleUrls: ['./view-chef-order.component.css'],
})

export class ViewChefOrderComponent implements OnInit, AfterContentInit, AfterViewChecked {

  getDataSuscription!: Subscription;
  cardsElements: any;
  stateBarChange: string = "";
  idOrder: string = "";
  stateSave: string = "";

  constructor(private sendCardsService: sendDataService, private firebaseService: firebaseFunctionsService) {

  }

  ngOnInit(): void {
    this.getDataOrderChef();
    this.firebaseService.getState().subscribe((res: any) => {
      this.idOrder = res.id;
        this.stateSave = res.status;
        this.cardChefEdit(this.idOrder);
    })
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewChecked(): void {

  }

  getDataOrderChef() {
    this.firebaseService.getOrderData().subscribe((res: any) => {
      this.cardsElements = res;
    })
    return this.cardsElements;
  }

  stateOrderChange(event: string) {
    this.stateBarChange = event;
  }

  cardChefEdit(id: string) {
    const order: any = {
      statusOrder: this.stateBarChange
    }
    if (this.stateBarChange !== '') {
    //Funcion lleva el estado para actualizarlo en firebase
    this.firebaseService.editCard(id, order.statusOrder)
    .then((res)=>{
      console.log("-----",res);
    },error=>{console.log("NO",error);
    })
    }
  }
}
