import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {MessagingComponent} from "./messaging/messaging.component";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";

@NgModule({
   declarations: [
       HeaderComponent,
       HomePageComponent,
       LoginFormComponent,
       RegistrationFormComponent,
       MessagingComponent,
   ] ,
   imports: [
      CommonModule,
      FormsModule,
      BrowserModule,
      HttpClientModule,
      RouterModule,
   ],
   exports: [
       HeaderComponent,
       HomePageComponent,
       LoginFormComponent,
       RegistrationFormComponent,
       MessagingComponent,
   ],
})
export class CommonsModule {}
