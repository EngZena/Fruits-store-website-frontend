import * as fromApp from '../../store/app.reducer';
import * as fromcheckoutActions from './store/checkout.actions';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckoutListItem } from './store/checkout.reducers';
import { OrdersService } from 'src/app/core/services/orders.service';
import { Store } from '@ngrx/store';
import { phoneNumberPattren } from '../auth/pattrens';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutList: CheckoutListItem[] = [];
  totalPrice: number;
  checkoutForm: FormGroup;
  showAlert: boolean = false;
  error: string = null;
  constructor(
    private store: Store<fromApp.AppState>,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.store.select('checkout').subscribe(data => {
      this.checkoutList = [...data.checkoutList];
      this.totalPrice = data.total;
      this.error = data.error;
    });
    this.checkoutForm = new FormGroup({
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(phoneNumberPattren),
      ]),
      streetName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      notes: new FormControl(null),
    });
  }

  onRemove(item) {
    this.store.dispatch(new fromcheckoutActions.RemoveFromCheckoutList(item));
  }

  onSubmit() {
    const phoneNumber = this.checkoutForm.get('phoneNumber').value;
    const streetName = this.checkoutForm.get('streetName').value;
    const notes = this.checkoutForm.get('notes').value;
    this.ordersService
      .postOrder(
        phoneNumber,
        streetName,
        notes,
        this.checkoutList,
        this.totalPrice
      )
      .subscribe();
    this.checkoutForm.reset();
    if (this.error === null) {
      this.showAlert = true;
    }
    setTimeout(() => {
      this.store.dispatch(new fromcheckoutActions.EmptyCheckoutList());
      this.showAlert = false;
    }, 2000);
  }
}
