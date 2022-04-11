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
        console.error('error is intercept');
        console.error(error);
        return throwError(error);
      }),
      finalize(() => {
        // eslint-disable-next-line no-console
        console.log('error finished');
      })
    );
  }
}
