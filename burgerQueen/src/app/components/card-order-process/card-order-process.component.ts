import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-order-process',
  templateUrl: './card-order-process.component.html',
  styleUrls: ['./card-order-process.component.css']
})
export class CardOrderProcessComponent implements OnInit {
  @Input() itemOrder:any = [];
  stopWatch: any;
  countSeconds: number = 0;
  countMinutes: number = 0;


  constructor() { }

  ngOnInit(): void {
    this.timer();
  }

  timer(){
    let creationHour = new Date(Date.now()).getHours() - new Date(this.itemOrder.creationTime * 1000).getHours();
    let creationMinute = new Date(Date.now()).getMinutes() - new Date(this.itemOrder.creationTime * 1000).getMinutes();
    let creationSeconds = new Date(Date.now()).getHours() - new Date(this.itemOrder.creationTime * 1000).getHours()

    this.itemOrder.creationTime

    this.stopWatch = setInterval(()=>{
      if (this.countSeconds == 60) {
        this.countSeconds = 0;
        this.countMinutes++;

        if (this.countMinutes == 60) {
          this.countMinutes = 0;
        }
      }
      this.countSeconds++;
    }, 1000)
  }

}
