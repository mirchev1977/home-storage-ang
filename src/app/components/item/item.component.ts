import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute     } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Output() itemSaved = new EventEmitter();

  @Input() description: string;
  @Input() imgUrl:      string;

  @Input() isNew:     boolean = false;
  @Input() inputMode: boolean = false;

  @Input() containerId: string;

  constructor(
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
    let lsItems = localStorage.getItem( 'allItems' );

    let allItemsArray = [];
    if ( lsItems && lsItems.length > 0 )  {
      allItemsArray = JSON.parse( lsItems );
    }

    allItemsArray.push( {
      description: this.description,
      containerId: this.containerId,
      imageUrl:    this.imgUrl,
    } );

    localStorage.setItem( 'allItems', JSON.stringify( allItemsArray ) ); 
    this.itemSaved.emit();
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

}
