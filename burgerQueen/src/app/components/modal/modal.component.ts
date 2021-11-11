import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() stateModal : boolean = true;
  @Output() changeStateModal = new EventEmitter<boolean>();

  changeState(value: boolean) {
    this.changeStateModal.emit(value);
  }

}
