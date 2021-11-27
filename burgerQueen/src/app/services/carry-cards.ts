import { Injectable,EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class sendDataService {
  carryCards$ = new EventEmitter();

  constructor() {}
}
