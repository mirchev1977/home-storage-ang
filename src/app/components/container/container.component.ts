import { Component, OnInit } from '@angular/core';
import { ContainerModel } from '../../models/container.model';
import { UserStoreService } from '../../services/user-store.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  id:          string;
  imgLink:     string = 'https://www.nakshewala.com/map/page_images/large/img56b43921977763D_floor_planL.jpg';
  description: string;
  items:       string;
  privacy:     string = "public";
  url:         string = 'https://www.nakshewala.com/map/page_images/large/img56b43921977763D_floor_planL.jpg'; 
  creator:     string = '1';

  constructor(
    private userStore: UserStoreService, 
    private messaging: MessagingService
  ) { }

  ngOnInit() {
  }

  onStyleImage () {
    return {'height': '400px', 'background-color': 'yellow', 
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
      this.creator,     
    );
    this.userStore.onSaveContainer ( model );
  }

}
