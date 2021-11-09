import { Component, OnInit  } from '@angular/core';
import { OrderSumary } from 'src/app/classes/orderSumary';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css'],
})

export class WaiterViewComponent implements OnInit {
  constructor(private RestService: RestService) { }

  ngOnInit(): void {
    this.cargarData();
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
  }
  typeArrayMenu: any = [];

  clientName = '';
  tableNumber = '';
  orderSumary: OrderSumary[] = [];
  public menuArray: any = [];
  public screenWidth: any;

  showModal= false;
  statedMenu = 'breakfast';

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

  addProduct(itemR: any) {
    let newOrderSumary = new OrderSumary;
    newOrderSumary.cantidad = 0;
    newOrderSumary.item = { ...itemR };

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

  increment(item: any){
    item.count += 1;
    console.log('Acumulador', item.count);
    return item.count;
  }

  decrement(item: any){
    if(item.count > 1){
      item.count -= 1;
    }
    return item.count;
  }

  deleteProduct(itemDelete: any){
    this.orderSumary.splice(this.orderSumary.indexOf(itemDelete),1);
     }

   viewModal(){
   this.showModal = true;
   console.log('Llamando', this.showModal);


    }



}
