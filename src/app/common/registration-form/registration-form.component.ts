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
    let nextId = this.userStore.allUsers.length;
    nextId++;
    let model = new UserModel( nextId.toString(), this.name, this.email, this.password, 'user', '1234' );

    let observable = this.userStore.register( model );

    if ( observable ) {
      observable.subscribe( response => {
        this.userStore.addNewUser( response );
        this.userStore.logIn( response[ 'email' ], response[ 'password' ] ).subscribe( ( data: string ) => {
          this.router.navigate( [ '/' ], { relativeTo: this.route } );
        }, ( error: string ) => { 
          console.log( error );
          debugger;
        } ); 
      } );
    }
  }

  onKeyDownEvent ( event ) {
    if ( event.key === 'Enter' ) {
      this.onRegister();
    }
  }

}
