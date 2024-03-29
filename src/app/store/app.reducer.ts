import * as fromAuth from '@containers/auth/store/auth.reducer';
import * as fromCheckout from '@containers/checkout/store/checkout.reducers';
import * as fromOrders from '@containers/orders/store/orders.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  checkout: fromCheckout.checkoutState;
  orders: fromOrders.ordersState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  checkout: fromCheckout.checkoutReducer,
  orders: fromOrders.ordersReducer,
};
