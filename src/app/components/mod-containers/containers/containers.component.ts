import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStoreService   } from '../../../services/user-store.service';
import { ContainerModel } from '../../../models/container.model';
import { MessagingService   } from '../../../services/messaging.service';
import { ContainerComponent } from '../container/container.component';
import { Router, ActivatedRoute     } from '@angular/router';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit, OnDestroy {
  containerPrivate = false;
  allContainers = [];


  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private userStore: UserStoreService, 
    private messaging: MessagingService
  ) { }

  ngOnInit() {
    this.getSearchTerm();
    if ( 
      ( this.route.snapshot.url.length > 0 ) 
      && ( this.route.snapshot.url[ 0 ].path === 'containers' ) 
      && ( this.route.snapshot.url[ 1 ].path === 'private' ) 
    ) {
      this.containerPrivate = true;
    }

  }

  ngOnDestroy () {
    this.destroySearchTerm();
    this.searchString = '';
    this.search();
  }

  displayContainer ( privacy, creatorId, locationId ) {
    if ( !privacy ) return false;

    var currentUserId = this.getCurrentUserId();

    if ( 
      ( ( privacy === 'private' ) || ( privacy === 'public' ) ) 
      && ( this.containerPrivate === true ) 
      && ( creatorId == currentUserId )
      && ( locationId == this.userStore.locationSelected )
    ) {
      return true;
    }

    if ( 
      ( privacy === 'public' ) 
      && ( this.containerPrivate === false ) 
      && ( locationId == this.userStore.locationSelected )
    ) {
      return true;
    }
  }

  getCurrentUserId() {
    if ( this.userStore.currentUser && this.userStore.currentUser.id  ) {
      return this.userStore.currentUser.id;
    }
  }

  isOwnedByCurrentUser ( creator ) {
    if ( !this.userStore                ) { return false; };
    if ( !this.userStore.currentUser    ) { return false; };
    if ( !this.userStore.currentUser.id ) { return false; };
    return ( creator == this.userStore.currentUser.id );
  }

  checkIfLoggedIn() {
    return this.userStore.userLoggedIn;
  }

  searchString: string = '';
  onInput ( ev ) {
    this.searchString = ev.currentTarget.value;
  }

  onKeyPressedDown ( ev ) {
    if ( ev.code === 'Enter' ) {
      this.search();
    }
  }

  search () {
    this.userStore.search( 
      this.searchString, 
      this.userStore.locationSelected 
    ).subscribe( resp => {
      if ( resp[ 'status' ] === 'ok' ) {
        this.userStore.allContainers = resp[ 'containers' ];
      } else {
        this.userStore.printErrorMessage( resp[ 'msg' ] );
        this.userStore.logOut().subscribe( resp => {
          localStorage.removeItem( 'currentUser' );
          localStorage.removeItem( 'loginToken' );
          this.userStore.currentUser = null;
          this.userStore.userLoggedIn = false;

          this.router.navigate( [ '/' ], { relativeTo: this.route } );
        });
      }
    }, err => {
      console.log( err );
      debugger;
    } );
  }

  usrStore () {
    return this.userStore;
  }

  countItemsCopied () {
    return Object.keys( this.userStore.getItemsCopied() ).length;
  }

  removeItemsCopied () {
    this.userStore.setItemsCopied( {} );
  } 

  searchTerm: string = '';
  getSearchTerm () {
    this.searchTerm = this.userStore.searchTerm || '';
  }

  destroySearchTerm () {
    this.searchTerm = '';
    this.userStore.destroySearchTerm();
  }
}
