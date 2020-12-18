import { NgModule                  } from '@angular/core';
import { Routes, RouterModule      } from '@angular/router';

import { LoginFormComponent        } from './common/login-form/login-form.component';
import { RegistrationFormComponent } from './common/registration-form/registration-form.component';
import { ContainersComponent       } from './components/mod-containers/containers/containers.component';
import { UsersComponent            } from './components/mod-users/users/users.component';
import { ItemComponent             } from './components/item/item.component';
import { LocationsPrivateComponent } from './components/mod-locations/locations/locations-private/locations-private.component';
import { HomeComponent             } from './components/home/home.component';

import { AuthGuard                 } from './services/auth-guard.service';
import { AdminGuard                } from './services/admin-guard.service';
import { LocationGuard             } from './services/location-guard.service';

const routes: Routes = [
  { path: '',                   component: HomeComponent                                                   },
  { path: 'locations/private',  canActivate: [ AuthGuard ], component: LocationsPrivateComponent           },
  { path: 'containers/private', canActivate: [ AuthGuard, LocationGuard ], component: ContainersComponent  },
  { path: 'usersEdit',          canActivate: [ AdminGuard ], component: UsersComponent                     },
  { path: 'login',              component: LoginFormComponent                                              },
  { path: 'register',           component: RegistrationFormComponent                                       },
  
  { path: 'item/:containerId/new',  component: ItemComponent                                               },

  { path: '**',  component: ContainersComponent                                                            },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
