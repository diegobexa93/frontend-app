import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      const token = this.authService.getToken();

      if(token && !request.url.includes('/Authenticate/Login')){
         request = this.addTokenHeader(request, token);
      }

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle the error
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
              // Client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // Server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            // Log the error message to the console
            console.error(errorMessage);

            // Pass the error to the caller
            return throwError(() => new Error(errorMessage));
          })
        );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
