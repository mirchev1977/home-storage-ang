import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  logInObservable: Subscription;
  email = '';
  password = '';

  constructor( private userStore: UserStoreService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    if ( this.logInObservable ) {
      this.logInObservable.unsubscribe();
    }
  }

  onLogin () {
    this.userStore.logIn( this.email, this.password ).subscribe( data => {
      this.userStore.currentUser = data[ 'user' ];
      this.userStore.userLoggedIn = true;
      this.userStore.printSuccessMessage( 'User successfully logged in.' );
      localStorage.setItem( 'loginToken', data[ 'token' ] );
      localStorage.setItem( 'currentUser', JSON.stringify( data[ 'user' ] ) );
      this.router.navigate( [ '/' ], { relativeTo: this.route } );
    }, 
      ( error: string ) => { console.log( error ) } 
    );
  }

  onKeyDownEvent ( event ) {
    if ( event.key === 'Enter' ) {
      this.onLogin();
    }
  }

}
