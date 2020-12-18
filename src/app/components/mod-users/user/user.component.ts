import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../../services/user-store.service';
import { MessagingService } from '../../../services/messaging.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() email: string;
  @Input() password: string;
  @Input() role: string;
  @Input() token: string;

  inputMode: boolean = false;
  user: UserModel;

  constructor( 
    private userStore: UserStoreService, 
    private messaging: MessagingService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onEdit( event ) {
    event.preventDefault()
    this.inputMode = true;
  }

  onSave ( event ) {
    event.preventDefault();
    let resp = prompt( 'SAVE? ARE YOU SURE? [yes/n]' );

    if ( !resp.match( /yes|YES/i ) ) {
      return;
    }
      this.inputMode = false;

      this.userStore.onSave( this.id, this.name, this.email, this.password, this.role, this.token )
      .subscribe( response => {
        if ( response && response[ 'status' ] === 'ok' ) {
          this.userStore.printSuccessMessage( 'User ' + this.email + ' edited successfully!' );
        } else {
          this.userStore.printErrorMessage( response[ 'msg' ] );
          this.userStore.logOut();
          this.router.navigate( [ '/' ], { relativeTo: this.route } );
        }
      } );
  }

  onDelete ( event ) {
    event.preventDefault()
    let resp = prompt( 'DELETE? ARE YOU SURE? [yes/n]' );

    if ( !resp.match( /yes|YES/i ) ) {
      return;
    }


    this.userStore.onDelete( this.id );
  }

  //getById ( id: string ) {
  //  this.user = this.userStore.allUsers.filter( ( u ) => { return ( u.id === id.toString() ) } )[ 0 ];
  //}

}
