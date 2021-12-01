import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { sendDataService } from 'src/app/services/carry-cards';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';

@Component({
  selector: 'app-view-chef-order',
  templateUrl: './view-chef-order.component.html',
  styleUrls: ['./view-chef-order.component.css'],
})
export class ViewChefOrderComponent implements OnInit {
  getDataSuscription!: Subscription;
  cardsElements: any;



  constructor(private sendCardsService: sendDataService, private firebaseService:firebaseFunctionsService ) {

  }


  ngOnInit(): void {
    this.getDataOrderChef();
/*     this.firebaseService.updateState(any).subscribe((res:any)=>{
      console.log(res);

    }) */
  }

  getDataOrderChef() {
  this.firebaseService.getOrderData().subscribe((res:any)=>{
    this.cardsElements = res;
  })
  return this.cardsElements;
  }
}
