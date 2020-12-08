import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserStoreService } from './user-store.service';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor ( private userStore: UserStoreService, private router: Router ) {}
  canActivate( route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
      if ( this.userStore.currentUser 
        && ( 
            ( this.userStore.currentUser.role === 'user' ) 
            || ( this.userStore.currentUser.role === 'admin' )
          ) 
      ) {
        return true;
      } else {
        this.router.navigate( [ '/' ] );
      }
  }
}
