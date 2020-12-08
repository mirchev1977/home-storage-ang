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

  registerObservable: Subscription;
  logInObservable:    Subscription;
  onRegister () {
    let nextId = this.userStore.allUsers.length;
    nextId++;
    let model = new UserModel( nextId.toString(), this.name, this.email, this.password, 'user', '1234' );

    if ( !this.userStore.register( model ) ) {
      return;
    }
    this.registerObservable = this.userStore.registerObservable.subscribe(
      ( data: string ) => { 
        //this.router.navigate( [ '/' ], { relativeTo: this.route } );
      },
      ( error: string ) => { console.log( error ) } 
    );


    this.userStore.logIn( model.email, model.password ); 

    this.logInObservable =  this.userStore.logInObservable.subscribe( 
      ( data: string ) => { 
        this.router.navigate( [ '/' ], { relativeTo: this.route } );
      },
      ( error: string ) => { console.log( error ) } 
    );
  }

  onKeyDownEvent ( event ) {
    if ( event.key === 'Enter' ) {
      this.onRegister();
    }
  }

}
