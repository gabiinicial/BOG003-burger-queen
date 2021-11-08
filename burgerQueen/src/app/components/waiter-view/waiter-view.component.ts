import { Component, OnInit } from '@angular/core';
import { OrderSumary } from 'src/app/classes/orderSumary';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css'],
})
export class WaiterViewComponent implements OnInit {
  constructor(private RestService: RestService) {}

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

  addProduct(itemR: any){
    if (this.orderSumary.length == 0 ) {
      this.orderSumary.push(itemR);
      this.orderSumary[0].cantidad = 1;
    } else {
      this.orderSumary.forEach((e) => {
        if(!e.item?.includes(itemR)){
          e.cantidad += 1;

          console.log(" Ya existe  ",e);
        }
      });
    }
    //console.log(this.orderSumary);
  }
}
