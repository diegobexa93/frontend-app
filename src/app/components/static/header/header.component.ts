import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { SidenavService } from '../../../shared/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {


  constructor(
    private sideNav: SidenavService,
    private authService: AuthService,

    
  ) { }

  toggleSidenav(){
    this.sideNav.toggle();
  }

  logOut(){
    this.authService.logout();
  }
}
