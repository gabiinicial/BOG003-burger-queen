import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Burger } from 'src/app/classes/burgerType';
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
  typeBurger: Burger[] = [];
  showModal = false;
  statedMenu = 'breakfast';
  totalOrder: number = 0;
  arrayTypeBurger: any = [];
  arrayAdditions: any = [];
  showModalAdit: boolean = false;
  stateBurger: boolean = false; // revisar
  listenMyDish: Item[] = [];
  burgerSelected: any = [];

  constructor(private RestService: RestService) {}

  ngOnInit(): void {
    this.cargarData();
    this.screenWidth = window.innerWidth;
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

  addProduct(itemR: any) {
    // 1° construir el elemento ordenSumary
    // 2° Buscar si el elemento esta en el pedido, si esta: hay que preguntar si es hamburguesa, preguntar si coinciden tipo de carne y adición
    // 3° si coinciden aumentar cantidad y si no agregar un elemento aun nuevo array.
    let newOrderSumary = new OrderSumary();
    newOrderSumary.cantidad = itemR.count;
    newOrderSumary.item = { ...itemR };
    if (itemR.subtype == 'burger') {
      newOrderSumary.burger.type = this.burgerSelected[1]; // se asigna sabor
      newOrderSumary.burger.additions = this.burgerSelected[2];
    }

    let itemInOrden: any = this.orderSumary.find((e) => e.item.name === itemR.name);
    console.log("Prueba de itemInOrden", itemInOrden );

    if (itemInOrden) { // modificar y hacer otro find(hamburguesa) y otro para el resto de productos

      if (itemR.subtype === 'burger') {
        if (
          itemInOrden.burger.type === newOrderSumary.burger.type /* &&
          JSON.stringify(itemInOrden.burger.additions.sort()) ==
            JSON.stringify(newOrderSumary.burger.additions.sort()) */
        ) {
          console.log("PRuebas de pruebas", itemInOrden.burger.type, newOrderSumary.burger.type);

          this.orderSumary.forEach((e) => {
            if (e.burger.type === newOrderSumary.burger.type) {
              e.item.count = 0;
              //e.item.price = 1;
              e.cantidad += itemR.count;
              console.log("------",e, newOrderSumary);
            }

          });
        } else /* if (!this.orderSumary.find((e) => e.item.name === itemR.name &&  e.burger.type === newOrderSumary.burger.type)) */ {
          this.orderSumary.push(newOrderSumary);
          console.log("nuevo elemento hamburguesa" );
        }
      } else {
        this.orderSumary.forEach((e) => {
          if (e.item.name == itemR.name) {
            e.item.count = 0;
            e.cantidad += itemR.count;
          }
        });
      }
    } else {
      this.orderSumary.push(newOrderSumary);
      console.log("nuevo elemento" );

    }
    //this.totalPrice(this.orderSumary)
  }

  deleteProduct(itemDelete: any) {
    this.orderSumary.splice(this.orderSumary.indexOf(itemDelete), 1);
    this.totalPrice(this.orderSumary);
  }

  viewModal(state: boolean) {
    if (!this.showModal) {
      this.showModal = state;
    }
  }

  totalPrice(arrayItem: any) {
    this.totalOrder = 0;
    arrayItem = this.orderSumary;
    arrayItem.forEach((e: any) => {
      this.totalOrder += e.item.price * e.cantidad;
    });
    console.log('Aqui esta totalprice', this.orderSumary);
  }

  showResume(event: any) {
    this.addProduct(event);
  }

  acumulatorPrice(event: any) {
    this.totalPrice(event);
  }

  showBurger(arrayBurger: any, additions: any) {
    //revisar funcion para que tome adicionales
    let newBurger = new Burger();
    newBurger.type = this.menuArray.burgerType;
    newBurger.additions = this.menuArray.additions;

    if (this.arrayTypeBurger.length < 1 && this.arrayAdditions.length < 1) {
      newBurger.type.forEach((e: any) => {
        arrayBurger = e.type;
        this.arrayTypeBurger.push(e.type);
      });

      newBurger.additions.forEach((e: any) => {
        additions = e.type;
        this.arrayAdditions.push(additions);
      });
    }
  }

  showTypeBurger(event: any, eventAdd: any) {
    this.showBurger(event, eventAdd);
  }

  addSelectionBurger(event: any) {
    this.burgerSelected= [];
    this.burgerSelected = event;
    this.showResume(this.burgerSelected[0]);
    this.showModalAdit = false;
  }

  showModalAdd(item: Item) {
    if (item.subtype === 'burger') {
      this.showModalAdit = true;
    }
  }

  listenDish(event: any) {
    this.listenMyDish = event;
  }
}
