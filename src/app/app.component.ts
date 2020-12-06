import { Component } from '@angular/core';
import { Container } from './common/container.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  containers = [
    new Container ( 'edno' ),
    new Container ( 'dve' ),
    new Container ( 'tri' ),
  ];
}
