/* eslint-disable no-unused-vars */
import * as fromAppStore from '../store/app.reducer';
import * as fromCheckoutActions from '../containers/checkout/store/checkout.actions';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { CheckoutListItem } from '../containers/checkout/store/checkout.reducers';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { baseURL } from './http-instanse';
@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store<fromAppStore.AppState>
  ) {}

  // eslint-disable-next-line
  ngOnInit(): void {
    this.store.select('checkout').subscribe();
  }

  getOrderts() {
    // eslint-disable-next-line no-undef
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    return this.http.get(`${baseURL}/orders/${userId}.json`).pipe(
      map((responseData) => {
        const ordersList = Object.values(responseData);
        return ordersList;
      }),
      catchError((responseError) => {
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
    // eslint-disable-next-line no-undef
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    const date = new Date();
    return this.http
      .post(`${baseURL}/orders/${userId}.json`, {
        phoneNumber: phoneNumber,
        streetName: streetName,
        notes: notes,
        checkoutList: checkoutList,
        totalPrice: totalPrice,
        date: date.toDateString()
      })
      .pipe(
        catchError((responseError) => {
          this.store.dispatch(
            new fromCheckoutActions.CheckoutFail(responseError)
          );
          return responseError;
        })
      );
  }
}
