import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './common/login-form/login-form.component';
import { RegistrationFormComponent } from './common/registration-form/registration-form.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'usersEdit', canActivate: [ AdminGuard ], component: UsersComponent },
  { path: 'login',  component: LoginFormComponent },
  { path: 'register',  component: RegistrationFormComponent },
  { path: '**',  component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
