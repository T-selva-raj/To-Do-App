import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/enviorment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.server;
  constructor(private http: HttpClient) { }


  postMethod(url: string, data: any, queryParams?: any): Observable<any> {
    url = url.replace(/#/g, "%23");
    return this.http.post(this.baseUrl + url, data, {
      params: queryParams,
    }).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
