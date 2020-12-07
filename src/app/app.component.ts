import { Component, OnInit, OnDestroy } from '@angular/core';
import { Container } from './common/container.model';
import { DataStoreService } from './services/data-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadUsersObservable: Subscription;

  containers = [
    new Container ( 'edno' ),
    new Container ( 'dve' ),
    new Container ( 'tri' ),
  ];

  constructor( private dataStore: DataStoreService ) {}

  ngOnInit() {
    this.dataStore.loadUsers();

    this.loadUsersObservable =  this.dataStore.loadUsersObservable.subscribe( 
      ( data: string )  => {
        console.log( data );
      },
    );
  }

  ngOnDestroy() {
    if ( this.loadUsersObservable ) {
      this.loadUsersObservable.unsubscribe();
    }
  }
}
