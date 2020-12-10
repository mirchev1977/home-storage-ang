import { Component, OnInit } from '@angular/core';
import { UserStoreService  } from '../../services/user-store.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  allLocationsArray = [];

  constructor( public storeService: UserStoreService ) { }

  ngOnInit() {
    this.allLocationsArray = this.storeService.onGetAllLocations();
  }

}
