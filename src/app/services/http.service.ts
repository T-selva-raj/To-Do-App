import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/enviorment';
import { Router } from '@angular/router';
import { SnackType } from '../shared/models/models';
import { SnackbarService } from '../shared/services/snackbar.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.server;
  constructor(private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) { }


  postMethod(url: string, data: any, queryParams?: any): Observable<any> {
    url = url.replace(/#/g, "%23");
    return this.http.post(this.baseUrl + url, data, {
      params: queryParams,
    }).pipe(catchError(this.handleError));
  }
  getMethod(url: string, queryParams?: any): Observable<any> {
    url = url.replace(/#/g, "%23");
    return this.http.get(this.baseUrl + url, { params: queryParams }
    ).pipe(catchError(this.handleError));
  }
  deleteMethod(url: string, params: any): Observable<any> {
    return this.http.delete(this.baseUrl + url + `/${params}`);
  }
  handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      // localStorage.clear();
      // this.snackbar.openSnackBar({ message: "Session expired..!", snacktype: SnackType.Error, class: 'error' });
      // this.router.navigate(['/login']);
      return throwError(() => error);

    }

    let errorMessage = 'Unknown error!';
    // if (error.error instanceof ErrorEvent) {
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   errorMessage = error.error;
    // }
    return throwError(() => errorMessage);
  }

}
