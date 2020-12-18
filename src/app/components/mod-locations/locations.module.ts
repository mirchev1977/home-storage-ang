import {NgModule} from "@angular/core";
import {LocationComponent} from "./location/location.component";
import {LocationsComponent} from "./locations/locations.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {LocationsPrivateComponent} from "./locations/locations-private/locations-private.component";
import {ContainersModule} from "../mod-containers/containers.module";

@NgModule({
    declarations: [
        LocationComponent,
        LocationsComponent,
        LocationsPrivateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        ContainersModule,
    ],
    exports: [
        LocationsComponent,
        LocationComponent,
        LocationsPrivateComponent,
    ]
})
export class LocationsModule {}
