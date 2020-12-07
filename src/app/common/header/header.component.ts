import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;

  constructor( private userStore: UserStoreService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  onLogout() {
    setTimeout( () => {
      this.userStore.userLoggedIn = false;
      this.userStore.currentUser  = {};
      this.router.navigate( [ '/' ], { relativeTo: this.route } );
    }, 1000 );
  }

}
