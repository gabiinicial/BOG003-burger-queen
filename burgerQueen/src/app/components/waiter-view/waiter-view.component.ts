import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';


@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css']
})
export class WaiterViewComponent implements OnInit {
  
  constructor(private RestService: RestService,) { }
  
  ngOnInit(): void {
    this.cargarData();
    this.screenWidth = window.innerWidth;
  }

  public cargarData(){
    this.RestService.get('../assets/json/aquelarreMenu.json')
    .subscribe(res => {
      console.log(res);
      this.menuArray = res;
    })
  }
  
  clientName = '';
  tableNumber = '';
  public menuArray: any = [];
  public screenWidth: any;


}
