import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-chef',
  templateUrl: './header-chef.component.html',
  styleUrls: ['./header-chef.component.css']
})
export class HeaderChefComponent implements OnInit {

  isClassActive: string = '';
  constructor() { }

  ngOnInit(): void {
    this.classSelect();
  }

  //view-chef-order history-order-chef
  classSelect(){
    if(window.location.pathname == '/view-chef-order'){
      this.isClassActive = '/view-chef-order';
      console.log("El pathname es igual ");
    } else if (window.location.pathname == '/history-order-chef') {
      this.isClassActive = '/history-order-chef';
    }
    console.log('#######################\n',window.location.pathname);
  }

}
