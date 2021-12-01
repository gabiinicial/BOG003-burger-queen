import { Component, OnInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { sendDataService } from 'src/app/services/carry-cards';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';

@Component({
  selector: 'app-view-chef-order',
  templateUrl: './view-chef-order.component.html',
  styleUrls: ['./view-chef-order.component.css'],
})

export class ViewChefOrderComponent implements OnInit, AfterContentInit, AfterViewChecked{

  getDataSuscription!: Subscription;
  cardsElements: any;
  stateBarChange: string = "";
  idOrder: string = "";
  stateSave: string ="";

  constructor(private sendCardsService: sendDataService, private firebaseService: firebaseFunctionsService) {

  }

  ngOnInit(): void {
    this.getDataOrderChef();
    this.firebaseService.getState().subscribe((res: any) => {
      this.idOrder = res.id;
      setTimeout(() => {
        this.stateSave = res.status;
        console.log(res, "estado orden", this.stateBarChange&&this.stateBarChange, "estado", this.stateSave);
        this.cardChefEdit(this.idOrder);
      }, 1);
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

  stateOrderChange(event: string){
    this.stateBarChange = event;
    console.log("*********--//",this.stateBarChange);
  }

  cardChefEdit(id: string){
    const order: any = {
      statusOrder: this.stateBarChange
    }

    this.firebaseService.editCard(id, order.statusOrder)
    .then((res)=>{
      //modificar estado en la barra de estado en caso que sea exitoso
    }, error => console.log(error));
  }
}
