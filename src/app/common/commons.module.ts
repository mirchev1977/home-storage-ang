import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {MessagingComponent} from "./messaging/messaging.component";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";

const routes: Routes = [
    { path: '', component: LoginFormComponent       },
    { path: '', component: RegistrationFormComponent },
];
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
      HttpClientModule,
      RouterModule.forChild(routes),
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
