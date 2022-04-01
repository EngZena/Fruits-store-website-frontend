import * as fromAppStore from '@user/store/app.reducer';
import * as fromCheckoutActions from '@user/containers/checkout/store/checkout.actions';

import { Injectable, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { CheckoutListItem } from '@user/containers/checkout/store/checkout.reducers';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { baseURL } from './http-instanse';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store<fromAppStore.AppState>
  ) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.store.select('checkout').subscribe();
  }

  getOrderts() {
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    return this.http.get(`${baseURL}/orders/${userId}.json`).pipe(
      map(responseData => {
        if (responseData != null) {
          const ordersList = Object.values(responseData);
          return ordersList;
        }
        return null;
      }),
      catchError(responseError => {
        const ordersList = [];
        return ordersList;
      })
    );
  }

  postOrder(
    phoneNumber: number,
    streetName: string,
    notes: string,
    checkoutList: CheckoutListItem[],
    totalPrice: number
  ) {
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    const date = new Date();
    return this.http
      .post(`${baseURL}/orders/${userId}.json`, {
        phoneNumber: phoneNumber,
        streetName: streetName,
        notes: notes,
        checkoutList: checkoutList,
        totalPrice: totalPrice,
        date: date.toDateString(),
      })
      .pipe(
        catchError(responseError => {
          this.store.dispatch(
            new fromCheckoutActions.CheckoutFail(responseError)
          );
          return responseError;
        })
      );
  }
}
