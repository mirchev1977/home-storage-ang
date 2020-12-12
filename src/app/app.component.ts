import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserComponent } from './components/user/user.component';

import { UserStoreService } from './services/user-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadUsersObservable: Subscription;

  constructor( private userStore: UserStoreService ) {}

  ngOnInit() {
    this.userStore.loadUsers().subscribe(
      ( data )  => {
        if ( data[ 'status' ] === 'ok' ) {
          this.userStore.allUsers = data[ 'users' ];
          this.userStore.printSuccessMessage( 'Users loaded successfully!' );
        } else {
          this.userStore.logOut();
          this.userStore.printErrorMessage( 'Users cannot be loaded!' );
        }
      },
      ( err ) => { console.log( err ) }
    );
  }

  ngOnDestroy() {
    if ( this.loadUsersObservable ) {
      this.loadUsersObservable.unsubscribe();
    }
  }
}
