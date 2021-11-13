import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { burger } from 'src/app/classes/burgerType';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() stateModal : boolean = true;
  @Input() showBurger : [] = [];
  @Input() showAdditions: [] = [];

  @Output() changeStateModal = new EventEmitter<boolean>();
  @Output() showElementsModal = new EventEmitter<any>();

  oppressedBtn : string = "";
  stateKeep : any = [];

  constructor() { }

  ngOnInit(): void {
  }
  changeState(value: boolean) {
    this.changeStateModal.emit(value);
  }

  press(type: string){
    this.oppressedBtn = type;
    console.log("Estado ",this.oppressedBtn);
  }

  elementModal(item: any){
    this.showElementsModal.emit(item);
  }

  selectAdditions(addition: any){
    this.stateKeep = addition;
    
    console.log("Verificación", this.stateKeep);


  }


}
