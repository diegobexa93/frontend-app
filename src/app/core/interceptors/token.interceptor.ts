import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../components/auth/services/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar // Optional: Inject the notification service
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getToken();
      if (token !== null) {
        request = this.addTokenHeader(request, token);

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

            // Show the error message (Optional: Using Angular Material Snackbar)
            this.snackBar.open(errorMessage, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            });

            // Log the error message to the console
            console.error(errorMessage);

            // Pass the error to the caller
            return throwError(() => new Error(errorMessage));
          })
        );
      }
    }

    // If not logged in, just proceed with the request as is
    return next.handle(request);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
