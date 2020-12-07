import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MessagingService } from './messaging.service';

@Injectable()
export class DataStoreService {
  allUsers = [];

  userLoggedIn: boolean = false;
  currentUser = {};

  loadUsersObservable;

  constructor( private messaging: MessagingService ) {}

  loadUsers () {
    this.loadUsersObservable = Observable.create( ( observer: Observer<string> ) => {
      setTimeout( () => {
        this.allUsers = [
          {
            id:       '1',
            name:     'Pesho Peshev',
            email:    'pesho@pesho.com',
            password: 'pesho_pass',
            role:     'admin',
          },
          {
            id:       '2',
            name:     'Gosho Goshev',
            email:    'gosho@gosho.com',
            password: 'gosho_pass',
            role:     'user',
          },
          {
            id:       '3',
            name:     'Kiro Kirov',
            email:    'kiro@kiro.com',
            password: 'kiro_pass',
            role:     'user',
          },
        ];
        observer.next( 'Users loaded successfully' );
      }, 2000 );
    });
  }

  logInObservable;

  logIn ( email: string, password: string ) {
    this.logInObservable = Observable.create( ( observer: Observer<string> ) => {
      setTimeout( () => {
        let found = this.allUsers.filter( ( u ) => {
          return ( ( u.email == email ) && ( u.password == password ) );
        } );

        if ( found && found.length > 0 ) {
          this.currentUser = found[ 0 ];
          this.userLoggedIn = true;
          this.messaging.onSuccess( 'User successfully logged in.' );
          observer.next( 'User successfully logged in.' );
        } else {
          this.messaging.onError( 'User cannot log in. Please, try again later!' );
          observer.error( 'User cannot log in. Please, try again later!' );
        }
      }, 1000 );
    } );
  }
}
