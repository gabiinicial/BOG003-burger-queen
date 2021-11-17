import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.css'],
})
export class CardMenuComponent implements OnInit {
  @Input() myDish: any;
  @Input() screen: any;
  @Input() arrayDish: any;
  @Input() showBurger: [] = [];
  @Input() showAdditions: [] = [];

  @Output() sendOrder = new EventEmitter<any>();
  @Output() acumulatorTotal = new EventEmitter<number>();
  @Output() showArrayType = new EventEmitter<[]>();
  @Output() showModalAll = new EventEmitter<Item>();
  @Output() sendMyDish = new EventEmitter<Item>();
  value: number | undefined;

  constructor() {}

  ngOnInit(): void {
    console.log(this.myDish);
  }

  addDish(item: any) {
    this.sendOrder.emit(item);
  }

  totalOrder(item: any) {
    this.acumulatorTotal.emit(item);
    console.log('total order ', item);
  }

  increment(item: any) {
    item.count += 1;
    console.log('Acumulador', item.count);
    return item.count;
  }

  decrement(item: any) {
    if (item.count > 1) {
      item.count -= 1;
    }
    return item.count;
  }

  showTypeMenuBurger(item: any, itemAd: any) {
    console.log('cardMenu', item);
    console.log('Este showBurger', this.showBurger);

    this.showArrayType.emit(item);
  }

  addFunctionByType(myDish: any) {
    if (myDish.subtype == 'burger') {
      this.showTypeMenuBurger(this.showBurger, this.showAdditions);
      this.showModalAll.emit(myDish);
      this.showArrayType.emit(myDish);
    } else {
      this.addDish(myDish);
      this.totalOrder(myDish);
    }
  }
  sendDish(item:any){
    this.sendMyDish.emit(item);
  }
}
