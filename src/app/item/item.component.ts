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

  vMode = true;

  selected = false;
  placeCoords = { row: '', col: '' };

  constructor() { }

  coordRows = [];

  ngOnInit() {
    for ( let i = 0; i < 50; i++ ) {
      let arrRow = [];

      for ( let i = 0; i < 50; i++ ) {
        arrRow.push( { value: i,  bg: 'transparent' } );
      }

      this.coordRows.push( 
        arrRow
      );
    }
      this.switchView();
  }

  onChangeVisualMode () {
    this.vMode = !this.vMode;
    this.switchView()
  }

  getClasses () {
    //let arr = [ "p-3", "col-12", "bg-light", "border", "rounded", "offset-3" ];
    let arr = [ "p-3", 'col-sm-12', 'col-md-10', 'col-lg-8', 'col-xl-6', "bg-light", "border", "rounded" ];
    return arr.join( " " );
  }

  switchView () {
    if ( this.vMode ) {
      this.nameLabel = 'Name - Visual';
      this.descriptionLabel = 'Description - Visual';
    } else {
      this.nameLabel = 'Name - Input';
      this.descriptionLabel = 'Description - Input';
    }
  }

  onCoordCatch( event ) {
    var id = '';

    if ( event.target.tagName.match( /img/i ) ) {
      if ( !event.target                  ) return;
      if ( !event.target.parentElement    ) return;
      if ( !event.target.parentElement.id ) return;
      id = event.target.parentElement.id; 
    } else {
      id = event.target.id;
    }

    if ( !id ) return;

    var coords = id.split( '_' );
    var row = coords[ 0 ];
    var col = coords[ 1 ];

    if ( 
      row == this.placeCoords.row 
      && col == this.placeCoords.col 
    ) {
      this.placeCoords.row = '';
      this.placeCoords.col = '';
      this.selected = false;
      this.coordRows[ row ][ col ].bg = 'transparent';
      return;
    }

    if ( this.selected ) {
      return;
    }

    this.placeCoords.row = row;
    this.placeCoords.col = col;

    this.selected = true;

    this.coordRows[ row ][ col ].bg = 'warning';
  }

}
