import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})

export class SidenavService {

  constructor( private matSidenav: MatSidenav, ) {    
  }

  public setSidenav(sidenav: MatSidenav) {
    this.matSidenav = sidenav;
  }

  public toggle(): void {
    this.matSidenav.toggle();
  }
}
