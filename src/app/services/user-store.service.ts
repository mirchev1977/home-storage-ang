import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MessagingService } from './messaging.service';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserStoreService {
  allUsers = [];

  userLoggedIn: boolean = false;
  currentUser = {};

  loadUsersObservable;

  constructor( private messaging: MessagingService ) {}

  loadUsers () {
    this.loadUsersObservable = Observable.create( ( observer: Observer<string> ) => {
      this.messaging.onInfo( 'Loading users...' );
      setTimeout( () => {
        let locStUsers = localStorage.getItem( 'allUsers' );
        if ( locStUsers ) {
          this.allUsers = JSON.parse( locStUsers );
        } else {
          this.allUsers = [
            {
              id:       '1',
              name:     'Pesho Peshev',
              email:    'pesho@pesho.com',
              password: 'pesho_pass',
              role:     'admin',
              token:    '1234',
            },
            {
              id:       '2',
              name:     'Gosho Goshev',
              email:    'gosho@gosho.com',
              password: 'gosho_pass',
              role:     'user',
              token:    '1234',
            },
            {
              id:       '3',
              name:     'Kiro Kirov',
              email:    'kiro@kiro.com',
              password: 'kiro_pass',
              role:     'user',
              token:    '1234',
            },
          ];
        }

        this.messaging.onSuccess( 'Users successfully loaded!' );
        observer.next( 'Users loaded successfully' );
      }, 2000 );
    });
  }

  logInObservable;

  logIn ( email: string, password: string ) {
    if ( !email || !password ) {
      this.messaging.onError( 'Please, do enter all credentials, please!' );
      return;
    }

    if ( ( email.match( /^\s*$/ ) ) || ( password.match( /^\s*$/ ) ) ) {
      this.messaging.onError( 'Please, do enter all credentials, please!' );
      return;
    }

    if ( !email.match( /@/ ) ) {
      this.messaging.onError( 'Enter a valid email address, please!' );
      return;
    }

    if ( password.length <= 4 ) {
      this.messaging.onError( 'Your password has to be longer than 4 characters...' );
      return;
    }

    this.messaging.onInfo( 'Logging in...' );
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

  registerObservable;
  register ( userModel: UserModel ) {
    this.registerObservable = Observable.create( ( observer: Observer<string> ) => {
      setTimeout( () => {
        this.allUsers.push( userModel );
        let locStUsers = JSON.stringify( this.allUsers );
        localStorage.setItem( 'allUsers', locStUsers );
        if ( localStorage.getItem( 'allUsers' ) ) {
          this.messaging.onSuccess( 'User: ' + userModel.email + ' was registered successfully!' );
          observer.next( 'User: ' + userModel.email + ' was registered successfully!' );
        } else {
          this.messaging.onError( 'User: ' + userModel.email + ' failed to register' );
          observer.error( 'User: ' + userModel.email + ' failed to register.' );
        }
      }, 1000 );
    } );
  }
}
