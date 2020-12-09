import { NgModule                  } from '@angular/core';
import { Routes, RouterModule      } from '@angular/router';

import { LoginFormComponent        } from './common/login-form/login-form.component';
import { RegistrationFormComponent } from './common/registration-form/registration-form.component';
import { ContainersComponent       } from './components/containers/containers.component';
import { UsersComponent            } from './components/users/users.component';
import { ItemComponent             } from './components/item/item.component';

import { AuthGuard                 } from './services/auth-guard.service';
import { AdminGuard                } from './services/admin-guard.service';

const routes: Routes = [
  { path: '',                  component: ContainersComponent                              },
  { path: 'locations/private', canActivate: [ AuthGuard ],  component: ContainersComponent },
  { path: 'usersEdit',         canActivate: [ AdminGuard ], component: UsersComponent      },
  { path: 'login',             component: LoginFormComponent                               },
  { path: 'register',          component: RegistrationFormComponent                        },
  
  { path: 'item/:containerId/new',  component: ItemComponent                               },

  { path: '**',  component: ContainersComponent                                            },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
