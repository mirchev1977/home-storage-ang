import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  id:       string;
  name:     string;
  email:    string;
  password: string;
  role:     string;
  token:    string;

  constructor( private userStore: UserStoreService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  onRegister () {
    let model = new UserModel( '0', this.name, this.email, this.password, 'user', '1234' );

    this.userStore.register( model ).subscribe(( response => {
        if ( !response || response[ 'status' ] !== 'ok' ) {
          this.userStore.printErrorMessage( 'User: ' + model.email + ' failed to register' );
          this.router.navigate( [ '/' ], { relativeTo: this.route } );
          return;
        }
        this.userStore.logIn( this.email, this.password ).subscribe( ( data ) => {
          this.userStore.currentUser = model;
          this.userStore.userLoggedIn = true;
          localStorage.setItem( 'loginToken', data[ 'token' ] );
          localStorage.setItem( 'currentUser', JSON.stringify( data[ 'user' ] ) );
          data[ 'user' ][ 'password' ] = model.password;
          data[ 'user' ][ 'token'    ] = model.token;
          this.userStore.addNewUser( data[ 'user' ] );
          this.userStore.printSuccessMessage( 'User successfully logged in.' );
          this.router.navigate( [ '/' ], { relativeTo: this.route } );
        }, ( error: string ) => { 
          this.userStore.printErrorMessage( 'User cannot log in. Please, try again later!' );
          console.log( error );
        } ); 
      } )
    );
  }

  onKeyDownEvent ( event ) {
    if ( event.key === 'Enter' ) {
      this.onRegister();
    }
  }

}
