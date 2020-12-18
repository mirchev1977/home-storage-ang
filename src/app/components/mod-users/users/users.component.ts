import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../../services/user-store.service';
import { MessagingService } from '../../../services/messaging.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( 
    private userStore: UserStoreService, 
    private messaging: MessagingService
  ) { }

  ngOnInit() {
  }

  usrStore () {
    return this.userStore;
  }

}
