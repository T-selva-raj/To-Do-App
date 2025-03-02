import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';

@Injectable()
export class HtttpInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackbar: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = this.setHeader(request);
    return next.handle(modifiedRequest).pipe((catchError((err: HttpErrorResponse) => {
      return this.handleErrorResponse(err);
    })));
  }

  setHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = localStorage.getItem('token');
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return request;
    }
  }
  handleErrorResponse(error: HttpErrorResponse): Observable<never> {
    console.log(error);

    if (error instanceof HttpErrorResponse && error.status == 401) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return throwError(() => error);
    }
    if (error instanceof HttpErrorResponse && error.status !== 400) {
      return throwError(() => new Error("something went wrong!"));
    }
    return throwError(() => error);
  }
}
