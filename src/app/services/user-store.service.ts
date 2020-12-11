import { Injectable           } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MessagingService     } from './messaging.service';
import { UserModel            } from '../models/user.model';
import { ContainerModel       } from '../models/container.model';
import { HttpClient           } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserStoreService {
  allUsers: any = [];

  userLoggedIn: boolean = false;
  currentUser:  UserModel;

  //CONTAINERS
  allContainers: (ContainerModel)[] = [];

  loadUsersObservable;

  constructor( private messaging: MessagingService, private http: HttpClient ) {}

  loadUsers () {
    if ( localStorage.getItem( 'loginToken' ) ) {
      this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
      this.userLoggedIn = true;
    }

    this.messaging.onInfo( 'Loading users...' );

    return this.http.get( 'http://localhost:8000/users/all', { 
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem( 'loginToken' ) } 
    } );
  }

  loadContainers() {
    let lsContainers = localStorage.getItem( 'allContainers');

    if ( lsContainers ) {
      this.allContainers = JSON.parse( lsContainers );
      this.messaging.onSuccess( 'Containers loaded sucessfully!' );
    }
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

    const credentials: { email: string, password: string } = {
        email:    email,
        password: password
    };

    return this.http.post( 
      'http://localhost:8000/user/login', credentials
    );
  }

  logOut () {
    return this.http.get( 'http://localhost:8000/user/logout', {
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem( 'loginToken' ) } 
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

    return this.http.post( 'http://localhost:8000/users/new', userModel );
  }

  addNewUser ( user ) {
    this.allUsers.push( user );
  }

  onSave ( id: string, name: string, email: string, password: string, role: string, token: string ) {
    let user = this.allUsers.filter( ( usr ) => {
      return ( usr.id === parseInt( id ) );
    } )[0];

    user.name     = name;
    user.email    = email;
    user.password = password;
    user.role     = role;
    user.token    = token;

    if ( (this.currentUser) && ( user.hasOwnProperty( 'email' ) ) && this.currentUser.email === user.email ) {
      this.currentUser = user;
    }


    return this.http.post( 'http://localhost:8000/users/' + id +  '/update', user, {
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem( 'loginToken' ) } 
    }  );
  }

  onDelete ( id: string ) {
    if ( ( this.currentUser ) && ( id === this.currentUser.id ) ) {
      alert( "You cannot delete the currently logged user!" );
      return;
    }

    let users = this.allUsers.filter( ( usr ) => {
      return ( usr.id.toString() !== id );
    } );


    this.http.get( 'http://localhost:8000/users/' + id + '/delete', {
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem( 'loginToken' ) } 
    } ).subscribe( resp => {
      this.allUsers = users;
      this.messaging.onSuccess( 'User deleted successfully!' );
    } );
  }


  //CONTAINER
  onSaveContainer ( container: ContainerModel ) {
    return this.http.post( 
      'http://localhost:8000/containers/new', 
      container,
      {
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem( 'loginToken' ) } 
      }
    );
  }

  onContainerDelete ( contId ) {
    let remaining = this.allContainers.filter( ( cont ) => {
      return ( cont.id !== contId );
    } );

    this.allContainers = remaining;

    localStorage.setItem( 'allContainers', 
      JSON.stringify( this.allContainers ) );
  }

  onSaveExisting ( model ) {
    let containers = JSON.parse( localStorage.getItem( 'allContainers' ) );

    let found = containers.filter( ( cont ) => {
      return ( cont.id === model.id );
    } )[ 0 ];

    for ( let key in model ) {
      if ( key === 'id' ) continue;

      found[ key ] = model[ key ];
    }

    localStorage.setItem( 'allContainers', JSON.stringify( containers ) );
  }

  //LOCATION
  onLocationSave ( model ) {
    let modelId = 0;

    if ( model.id ) {
      modelId = model.id;
    }

    return this.http.post( 
      'http://localhost:8000/locations/' 
      + modelId
      + '/update'
      ,
      model,
      {
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem( 'loginToken' ) } 
      }
    );
  }

  onGetAllLocations () {
    let localStorageArray     = [];

    return this.http.get( 'http://localhost:8000/locations/all' );
  }

  locationSelected: number = 0;
  onSelectLocation ( locationId ) {
    this.locationSelected = locationId;
  }

  printSuccessMessage( message ) {
    this.messaging.onSuccess( message );
  }

  printErrorMessage( message ) {
    this.messaging.onError( message );
  }

  printInfoMessage( message ) {
    this.messaging.onInfo( message );
  }
}
