import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../../services/user-store.service';

@Component({
  selector: 'app-locations-private',
  templateUrl: './locations-private.component.html',
  styleUrls: ['./locations-private.component.css']
})
export class LocationsPrivateComponent implements OnInit {

  constructor( public storeService: UserStoreService ) { }

  ngOnInit() {
  }

}
