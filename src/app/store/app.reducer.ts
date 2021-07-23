import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../containers/auth/store/auth.reducer';
import * as fromCheckout from '../containers/checkout/store/checkout.reducers';

export interface AppState {
    auth: fromAuth.State;
    checkout: fromCheckout.checkoutState
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    checkout: fromCheckout.checkoutReducer
}
