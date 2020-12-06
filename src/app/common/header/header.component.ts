import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;

  constructor( private dataStore: DataStoreService ) { }

  ngOnInit() {
    this.userLoggedIn = this.dataStore.userLoggedIn;
    console.log( this.dataStore.allUsers );
  }

}
