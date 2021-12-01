import { Injectable,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class sendDataService {
  carryCards$ = new EventEmitter();
  stateOrder$ = new EventEmitter(); // Recibe el estado de la order en el componente del chef

  constructor() {}



}
