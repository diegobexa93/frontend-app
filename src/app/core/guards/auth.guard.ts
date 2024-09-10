import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, 
              private router: Router,
              private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {

      const token = this.authService.getToken(); // Get token from AuthService

      if (token && !this.jwtHelper.isTokenExpired(token))
      return true;
    else{
        this.router.navigate(['/login']);
        return false;
      }

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
