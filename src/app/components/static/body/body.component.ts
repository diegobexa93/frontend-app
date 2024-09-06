import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../auth/services/auth.service';
import { SidenavService } from '../../../shared/services/sidenav.service';
import { SpinnerService } from '../../../shared/services/spinner.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit, AfterViewInit {
  @ViewChildren('sidenav') sidenav!: QueryList<MatSidenav>;

  constructor(
    private sidenavService: SidenavService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav.first);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isVisible(): boolean {
    return this.spinnerService.isVisible();
  }
}
