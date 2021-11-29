import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { sendDataService } from 'src/app/services/carry-cards';

@Component({
  selector: 'app-view-chef-order',
  templateUrl: './view-chef-order.component.html',
  styleUrls: ['./view-chef-order.component.css'],
})
export class ViewChefOrderComponent implements OnInit {
  getDataSuscription!: Subscription;
  cardsElements: any;


  constructor(private sendCardsService: sendDataService) {

  }


  ngOnInit(): void {
    this.getDataSuscription = this.sendCardsService.carryCards$.subscribe(
      (res: any) => {
        this.cardsElements = ['res', res];
        console.log("estoy en la linea 25");

       return res;
      }
    )
    console.log("prueba getDataSub",this.getDataSuscription, this.cardsElements );
  }

  prueba() {
    console.log(this.cardsElements);
  }
}
