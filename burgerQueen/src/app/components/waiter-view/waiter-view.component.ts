import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { burger } from 'src/app/classes/burgerType';
import { OrderSumary } from 'src/app/classes/orderSumary';
import { RestService } from '../../rest.service';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css'],
})
export class WaiterViewComponent implements OnInit {
  @Output() results = new EventEmitter<any>();

  public screenWidth: any;
  public menuArray: any = [];
  typeArrayMenu: any = [];
  clientName = '';
  tableNumber = '';
  orderSumary: OrderSumary[] = [];
  typeBurger: burger[] = [];
  showModal = false;
  statedMenu = 'breakfast';
  totalOrder: number = 0;
  arrayTypeBurger: any = [];
  showModalAdit: boolean = false;

  constructor(private RestService: RestService) {}

  ngOnInit(): void {
    this.cargarData();
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
  }

  public cargarData() {
    this.RestService.get('../assets/json/aquelarreMenu.json').subscribe(
      (res) => {
        console.log(res);
        this.menuArray = res;
        this.typeArrayMenu = this.menuArray.menu.filter(
          (dish: { type: string }) => dish.type === this.statedMenu
        );
      }
    );
  }

  switchMenu(typeMenu: string) {
    this.statedMenu = typeMenu;
    this.typeArrayMenu = this.menuArray.menu.filter(
      (dish: { type: string }) => dish.type === this.statedMenu
    );
  }

  addProduct(itemR: Item) {
    let newOrderSumary = new OrderSumary();
    newOrderSumary.cantidad = 0;
    newOrderSumary.item = { ...itemR };
    this.showModalAdd(itemR);

    if (!this.orderSumary.find((e) => e.item.name === itemR.name)) {
      this.orderSumary.push(newOrderSumary);
      this.orderSumary.forEach((e) => {
        if (e.item.name == itemR.name) {
          e.cantidad += e.item.count;
          console.log('Añadir producto', e.cantidad);
        }
      });
    } else {
      this.orderSumary.forEach((e) => {
        if (e.item.name == itemR.name) {
          e.item.count = 0;
          e.cantidad += itemR.count;
        }
      });
    }
    itemR.count = 1;
  }

  deleteProduct(itemDelete: any) {
    this.orderSumary.splice(this.orderSumary.indexOf(itemDelete), 1);
    this.totalPrice(this.orderSumary);
  }

  viewModal(state: boolean) {
    if (!this.showModal) {
      this.showModal = state;
    }
    console.log('Llamando', this.showModal);
  }

  totalPrice(arrayItem: any) {
    this.totalOrder = 0;
    arrayItem = this.orderSumary;
    arrayItem.forEach((e: any) => {
      this.totalOrder += e.item.price * e.cantidad;
    });
    console.log('total price ', this.totalOrder);
  }

  showResume(event: any) {
    this.addProduct(event);
  }

  acumulatorPrice(event: any) {
    this.totalPrice(event);
  }

  showBurger(arrayBurger: any) {
    let newBurger = new burger();
    newBurger.type = this.menuArray.burgerType;

    console.log('Aqui estoy burger ', newBurger.type);
    newBurger.type.forEach((e: any) => {
      arrayBurger = e.type;
      this.arrayTypeBurger.push(e.type);

      console.log('Entra foreache', this.arrayTypeBurger);
    });
  }

  showTypeBurger(event: any) {
    this.showBurger(event);

    console.log('Aqui esta el evento', event);
  }

  showModalAdd(item: Item) {
    if (item.subtype === 'burger') {
      this.showModalAdit = true;
    }
  }
}
