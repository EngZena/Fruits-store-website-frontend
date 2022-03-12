import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.log('error is intercept');
        console.log(error);
        return throwError(error);
      }),
      finalize(() => {
        console.log('error finished');
      })
    );
  }
}
