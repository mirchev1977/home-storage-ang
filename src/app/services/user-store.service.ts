import { Injectable           } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MessagingService     } from './messaging.service';
import { UserModel            } from '../models/user.model';
import { ContainerModel       } from '../models/container.model';
import { HttpClient           } from '@angular/common/http';


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

    return this.http.get( 'https://mirchev-home-storage-py.herokuapp.com/users/all', { 
      //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
    } );
  }

  loadContainers() {
    return this.http.get( 
      'https://mirchev-home-storage-py.herokuapp.com/containers/all?locationId=' + this.locationSelected  
    );
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
      'https://mirchev-home-storage-py.herokuapp.com/user/login', credentials
    );
  }

  logOut () {
    return this.http.get( 'https://mirchev-home-storage-py.herokuapp.com/user/logout', {
      //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
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

    return this.http.post( 'https://mirchev-home-storage-py.herokuapp.com/users/new', userModel );
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


    return this.http.post( 'https://mirchev-home-storage-py.herokuapp.com/users/' + id +  '/update', user, {
      //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
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


    this.http.get( 'https://mirchev-home-storage-py.herokuapp.com/users/' + id + '/delete', {
      //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
    } ).subscribe( resp => {
      this.allUsers = users;
      this.messaging.onSuccess( 'User deleted successfully!' );
    } );
  }

  searchTerm = '';
  search ( searchTerm, locationId ) {
    this.searchTerm = searchTerm;

    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/search/items', 
      { searchTerm: searchTerm, locationId: locationId },
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }


  //CONTAINER
  onSaveContainer ( container: ContainerModel ) {
    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/containers/new', 
      container,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  onContainerDelete ( contId ) {

    let remaining = this.allContainers.filter( ( cont ) => {
      return ( cont.id !== contId );
    } );


    this.http.get( 'https://mirchev-home-storage-py.herokuapp.com/container/' + contId + '/delete', {
      //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
    } ).subscribe( resp => {
      if ( resp[ 'status' ] === 'ok' ) {
        this.allContainers = remaining; 
        this.messaging.onSuccess( 'Container deleted successfully!' );
      } else {
        this.messaging.onError( resp[ 'msg' ] );
      }
    } );
  }

  onSaveExisting ( model ) {

    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/container/' 
      + model.id
      + '/update'
      ,
      model,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  //LOCATION
  onLocationSave ( model ) {

    let modelId = 0;

    if ( model.id ) {
      modelId = model.id;
    }

    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/locations/' 
      + modelId
      + '/update'
      ,
      model,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  onGetAllLocations () {

    let lsCopied = localStorage.getItem( 'copied' );

    if ( lsCopied ) {
      let lsCopiedObj = JSON.parse( lsCopied ) || {};
      this.setItemsCopied( lsCopiedObj );
    }

    let localStorageArray     = [];

    return this.http.get( 'https://mirchev-home-storage-py.herokuapp.com/locations/all' );
  }

  locationSelected: number = 0;
  locationName:     string = '';
  onSelectLocation ( locationId, locationName ) {
    this.locationSelected = locationId;
    this.locationName     = locationName;
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

  //ITEMS
  allItems = [];
  newItem ( item ) {

    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/item/new',
      item,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  getAllItems ( contId ) {
    let searchTerm = this.searchTerm;
    
    let url = 'https://mirchev-home-storage-py.herokuapp.com/items/' + contId +'/all';

    if ( searchTerm ) {
      url += '?searchTerm=' + searchTerm;
    }

    return this.http.get( 
      url,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  setAllItems ( allItems ) {
    this.allItems = allItems || [];
  }

  deleteItem ( id ) {

    return this.http.get( 
      'https://mirchev-home-storage-py.herokuapp.com/item/' + id +'/delete',
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  updateItem ( id, item ) {

    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/item/' + id +'/update',
      item,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  createLoginToken () {
    let currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
    if (!currentUser) currentUser = { 'email': 'default@default.com', 'role': 'admin' };
    let tokenArr = [
      localStorage.getItem( 'loginToken' ),
      currentUser[ 'email' ],
      currentUser[ 'role' ]
    ];

    return tokenArr.join( ';;' );
  }

  itemsCopied = {};

  setItemsCopied ( itemsCopied ) {
    this.itemsCopied = itemsCopied;
    localStorage.setItem( 'copied', JSON.stringify( this.itemsCopied ) );
  }

  getItemsCopied () {
    return this.itemsCopied;
  }

  copyItems ( dto ) {
    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/items/paste',
      dto,
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }

  destroySearchTerm() {
    this.searchTerm = '';
  }

  uploadFile ( fileBase64 ) {
    return this.http.post( 
      'https://mirchev-home-storage-py.herokuapp.com/items/uploadFile',
      { image: encodeURIComponent( fileBase64 ) },
      {
        //headers: { 'Content-Type': 'application/json', Authorization: this.createLoginToken() }
      }
    );
  }
}
