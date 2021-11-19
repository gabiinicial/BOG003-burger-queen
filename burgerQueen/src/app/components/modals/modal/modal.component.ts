import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() moveDish: any;

  @Input() showArrayTypeBurger: [] = [];
  @Input() showAdditions: [] = [];
  @Input() isAddBurger: boolean = false;


  @Output() showElementsModal = new EventEmitter<any>();
  @Output() addBurger = new EventEmitter<any>();

  oppressedBtn: string = '';
  stateKeep: any = [];
  // extras: any = [];
  arrayItemBurger: any =[];
  stateModalBurger: Boolean = false;


  constructor() {}

  ngOnInit(): void {}

  press(type: string, showBtn: boolean) {//enviar estado de tipo de hamburguesa
   this.stateModalBurger = showBtn;
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

  addBurgerForModal(ItemBurger: any) {

    this.arrayItemBurger.push(ItemBurger, this.oppressedBtn, this.stateKeep);
    this.addBurger.emit(this.arrayItemBurger);
  }

}
