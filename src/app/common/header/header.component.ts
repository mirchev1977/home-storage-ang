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
    let crntUsr = JSON.parse( localStorage.getItem( 'currentUser' ) );
    localStorage.removeItem( 'currentUser' );
    localStorage.removeItem( 'userLoggedIn' );
    setTimeout( () => {
      this.messaging.onInfo( 'User ' + crntUsr.email + ' just logged out...' );
      this.userStore.userLoggedIn = false;
      this.userStore.currentUser  = null;
      this.router.navigate( [ '/' ], { relativeTo: this.route } );
    }, 1000 );
  }

}
