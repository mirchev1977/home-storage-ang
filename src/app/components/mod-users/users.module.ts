import {NgModule} from "@angular/core";
import {UserComponent} from "./user/user.component";
import {UsersComponent} from "./users/users.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "../../services/admin-guard.service";

const routes: Routes = [
    { path: '', canActivate: [ AdminGuard ], component: UsersComponent },
];

@NgModule({
    declarations: [
        UserComponent,
        UsersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        UserComponent,
        UsersComponent,
        RouterModule
    ],
})
export class UsersModule {}
