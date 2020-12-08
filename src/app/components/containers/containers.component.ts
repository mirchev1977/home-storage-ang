import { Component, OnInit  } from '@angular/core';
import { UserStoreService   } from '../../services/user-store.service';
import { MessagingService   } from '../../services/messaging.service';
import { ContainerComponent } from '../container/container.component';
import { Router, ActivatedRoute     } from '@angular/router';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  containerPrivate = false;

  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private userStore: UserStoreService, 
    private messaging: MessagingService
  ) { }

  ngOnInit() {
    if ( 
      ( this.route.snapshot.url.length > 0 ) 
      && ( this.route.snapshot.url[ 0 ].path === 'locations' ) 
      && ( this.route.snapshot.url[ 1 ].path === 'private' ) 
    ) {
      this.containerPrivate = true;
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

}
