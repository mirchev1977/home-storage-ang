import { Component, OnInit, Input } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() isNew       = true;
  @Input() isInputMode = true;

  @Input() id:       string;
  @Input() location: string = '';
  @Input() privacy:  string = 'public';
  @Input() imgUrl:   string = '';
  @Input() creator:  string = '';

  constructor( public storeService: UserStoreService ) { }

  ngOnInit() {
  }

  labels = [
    { name: 'Location', type: 'text'                },
    { name: 'Privacy',  type: 'select', options: [ 'Public', 'Private' ] },
    { name: 'ImgUrl',   type: 'text'                },
  ];

  getValue ( labelName ) {
    let labName = labelName.charAt( 0 ).toLowerCase() + labelName.slice( 1 );
    return this[ labName ]; 
  }

  onInput ( event ) {
    this[ 
      event.currentTarget.id.charAt( 0 ).toLowerCase()
        + event.currentTarget.id.slice( 1 )
    ] = event.currentTarget.value;
  }

  onChange ( event ) {
    let id             = event.currentTarget.id;
    let index          = event.currentTarget.selectedIndex;
    let optionSelected = event.currentTarget.options[ index ];
    let value          = optionSelected.value;

    this[ id.toLowerCase() ] = value;
  }

  onSave () {
    let response = this.storeService.onLocationSave( {
      id:       this.id,
      location: this.location,
      privacy:  this.privacy,
      imgUrl:   this.imgUrl,
      creator:  this.storeService.currentUser.id,
    } );

    if ( response.status ) {
      this.id = response.model.id;

      this.isNew       = false;
      this.isInputMode = false;
    }
  }

  appendClasses ( label ) {
    if ( label === 'Privacy' ) {
      return "col-2 btn btn-outline-info mx-1 text-left";
    } else if ( label === 'new_location' ) {
      return "col-2 btn btn btn-primary mx-1 text-center";
    }

    return "col-8 btn btn-outline-info mx-1 text-left";
  }

  onCreateNew () {
    this.ngOnNew();
  }

  ngOnNew() {
    this.id          = '';
    this.isNew       = true;
    this.isInputMode = true;
    this.location    = '';
    this.privacy     = 'public';
    this.imgUrl      = '';
  }

  onEdit () {
    this.isNew       = false;
    this.isInputMode = true;
  }

  onCheckIfSelected ( option ) {
    let opt = option.toLowerCase();

    if ( opt === this.privacy ) {
      return true;
    } 
    return false;
  }

  onSelect () {
    this.storeService.onSelectLocation( this.id );
  }

  onCancel () {
    this.isNew       = false;
    this.isInputMode = false;
  }

}