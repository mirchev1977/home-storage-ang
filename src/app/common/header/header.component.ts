import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;

  constructor( private userStore: UserStoreService, private router: Router, private route: ActivatedRoute, private messaging: MessagingService ) { }

  ngOnInit() {
  }

  onLogout() {
    let crntUsr = this.userStore.currentUser;
    this.userStore.logOut().subscribe( resp => {
      if ( resp[ 'status' ] === 'ok' ) {
        localStorage.removeItem( 'currentUser' );
        localStorage.removeItem( 'loginToken' );
        this.userStore.currentUser = null;
        this.userStore.userLoggedIn = false;
        this.messaging.onInfo( 'User ' + crntUsr.email + ' just logged out...' );

        this.router.navigate( [ '/' ], { relativeTo: this.route } );
      } else {
        this.messaging.onError( 'User ' + crntUsr.email + ' could not log out...' );
      }
    } );
  }

  onCheckIfAdmin () {
    if ( this.userStore.userLoggedIn && this.userStore.currentUser.role === 'admin' ) {
      return true;
    }

    return false;
  }

  onChangeLocation () {
    this.userStore.locationSelected = 0;
  }

  usrStore() {
    return this.userStore;
  }

}
