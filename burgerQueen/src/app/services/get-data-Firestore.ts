import { Injectable,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class getDataFirestore {
  sendOrders$ = new EventEmitter();
  constructor(private db: AngularFirestore) {}
}
