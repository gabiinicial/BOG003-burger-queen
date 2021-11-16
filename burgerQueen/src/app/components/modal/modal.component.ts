import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { burger } from 'src/app/classes/burgerType';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() stateModal: boolean = true;
  @Input() showArrayTypeBurger: [] = [];
  @Input() showAdditions: [] = [];
  @Input() isAddBurger: boolean = false;

  @Output() changeStateModal = new EventEmitter<boolean>();
  @Output() showElementsModal = new EventEmitter<any>();
  @Output() addBurger = new EventEmitter<boolean>();
  oppressedBtn: string = '';
  stateKeep: any = [];
  extras: any = ['Queso'];
  constructor() {}

  ngOnInit(): void {}
  changeState(value: boolean) {
    this.changeStateModal.emit(value);
  }

  press(type: string) {
    this.oppressedBtn = type;
    console.log('Estado ', this.oppressedBtn);
  }

  elementModal(item: any) {
    this.showElementsModal.emit(item);
  }

  selectAdditions(addition: any) {
    if (this.stateKeep.includes(addition)) {
      this.stateKeep.splice(this.stateKeep.indexOf(addition), 1);
    } else {
      this.stateKeep.push(addition);
    }
    console.log('Verificación', this.stateKeep);
  }
  addBurgerForModal(stateBurger: boolean , stateModal:boolean) {
    this.isAddBurger = stateBurger ;
    this.stateModal = stateModal;
     this.addBurger.emit(this.isAddBurger);
     console.log("este es addBurguerFor",stateBurger,stateModal );
     
  }
}
