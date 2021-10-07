import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  orders: Observable<any>;
  constructor(public firestore: AngularFirestore) {}

  ngOnInit() {
    this.orders = this.firestore
      .collection('orders', (ref) =>
        ref.where('created', '<', 'M').orderBy('created', 'desc').limit(50)
      )
      .valueChanges()
      .pipe(
        map((data) => {
          return data.sort((a: { created: string }, b: { created: string }) =>
            new Date(a.created) > new Date(b.created) ? -1 : 0
          );
        })
      );
  }
}
