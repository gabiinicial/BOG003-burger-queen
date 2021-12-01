import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  isClassActiveWaiter: string = '';
  constructor() { }

  ngOnInit(): void {
    this.classSelect();
  }

  //window location.href  
  classSelect(){
    if(window.location.pathname == '/waiter-view'){
      this.isClassActiveWaiter = '/waiter-view';
      console.log("El pathname es igual ");
    } else if (window.location.pathname == '/in-process') {
      this.isClassActiveWaiter = '/in-process';
    } else if (window.location.pathname == '/history') {
      this.isClassActiveWaiter = '/history';
    }
    console.log('#######################\n',window.location.pathname);
  } 

}
