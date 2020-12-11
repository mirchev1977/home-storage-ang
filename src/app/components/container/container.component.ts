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
  @Input() vertical:    string = "";
  @Input() url:         string = 'https://www.nakshewala.com/map/page_images/large/img56b43921977763D_floor_planL.jpg'; 
  @Input() creator:     string;
  @Input() locationId:  number = 0;

  coordRows = [];

  labels = [
    { name:  "Description", type: "text"                                               },
    { name:  "Vertical",    type: "select", options: [ '', 'Долу', 'Средата', 'Горе' ] },
    { name:  "Items",       type: "text"                                               },
    { name:  "Privacy",     type: "select", options: [ 'Public', 'Private' ]           },
    { name:  "ImgLink",     type: "text"                                               },
  ];


  @Input() placeCoords = { row: '', col: '' };
  selected = false;

  @Input() inputMode = false;
  @Input() isNew: boolean;

  itemNew: boolean = false;
  newItemLabel: string = 'New Item';

  itemsButton: string = "Items";
  itemsOpened: boolean = false;

  allItemsArray = [];

  constructor(
    private userStore: UserStoreService, 
    private messaging: MessagingService,
  ) { }

  onItemNew () {
    this.itemNew = !this.itemNew;

    if ( this.itemNew ) {
      this.newItemLabel = 'New Item - Close';
    } else {
      this.newItemLabel = 'New Item';
    }
  }

  checkIfSelected( option ) {
    let opt = option.toLowerCase();

    if ( ( opt === this.privacy ) || ( opt === this.vertical ) ) {
      return true;
    } else {
      return false;
    }
  }

  getValue( label ) {
    return this[ label.toLowerCase() ];
  }

  onInput( event ) {
    let prop = event.currentTarget.id.toString().toLowerCase();
    if ( event.currentTarget.id === 'ImgLink' ) {
      prop     = 'imgLink';
      this.url = event.currentTarget.value;
    }
    this[ prop ] = event.currentTarget.value;
  }

  onUpdateItems () {
    this.getAllItems();
    if ( this.allItemsArray.length > 0 ) {
      let itemsDescr = [];
      for ( let itm of this.allItemsArray ) {
        itemsDescr.push( itm.description );
      }
      this.items = itemsDescr.join( ';; ' );
    } else {
      this.items = 'items...';
    }
  }

  ngOnInit() {
    this.onUpdateItems();

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

  onCreateNew ( opt ) {
    this.inputMode   = !this.inputMode;
    this.coordRows = [];
    this.selected = false;

    this.ngOnInit();

    this.id = '';
  }

  onCancel () {
    this.inputMode = false;
  }

  onStyleImage () {
    let imgHeight = '300px';
    if ( this.inputMode ) {
      imgHeight = '500px';
    } else {
      imgHeight = '300px';
    }
    return {'height': imgHeight, 'background-color': 'yellow', 
    'background-image': "url('"+ this.url +"')",
      'background-position': 'center',
      'background-repeat':   'no-repeat',
      'background-size': '100% 100%',
    };
  }

  onPrivacySelect( event ) {
    this.privacy = event.currentTarget.options[ event.currentTarget.options.selectedIndex ].value;
  }

  onSaveContainer () {
    if ( !this.description     ) return;
    //if ( !this.items           ) return;
    if ( !this.placeCoords.row ) return;
    if ( !this.placeCoords.col ) return;
    let model = new ContainerModel(
      this.id,
      this.imgLink,     
      this.description, 
      this.items,       
      this.privacy,     
      this.vertical,     
      this.url,          
      this.userStore.currentUser.id,     
      this.userStore.locationSelected,
      this.placeCoords,
    );
    this.userStore.onSaveContainer ( model ).subscribe(
      resp => {
        model.id = resp[ 'contId' ];

        let lsContainers = localStorage.getItem( 'allContainers' );
        this.userStore.allContainers = JSON.parse( lsContainers );

        this.userStore.allContainers.push( model );

        localStorage.setItem( 
          'allContainers',
          JSON.stringify( this.userStore.allContainers ) 
        );

        this.inputMode = false;
        this.placeCoords.row = '';
        this.placeCoords.col = '';
        this.url             = 'https://www.nakshewala.com/map/page_images/large/img56b43921977763D_floor_planL.jpg'; 
      }
    );

  }

  onSaveExisting () {
    if ( !this.id              ) {
      this.onSaveContainer();
      return;
    }
    if ( !this.description     ) return;
    //if ( !this.items           ) return;
    if ( !this.placeCoords.row ) return;
    if ( !this.placeCoords.col ) return;

    let model = new ContainerModel(
      this.id,
      this.imgLink,     
      this.description, 
      this.items,       
      this.privacy,     
      this.vertical,     
      this.url,          
      this.userStore.currentUser.id,     
      this.userStore.locationSelected,
      this.placeCoords,
    );

    this.userStore.onSaveExisting ( model );
    this.inputMode = false;

    this.userStore.allContainers = JSON.parse(
      localStorage.getItem( 'allContainers' )
    );
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
    if ( this.isNew ) {
      this.inputMode = true;
      return true;
    } else {
      this.inputMode = true;
    }

    if ( !this.userStore.currentUser    ) return;
    if ( !this.userStore.currentUser.id ) return;

    if ( this.creator !== this.userStore.currentUser.id ) return;

    this.inputMode = true;
  }

  onDelete () {
    if ( this.isNew ) return true;

    if ( !this.userStore.currentUser    ) return;
    if ( !this.userStore.currentUser.id ) return;

    if ( this.creator !== this.userStore.currentUser.id ) return;

    this.userStore.onContainerDelete( this.id );
  }

  isOwnedByCurrentUser () {
    if ( this.isNew ) return true;
    if ( !this.userStore                ) { return false; };
    if ( !this.userStore.currentUser    ) { return false; };
    if ( !this.userStore.currentUser.id ) { return false; };
    return ( this.creator == this.userStore.currentUser.id );
    return true;
  }

  onSaveItem() {
    this.itemNew      = false;
    this.onUpdateItems();
  }

  getAllItems () {
    let allItems = localStorage.getItem( 'allItems' );

    if ( allItems ) {
      allItems = JSON.parse( allItems );
      if ( Array.isArray( allItems ) ) {
        this.allItemsArray = allItems.filter( ( itm ) => {
          return ( itm.containerId === this.id );
        } );
      }
    }
  }

  onGetItems () {
    if ( 
      ( ! Array.isArray( this.allItemsArray ) ) 
      || ( Array.isArray( this.allItemsArray ) && this.allItemsArray.length <= 0 )
    ) {
      return;
    }
    this.itemsOpened = !this.itemsOpened;

    if ( this.itemsOpened ) {
      this.itemsButton = 'Items - Close';
      this.getAllItems();
    } else {
      this.itemsButton = 'Items';
    }
  }

  onItemDeleted ( event ) { 
    let itemId = event;

    let allItems = localStorage.getItem( 'allItems' );

    if ( allItems ) {
      allItems = JSON.parse( allItems );
      if ( Array.isArray( allItems ) ) {
        let allItms = allItems.filter( ( itm ) => {
          return ( itm.id !== itemId );
        } );

        localStorage.setItem( 'allItems', JSON.stringify( allItms ) );
      }
    }

    this.getAllItems();
  }

  onItemEdited ( data ) {
    let allItems = localStorage.getItem( 'allItems' );

    if ( allItems ) {
      allItems = JSON.parse( allItems );
      if ( Array.isArray( allItems ) ) {
        let itemFound = allItems.filter( ( itm ) => {
          return ( itm.id === data.id );
        } )[ 0 ];

        itemFound.description = data.description;
        itemFound.imgUrl      = data.imgUrl;

        localStorage.setItem( 'allItems', JSON.stringify( allItems ) );

        this.getAllItems();
      }
    }
  }

  onVerticalSelect ( event )  {
    this.vertical = event.currentTarget.options[ event.currentTarget.options.selectedIndex ].value;
  }

}
