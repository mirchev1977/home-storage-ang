import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute     } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Output() itemSaved   = new EventEmitter();
  @Output() itemDeleted = new EventEmitter<number>(); 
  @Output() itemEdited  = new EventEmitter<{ id: string, description: string, imgUrl: string }>(); 

  @Input() id:          string;
  @Input() description: string;
  @Input() imgUrl:      string;

  @Input() isNew:     boolean = false;
  @Input() inputMode: boolean = false;

  @Input() containerId: string;

  constructor(
    public storeService: UserStoreService,
    private router: Router,
    private route:  ActivatedRoute,
  ) {}

  ngOnInit() {
    if ( 
      ( this.route.snapshot.url.length > 0 ) 
      && ( this.route.snapshot.url[ 0 ].path === 'item'        ) 
      && ( this.route.snapshot.url[ 1 ].path.match( /[0-9]+/ ) ) 
      && ( this.route.snapshot.url[ 2 ].path === 'new'         ) 
    ) {
      this.isNew     = true;
      this.inputMode = true;
      this.containerId = this.route.snapshot.url[ 1 ].path;
    }
  }

  onSave () {

    if ( this.id ) {
      this.storeService.updateItem( this.id, {
        id:          this.id,
        description: this.description,
        imgUrl:      this.imgUrl
      } ).subscribe( resp => {
        if ( resp[ 'status' ] === 'ok' ) {
          this.inputMode = false;
          this.itemEdited.emit( {
            id:          this.id,
            description: this.description,
            imgUrl:      this.imgUrl,
          } );

          this.storeService.printSuccessMessage( 'Item updated successfully' );
        } else {
          this.storeService.printErrorMessage( resp[ 'msg' ] );
          this.storeService.logOut();
        }
      }, err => {
        console.log( err );
        debugger;
      } );

      return;
    }

    this.storeService.newItem( {
      id:          this.id,
      description: this.description,
      imgUrl:      this.imgUrl,
      container:   this.containerId
    } ).subscribe( response => {
      if ( response[ 'status' ] === 'ok' ) {
        this.storeService.printSuccessMessage( 'Item created!' );
        let cont = {
          id:          response[ 'id' ],
          description: this.description,
          containerId: this.containerId,
          imgUrl:      this.imgUrl,
        };

        this.storeService.allItems.push(  cont  );
        this.itemSaved.emit();
      } else {
        this.storeService.printErrorMessage( response[ 'msg' ] );
      }
    }, ( error ) => {
      console.log( error );
      this.storeService.printErrorMessage( 'Container cannot be created!' );
      debugger;
    } ); 
  }

  onStyleImage () {
    let imgHeight = '300px';
    if ( this.inputMode ) {
      imgHeight = '500px';
    } else {
      imgHeight = '300px';
    }
    return {'height': imgHeight, 'background-color': 'yellow', 
    'background-image': "url('"+ this.imgUrl +"')",
      'background-position': 'center',
      'background-repeat':   'no-repeat',
      'background-size': '100% 100%',
    };
  }

  deleteItem () {
    this.storeService.deleteItem( this.id ).subscribe( resp => {
      if ( resp[ 'status' ] === 'ok' ) {
        this.itemDeleted.emit( Number( this.id ) );
        this.storeService.printSuccessMessage( 'Item deleted successfully!' );
      } else {
        this.storeService.printErrorMessage( 'Item cannot be deleted!' );
      }
    }, err => {
      console.log( err );
      debugger;
    } );
  }

  editItem () {
    this.isNew     = true;
    this.inputMode = true; 
  }
}
