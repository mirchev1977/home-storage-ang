import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { HeaderComponent } from './common/header/header.component';

import { UserStoreService } from './services/user-store.service';
import { MessagingService } from './services/messaging.service';

import { LoginFormComponent } from './common/login-form/login-form.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { MessagingComponent } from './common/messaging/messaging.component';
import { RegistrationFormComponent } from './common/registration-form/registration-form.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { LocationGuard } from './services/location-guard.service';
import { ContainerComponent } from './components/container/container.component';
import { ContainersComponent } from './components/containers/containers.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationComponent } from './components/location/location.component';
import { HomeComponent } from './components/home/home.component';
import { LocationsPrivateComponent } from './components/locations/locations-private/locations-private.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    HeaderComponent,
    LoginFormComponent,
    HomePageComponent,
    MessagingComponent,
    RegistrationFormComponent,
    UserComponent,
    UsersComponent,
    ContainerComponent,
    ContainersComponent,
    LocationsComponent,
    LocationComponent,
    HomeComponent,
    LocationsPrivateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ UserStoreService, MessagingService, AuthGuard, AdminGuard, LocationGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
