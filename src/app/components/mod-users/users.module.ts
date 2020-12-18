import {NgModule} from "@angular/core";
import {UserComponent} from "./user/user.component";
import {UsersComponent} from "./users/users.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        UserComponent,
        UsersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
    ],
    exports: [
        UserComponent,
        UsersComponent,
    ],
})
export class UsersModule {}
