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
    this.userStore.logIn( this.email, this.password ); 

    this.logInObservable =  this.userStore.logInObservable.subscribe( 
      ( data: string ) => { 
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
