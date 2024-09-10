import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AlertService } from '../shared/services/alert.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private alertService: AlertService) {}

  post(user: User): Observable<any>
  {
    return this.http.post<User>(`${environment.apiUri}/v1/User/CreateUser`, user).pipe(
      map((response: any) => { 
        
        this.alertService.showSuccessAlert("Create User", "User create!");
        return response;

      }),
      catchError((error: HttpErrorResponse) => {
        console.error('error: ', error);
        this.alertService.showWarningAlert('Alert', error.error.detail)
        return of(false);
      })
    );
  }

}
