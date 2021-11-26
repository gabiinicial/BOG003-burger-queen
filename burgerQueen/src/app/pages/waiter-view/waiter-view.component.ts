import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Burger } from 'src/app/classes/burgerType';
import { OrderSumary } from 'src/app/classes/orderSumary';
import { RestService } from '../../rest.service';
import { Item } from 'src/app/classes/item';
import * as M from 'materialize-css';
import { IOrder } from 'src/app/interfaces/pedido.interface';
import { firebaseFunctionsService } from 'src/app/services/firebase-functions.service';
import { Product } from 'src/app/classes/orderProduct';
import { Order } from 'src/app/classes/order';
import { getDataFirestore } from 'src/app/services/get-data-Firestore';
import { Subscription } from 'rxjs';
//import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css'],
})
export class WaiterViewComponent implements OnInit {
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
  messageAlert: any = '';
  getSubscription: Subscription | undefined;
  products: Product[] = [];
  order: Order[] = [];
  getDataActive: any | undefined;
  statusChangeModal: boolean = false;

  @Output() results = new EventEmitter<any>();

  ngOnInit(): void {
    this.cargarData();
    this.screenWidth = window.innerWidth;
    // this.getSubscription =
    this.sendOrderFirebase.sendOrders$.subscribe(
      (sub: any) => {
        this.getDataActive = sub;
      });
  }
  constructor(
    private RestService: RestService,
    private firebaseService: firebaseFunctionsService,
    private sendOrderFirebase: getDataFirestore
  ) { }

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

  message() {
    if (this.clientName === '') {
      this.messageAlert = M.toast({
        html: 'ingresa nombre de cliente',
        classes: 'color-message',
      });
    } else if (this.tableNumber === '') {
      this.messageAlert = M.toast({
        html: 'ingresa número de mesa',
        classes: 'color-message',
      });
    } else {
      this.viewModal(true);
      console.log("este es subcription", this.getSubscription);

    }
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

    let itemInOrden: any = [];

    if (itemR.subtype == 'burger') {
      itemInOrden = this.orderSumary.find(
        (e) =>
          e.item.name === itemR.name &&
          e.burger.type === newOrderSumary.burger.type &&
          JSON.stringify(e.burger.additions.sort()) ==
          JSON.stringify(newOrderSumary.burger.additions.sort())
      );
      console.log('Prueba de itemInOrden', itemInOrden);
    } else {
      itemInOrden = this.orderSumary.find((e) => e.item.name === itemR.name);
    }

    if (itemInOrden) {
      // modificar y hacer otro find(hamburguesa) y otro para el resto de productos
      if (itemR.subtype === 'burger') {
        if (
          itemInOrden.burger.type === newOrderSumary.burger.type &&
          JSON.stringify(itemInOrden.burger.additions.sort()) ==
          JSON.stringify(newOrderSumary.burger.additions.sort())
        ) {
          console.log(
            'PRuebas de pruebas',
            itemInOrden.burger.type,
            newOrderSumary.burger.type
          );

          this.orderSumary.forEach((e) => {
            if (
              e.item.name === itemR.name &&
              e.burger.type === newOrderSumary.burger.type &&
              JSON.stringify(e.burger.additions.sort()) ==
              JSON.stringify(newOrderSumary.burger.additions.sort())
            ) {
              e.item.count = 0;
              e.cantidad += itemR.count;
              console.log('------', e, newOrderSumary);
            }
          });
        } /* if (!this.orderSumary.find((e) => e.item.name === itemR.name &&  e.burger.type === newOrderSumary.burger.type)) */ else {
          this.orderSumary.push(newOrderSumary);
          console.log('nuevo elemento hamburguesa');
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
      console.log('nuevo elemento');
    }
    this.totalPrice(this.orderSumary);
  }

  deleteProduct(itemDelete: any) {
    this.orderSumary.splice(this.orderSumary.indexOf(itemDelete), 1);
    this.totalPrice(this.orderSumary);
  }

  viewModal(state: boolean) {
    this.showModal = state;
    if (this.showModal) {
      console.log("este es", this.getDataActive);
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
        8;
        additions = e.type;
        this.arrayAdditions.push(additions);
      });
    }
  }

  showTypeBurger(event: any, eventAdd: any) {
    this.showBurger(event, eventAdd);
  }

  addSelectionBurger(event: any) {
    this.burgerSelected = [];
    this.burgerSelected = event;
    if (this.burgerSelected[1] !== '') {
      this.showResume(this.burgerSelected[0]);
      this.showModalAdit = false;
      console.log('estado de la modal', this.showModalAdit);
    } else {
      console.log('Este esta vacio', this.showModalAdit);
    }
    console.log(this.burgerSelected[1]);
  }

  showModalAdd(item: Item) {
    if (item.subtype === 'burger') {
      this.showModalAdit = true;
    }
  }

  listenDish(event: any) {
    this.listenMyDish = event;
  }

  addOrderToFirebase() {
    let newOrder = new Order();
    (newOrder.nameClient = this.clientName),
      (newOrder.table = this.tableNumber),
      (newOrder.creationTime = new Date(Date.now())),
      this.orderSumary.forEach((e) => {
        let newProducts = new Product();
        newProducts.nameProduct =
          e.item.subtype === 'burger'
            ? '' +
            e.item.name +
            ' ' +
            e.burger.type +
            ' ' +
            e.burger.additions.sort() +
            ''
            : e.item.name;
        newProducts.price = e.item.price * e.cantidad;
        newProducts.count = e.cantidad;
        newOrder.products.push(newProducts);
      });
    this.firebaseService.addOrder(newOrder);
  }
  stateAddOrder(state: boolean) {
    this.statusChangeModal = state;
    if (this.statusChangeModal) {
      this.addOrderToFirebase();
    }
  }
}
