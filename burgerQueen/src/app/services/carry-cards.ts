import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class sendDataService {
  carryCards$ = new EventEmitter();
  stateOrder$ = new Subject<any>(); // Recibe el estado de la order en el componente del chef

  constructor() { }

  receiveState(item: any) {
    this.stateOrder$.next(item);
  }
 //
  sendStateOrderService(): Observable<any> {
    return this.stateOrder$.asObservable();
  }




}
