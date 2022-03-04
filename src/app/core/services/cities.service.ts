import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapServicesUrl } from './http-instanse';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  requestError = new Subject<string>();

  constructor(private http: HttpClient) {}

  getCityLocation(cityName: string) {
    return this.http
      .get(`${MapServicesUrl}/search?q=${cityName}&format=json`)
      .pipe(
        tap(response => {
          return response;
        }),
        catchError(responseError => {
          return throwError(responseError);
        })
      );
  }
}
