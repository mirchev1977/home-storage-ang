import {NgModule} from "@angular/core";
import {LocationComponent} from "./location/location.component";
import {LocationsComponent} from "./locations/locations.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {LocationsPrivateComponent} from "./locations/locations-private/locations-private.component";
import {ContainerComponent} from "../container/container.component";
import {ContainersComponent} from "../containers/containers.component";
import {ItemComponent} from "../item/item.component";

@NgModule({
    declarations: [
        LocationComponent,
        LocationsComponent,
        LocationsPrivateComponent,
        ContainerComponent,
        ContainersComponent,
        ItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
    ],
    exports: [
        LocationsComponent,
        LocationComponent,
        LocationsPrivateComponent,
        ContainerComponent,
        ContainersComponent,
        ItemComponent,
    ]
})
export class LocationsModule {}
