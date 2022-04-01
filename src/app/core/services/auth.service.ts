import * as AuthActions from '@containers/auth/store/auth.actions';
import * as fromApp from '@store/app.reducer';

import { catchError, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { baseURL } from './http-instanse';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  saveUserData(
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    secretQuestion: string,
    secretAnswer: string
  ) {
    return this.http
      .post(`${baseURL}/usersData.json`, {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        secretQuestion: secretQuestion,
        secretAnswer: secretAnswer,
      })
      .pipe(
        catchError(responseError => {
          return throwError(responseError);
        })
      );
  }

  checkIfEmailExist() {
    return this.http.get(`${baseURL}/usersData.json`).pipe(
      tap(response => {
        return response;
      }),
      catchError(responseError => {
        return throwError(responseError);
      })
    );
  }
}
