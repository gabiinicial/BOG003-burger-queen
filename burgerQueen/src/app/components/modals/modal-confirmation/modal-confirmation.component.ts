import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getDataFirestore } from 'src/app/services/get-data-Firestore';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() stateModal: boolean = true ; // pertenece a la ventana modal de confirmación de envio a cocina.

  @Output() changeStateModal = new EventEmitter<boolean>();
  @Output() activeData = new EventEmitter<any>();
  

  constructor(private sendOrderFirebase: getDataFirestore) { }

  ngOnInit(): void {
  }

  changeState(value: boolean) {
    this.changeStateModal.emit(value);
  }

  activeDataFirestore(state: boolean){
    this.activeData.emit(state);
    this.sendOrderFirebase.sendOrders$.emit(true); //envia datos en el servicio
  }
}
