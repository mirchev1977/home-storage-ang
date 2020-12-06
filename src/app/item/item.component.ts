import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() name:        string = '';
  @Input() description: string = '';
  @Input() synonyms:    []     = [];

  //Labels
  nameLabel        = ''
  descriptionLabel = ''

  vMode = false;

  constructor() { }

  ngOnInit() {
  }

  onChangeVisualMode () {
    this.vMode = !this.vMode;

    if ( this.vMode ) {
      nameLabel = 'Name - Visual';
      descriptionLabel = 'Description - Visual';
    } else {
      nameLabel = 'Name - Input';
      descriptionLabel = 'Description - Input';
    }
  }

}
