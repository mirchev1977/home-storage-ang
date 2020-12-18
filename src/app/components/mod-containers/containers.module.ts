import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ContainersComponent} from "./containers/containers.component";
import {ContainerComponent} from "./container/container.component";
import {ItemComponent} from "../item/item.component";
import {AuthGuard} from "../../services/auth-guard.service";
import {LocationGuard} from "../../services/location-guard.service";


const routes: Routes = [
    { path: 'containers/private', canActivate: [ AuthGuard, LocationGuard ], component: ContainersComponent  },
    { path: '',  component: ContainersComponent                                            },
];

@NgModule({
    declarations: [
        ContainersComponent,
        ContainerComponent,
        ItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        ContainersComponent,
        ContainerComponent,
        ItemComponent,
        RouterModule
    ]
})
export class ContainersModule {}
