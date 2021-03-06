import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { UserStoreService } from './services/user-store.service';
import { MessagingService } from './services/messaging.service';

import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { LocationGuard } from './services/location-guard.service';
import {LocationsModule} from "./components/mod-locations/locations.module";
import {ContainersModule} from "./components/mod-containers/containers.module";
import {CommonsModule} from "./common/commons.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {TokenInterceptor} from "./services/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LocationsModule,
    ContainersModule,
    CommonsModule,
  ],
  providers: [
      UserStoreService,
      MessagingService,
      AuthGuard,
      AdminGuard,
      LocationGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
