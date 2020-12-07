import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ContainerComponent } from './container/container.component';
import { ContainersComponent } from './containers/containers.component';
import { HeaderComponent } from './common/header/header.component';

import { DataStoreService } from './services/data-store.service';
import { MessagingService } from './services/messaging.service';

import { LoginFormComponent } from './common/login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ContainerComponent,
    ContainersComponent,
    HeaderComponent,
    LoginFormComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ DataStoreService, MessagingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
