import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.server;
  constructor(private http: HttpClient
  ) { }


  postMethod(url: string, data: any, queryParams?: any): Observable<any> {
    url = url.replace(/#/g, "%23");
    return this.http.post(this.baseUrl + url, data, {
      params: queryParams,
    }).pipe(catchError(this.handleError));
  }

  putMethod(url: string, data: any, params?: number): Observable<any> {
    url = url.replace(/#/g, "%23");
    url = params ? this.baseUrl + url + `/${params}` : this.baseUrl + url;
    return this.http.put(url, data,
    ).pipe(catchError(this.handleError));
  }
  getMethod(url: string, queryParams?: any): Observable<any> {
    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        params = params.set(key, queryParams[key]);
      });
    } url = url.replace(/#/g, "%23");
    return this.http.get(this.baseUrl + url, { params }
    ).pipe(catchError(this.handleError));
  }
  deleteMethod(url: string, params: any): Observable<any> {
    return this.http.delete(this.baseUrl + url + `/${params}`);
  }
  handleError(error: any) {
    return throwError(error.error);
  }

}
