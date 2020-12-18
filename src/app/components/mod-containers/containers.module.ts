import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ContainersComponent} from "./containers/containers.component";
import {ContainerComponent} from "./container/container.component";
import {ItemComponent} from "../item/item.component";

@NgModule({
    declarations: [
        ContainersComponent,
        ContainerComponent,
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
        ContainersComponent,
        ContainerComponent,
        ItemComponent,

    ]
})
export class ContainersModule {}
