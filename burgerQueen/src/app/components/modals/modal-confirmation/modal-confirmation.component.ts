import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() stateModal: boolean = true ; // pertenece a la ventana modal de confirmación de envio a cocina.

  @Output() changeStateModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeState(value: boolean) {
    this.changeStateModal.emit(value);
  }

}
