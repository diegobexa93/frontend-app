import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AlertService } from '../../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private alertService: AlertService) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string, refreshToken: string }>(`${environment.apiUri}/v1/Authenticate/Login`, { Login: email, Password: password }).pipe(
      map(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authRefreshToken', response.refreshToken);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error: ', error); // Log the error
        this.alertService.showInfoAlert('Login Message', error.error.detail)
        return of(false); // Still return false on error
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null
  {
    let token = localStorage.getItem('authToken');
    return token;
  }

  getRefreshToken(): string | null
  {
    let token = localStorage.getItem('authRefreshToken');
    return token;
  }

}
