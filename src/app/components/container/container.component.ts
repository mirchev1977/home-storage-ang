import { Component, OnInit, Input } from '@angular/core';
import { ContainerModel } from '../../models/container.model';
import { CoordsModel } from '../../models/coords.model';
import { UserStoreService } from '../../services/user-store.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() id:          string;
  @Input() imgLink:     string = 'https://www.nakshewala.com/map/page_images/large/img56b43921977763D_floor_planL.jpg';
  @Input() description: string;
  @Input() items:       string;
  @Input() privacy:     string = "public";
  @Input() url:         string = 'https://www.nakshewala.com/map/page_images/large/img56b43921977763D_floor_planL.jpg'; 
  @Input() creator:     string;

  coordRows = [];

  @Input() placeCoords = { row: '', col: '' };
  selected = false;

  @Input() inputMode = true;

  constructor(
    private userStore: UserStoreService, 
    private messaging: MessagingService
  ) { }

  ngOnInit() {
    for ( let i = 0; i < 50; i++ ) {
      let arrRow = [];

      for ( let j = 0; j < 50; j++ ) {
        let currentRow = i.toString();
        let currentCol = j.toString();
        if ( 
          ( this.placeCoords ) 
          && ( this.placeCoords.row )
          && ( this.placeCoords.col )
          && ( currentRow == this.placeCoords.row ) 
          && ( currentCol == this.placeCoords.col ) 
        ) {
          arrRow.push( { value: j,  bg: 'warning' } );
        } else {
          arrRow.push( { value: j,  bg: 'transparent' } );
        }
      }

      this.coordRows.push( 
        arrRow
      );
    }

  }

  onStyleImage () {
    let imgHeight = '200px';
    if ( this.inputMode ) {
      imgHeight = '400px';
    } else {
      imgHeight = '200px';
    }
    return {'height': imgHeight, 'background-color': 'yellow', 
    'background-image': "url('"+ this.url +"')",
      'background-position': 'center',
      'background-repeat':   'no-repeat',
      'background-size': '100% 100%',
    };
  }

  onImageLoad() {
    this.url = this.imgLink;
  }

  onPrivacySelect( event ) {
    this.privacy = event.currentTarget.options[ event.currentTarget.options.selectedIndex ].value;
  }

  onSaveContainer () {
    let model = new ContainerModel(
      this.id,
      this.imgLink,     
      this.description, 
      this.items,       
      this.privacy,     
      this.url,          
      this.userStore.currentUser.id,     
      this.placeCoords,
    );
    this.userStore.onSaveContainer ( model );
    this.inputMode = false;
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

  onEdit() {
    if ( !this.userStore.currentUser    ) return;
    if ( !this.userStore.currentUser.id ) return;
    this.inputMode = true;
  }

  onDelete () {
    if ( !this.userStore.currentUser    ) return;
    if ( !this.userStore.currentUser.id ) return;
    this.userStore.onContainerDelete( this.id );
  }

}
