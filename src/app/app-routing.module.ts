import { NgModule                  } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { ItemComponent             } from './components/item/item.component';
import { HomeComponent             } from './components/home/home.component';

const routes: Routes = [
  { path: '',                  component: HomeComponent                                                        },
  { path: '',                  loadChildren: "./components/mod-locations/locations.module#LocationsModule"     },
  { path: '',                  loadChildren: "./components/mod-containers/containers.module#ContainersModule"  },
  { path: 'usersEdit',         loadChildren: "./components/mod-users/users.module#UsersModule"                 },
  { path: '',                  loadChildren: "./common/commons.module#CommonsModule"                           },
  { path: '',                  loadChildren: "./common/commons.module#CommonsModule"                           },
  
  { path: 'item/:containerId/new',  component: ItemComponent                                                    },

  { path: '**',  loadChildren: "./components/mod-containers/containers.module#ContainersModule"                 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
