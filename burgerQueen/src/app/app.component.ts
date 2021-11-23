import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'burgerQueen';
  items: Observable<any[]> | undefined;

  constructor(private route: ActivatedRoute, firestore: AngularFirestore,) {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit() {  
  }

}

