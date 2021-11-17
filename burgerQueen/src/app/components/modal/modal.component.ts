import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() moveDish: any;
  @Input() stateModal: boolean = true;
  @Input() showArrayTypeBurger: [] = [];
  @Input() showAdditions: [] = [];
  @Input() isAddBurger: boolean = false;

  @Output() changeStateModal = new EventEmitter<boolean>();
  @Output() showElementsModal = new EventEmitter<any>();
  @Output() addBurger = new EventEmitter<any>();

  oppressedBtn: string = '';
  stateKeep: any = [];
  // extras: any = [];
  arrayItemBurger: any =[];

  constructor() {}

  ngOnInit(): void {}
  changeState(value: boolean) {
    this.changeStateModal.emit(value);
  }

  press(type: string) {//enviar estado de tipo de hamburguesa
    this.oppressedBtn = type;
    console.log('Estado ', this.oppressedBtn);
  }

  elementModal(item: any) {
    this.showElementsModal.emit(item);
  }

  selectAdditions(addition: any) {//enviar estado de adicionales
    if (this.stateKeep.includes(addition)) {
      this.stateKeep.splice(this.stateKeep.indexOf(addition), 1);
    } else {
      this.stateKeep.push(addition);
    }
    console.log('Verificación', this.stateKeep);
  }

  addBurgerForModal(ItemBurger: any, stateModal: boolean) {
    this.isAddBurger = true;
    this.stateModal = stateModal;
    this.arrayItemBurger.push(ItemBurger, this.oppressedBtn, this.stateKeep);
    this.addBurger.emit(this.arrayItemBurger);


    console.log('este es addBurguerFor', ItemBurger, stateModal, "Tipo de h ", this.oppressedBtn);
  }
}
