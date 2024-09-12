import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AlertService } from '../shared/services/alert.service';
import { UserCreate, UserList } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient,
              private alertService: AlertService) {}

  post(user: UserCreate): Observable<any>
  {
    return this.http.post<UserCreate>(`${environment.apiUri}/v1/User/CreateUser`, user, this.httpOptions).pipe(
      map((response: any) => { 
        
        this.alertService.showSuccessAlert("User Create Success!", "");
        return response;

      }),
      catchError((error: HttpErrorResponse) => {
        console.error('error: ', error);
        this.alertService.showWarningAlert('Alert', error.error.detail)
        return of(false);
      })
    );
  }

  getAll(): Observable<UserList[]> {
    return this.http.get<UserList[]>(environment.apiUri + "/v1/User/GetAll", this.httpOptions);
  }


}
