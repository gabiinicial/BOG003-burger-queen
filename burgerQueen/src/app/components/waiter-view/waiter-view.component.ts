import { Component, OnInit } from '@angular/core';
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
    console.log(
      'Hola',
      this.menuArray.menu.filter(
        (dish: { type: string }) => dish.type === this.statedMenu
      )
    );
    this.typeArrayMenu = this.menuArray.menu.filter(
      (dish: { type: string }) => dish.type === this.statedMenu
    );
  }
}
