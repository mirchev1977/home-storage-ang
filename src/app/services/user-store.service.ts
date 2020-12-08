import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MessagingService } from './messaging.service';
import { UserModel } from '../models/user.model';
import { ContainerModel } from '../models/container.model';

@Injectable()
export class UserStoreService {
  allUsers = [];

  userLoggedIn: boolean = false;
  currentUser:  UserModel;

  loadUsersObservable;

  constructor( private messaging: MessagingService ) {}

  loadUsers () {
    if ( localStorage.getItem( 'userLoggedIn' ) ) {
      this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
      this.userLoggedIn = true;
    }

    this.loadUsersObservable = Observable.create( ( observer: Observer<string> ) => {
      this.messaging.onInfo( 'Loading users...' );
      setTimeout( () => {
        let locStUsers = localStorage.getItem( 'allUsers' );
        if ( locStUsers ) {
          this.allUsers = JSON.parse( locStUsers );
        } else {
          this.allUsers = [
            new UserModel(
              '1',
              'Pesho Peshev',
              'pesho@pesho.com',
              'pesho_pass',
              'admin',
              '1234',
            ),
            new UserModel(
              '2',
              'Gosho Goshev',
              'gosho@gosho.com',
              'gosho_pass',
              'user',
              '1234',
            ),
            new UserModel(
              '3',
              'Kiro Kirov',
              'kiro@kiro.com',
              'kiro_pass',
              'user',
              '1234',
            ),
          ];
        }

        localStorage.setItem( 'allUsers', JSON.stringify( this.allUsers ) );

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

          localStorage.setItem( 'currentUser', JSON.stringify( this.currentUser ) );
          localStorage.setItem( 'userLoggedIn', '1' );

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
      if ( !userModel.email || !userModel.password  || !userModel.name) {
        this.messaging.onError( 'Please, do fill into all registration fields, please!' );
        return;
      }

      if ( ( userModel.email.match( /^\s*$/ ) ) || ( userModel.password.match( /^\s*$/ ) ) || ( userModel.name.match( /^\s*$/ ) ) ) {
        this.messaging.onError( 'Please, do enter all registration information, please!' );
        return;
      }

      if ( !userModel.email.match( /@/ ) ) {
        this.messaging.onError( 'Enter a valid email address, please!' );
        return;
      }

      let existing = this.allUsers.filter( ( u ) => { return ( u.email === userModel.email ) } );
      if ( existing.length > 0 ) {
        this.messaging.onError( 'A user with email: ' + userModel.email + ' has already been registered!'  );
        return;
      }


      if ( userModel.password.length <= 4 ) {
        this.messaging.onError( 'Your password has to be longer than 4 characters...' );
        return;
      }

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

    return 1;
  }

  onSave ( id: string, name: string, email: string, password: string, role: string, token: string ) {
    let user = this.allUsers.filter( ( usr ) => {
      return ( usr.id === id );
    } )[0];

    user.name     = name;
    user.email    = email;
    user.password = password;
    user.role     = role;
    user.token    = token;

    if ( (this.currentUser) && ( user.hasOwnProperty( 'email' ) ) && this.currentUser.email === user.email ) {
      this.currentUser = user;
    }

    let locStUsers = JSON.stringify( this.allUsers );
    localStorage.setItem( 'allUsers', locStUsers ); 
    this.messaging.onSuccess( 'User ' + user.email + ' edited successfully!' );
  }

  onDelete ( id: string ) {
    if ( ( this.currentUser ) && ( id === this.currentUser.id ) ) {
      alert( "You cannot delete the currently logged user!" );
      return;
    }

    let users = this.allUsers.filter( ( usr ) => {
      return ( usr.id !== id );
    } );

    this.allUsers = users;

    let locStUsers = JSON.stringify( this.allUsers );
    localStorage.setItem( 'allUsers', locStUsers ); 
    this.messaging.onSuccess( 'User deleted successfully!' );
  }

  //CONTAINERS
  allContainers: (ContainerModel)[] = []

  onSaveContainer ( container: ContainerModel ) {
    if ( this.allContainers.length <= 0 ) {
      container.id = '1';
    } else {
      let len = this.allContainers.length;
      len++;
      container.id = len.toString();
    }

    this.allContainers.push( container );

    localStorage.setItem( 'allContainers', 
      JSON.stringify( this.allContainers ) );
  }
}
