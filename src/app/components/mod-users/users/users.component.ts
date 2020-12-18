import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../../services/user-store.service';
import { MessagingService } from '../../../services/messaging.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( 
    private userStore: UserStoreService, 
    private messaging: MessagingService
  ) { }

  ngOnInit() {
    this.userStore.loadUsers().subscribe(
        ( data )  => {
          if ( data[ 'status' ] === 'ok' ) {
            this.userStore.allUsers = data[ 'users' ];
            this.userStore.printSuccessMessage( 'Users loaded successfully!' );
          } else {
            this.userStore.logOut();
            this.userStore.printErrorMessage( 'Users cannot be loaded!' );
          }
        },
        ( err ) => { console.log( err ) }
    );
  }

  usrStore () {
    return this.userStore;
  }

}
