import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserStoreService } from './user-store.service';



@Injectable()
export class LocationGuard implements CanActivate {
  constructor ( private userStore: UserStoreService, private router: Router ) {}
  canActivate( route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
      if ( this.userStore.locationSelected > 0 ) {
        return true;
      } else {
        this.router.navigate( [ '/' ] );
      }
  }
}
