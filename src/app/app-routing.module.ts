import { NgModule                  } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { ContainersComponent       } from './components/mod-containers/containers/containers.component';
import { ItemComponent             } from './components/item/item.component';
import { LocationsPrivateComponent } from './components/mod-locations/locations/locations-private/locations-private.component';
import { HomeComponent             } from './components/home/home.component';

import { AuthGuard                 } from './services/auth-guard.service';
import { LocationGuard             } from './services/location-guard.service';

const routes: Routes = [
  { path: '',                   component: HomeComponent                                                   },
  { path: 'locations/private',  canActivate: [ AuthGuard ], component: LocationsPrivateComponent           },
  { path: 'containers/private', canActivate: [ AuthGuard, LocationGuard ], component: ContainersComponent  },
  { path: 'usersEdit',          loadChildren: "./components/mod-users/users.module#UsersModule"            },
  { path: 'login',              loadChildren: "./common/commons.module#CommonsModule"                      },
  { path: 'register',           loadChildren: "./common/commons.module#CommonsModule"                      },
  
  { path: 'item/:containerId/new',  component: ItemComponent                                               },

  { path: '**',  component: ContainersComponent                                                            },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
