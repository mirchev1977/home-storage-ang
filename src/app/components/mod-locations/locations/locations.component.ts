import { Component, OnInit, Input } from '@angular/core';
import { UserStoreService  } from '../../../services/user-store.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  @Input() privacy: string = 'private';
  allLocationsArray: any = [];

  constructor( public storeService: UserStoreService ) { }

  ngOnInit() {
    this.storeService.onGetAllLocations()
      .subscribe( responseData => {
         this.allLocationsArray = responseData;
       } );
  }

  displayLocation ( locationPrivacy, locationCreator ) {
    if ( 
      ( this.storeService.userLoggedIn &&
        ( locationPrivacy === this.privacy )  
        && ( 
          locationCreator == this.storeService.currentUser.id ) 
      ) 
      || (
        !this.storeService.userLoggedIn
        && ( locationPrivacy === 'public' )  
      )
    ) {
      return true;
    }

    return false;
  }

}
