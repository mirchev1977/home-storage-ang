import { Component, OnInit } from '@angular/core';
import { UserStoreService  } from '../../services/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locationSelected: number = this.storeService.locationSelected;

  constructor( public storeService: UserStoreService ) { }

  ngOnInit() {
  }

}
