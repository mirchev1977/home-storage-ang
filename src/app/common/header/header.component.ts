import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;

  constructor( private dataStore: DataStoreService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  onLogout() {
    setTimeout( () => {
      this.dataStore.userLoggedIn = false;
      this.dataStore.currentUser  = {};
      this.router.navigate( [ '/' ], { relativeTo: this.route } );
    }, 1000 );
  }

}
