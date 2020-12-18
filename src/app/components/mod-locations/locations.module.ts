import {NgModule} from "@angular/core";
import {LocationComponent} from "./location/location.component";
import {LocationsComponent} from "./locations/locations.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {LocationsPrivateComponent} from "./locations/locations-private/locations-private.component";
import {ContainersModule} from "../mod-containers/containers.module";
import {AuthGuard} from "../../services/auth-guard.service";

const routes: Routes = [
    { path: 'locations/private',  canActivate: [ AuthGuard ], component: LocationsPrivateComponent  },
];

@NgModule({
    declarations: [
        LocationComponent,
        LocationsComponent,
        LocationsPrivateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ContainersModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        LocationsComponent,
        LocationComponent,
        LocationsPrivateComponent,
        RouterModule,
    ]
})
export class LocationsModule {}
