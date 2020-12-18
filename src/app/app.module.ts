import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { UserStoreService } from './services/user-store.service';
import { MessagingService } from './services/messaging.service';

import { LoginFormComponent } from './common/login-form/login-form.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { MessagingComponent } from './common/messaging/messaging.component';
import { RegistrationFormComponent } from './common/registration-form/registration-form.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { LocationGuard } from './services/location-guard.service';
import { HomeComponent } from './components/home/home.component';
import {LocationsModule} from "./components/mod-locations/locations.module";
import {ContainersModule} from "./components/mod-containers/containers.module";
import {UsersModule} from "./components/mod-users/users.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    HomePageComponent,
    MessagingComponent,
    RegistrationFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LocationsModule,
    ContainersModule,
    UsersModule,
  ],
  providers: [ UserStoreService, MessagingService, AuthGuard, AdminGuard, LocationGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
