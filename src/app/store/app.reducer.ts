import * as fromAuth from '../shared/containers/auth/store/auth.reducer';
import * as fromCheckout from '@user/containers/checkout/store/checkout.reducers';
import * as fromCustomer from '../admin-site/containers/customers/store/customer.reducers';
import * as fromOrders from '@user/containers/orders/store/orders.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  checkout: fromCheckout.checkoutState;
  orders: fromOrders.ordersState;
  customers: fromCustomer.CustomerState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  checkout: fromCheckout.checkoutReducer,
  orders: fromOrders.ordersReducer,
  customers: fromCustomer.customerReducer,
};
