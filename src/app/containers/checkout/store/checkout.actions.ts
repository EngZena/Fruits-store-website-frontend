import * as checoutActionTypes from './checkout.action-types';
import { Action } from '@ngrx/store';

export class AddToCheckoutList implements Action {
  readonly type = checoutActionTypes.ADD_TO_SHOPPING_LIST;
  constructor(
    public payload: {
      name: string;
      price: number;
      image: string;
    }
  ) {}
}

export class RemoveFromCheckoutList implements Action {
  readonly type = checoutActionTypes.REMOVE_FROM_SHOPPING_LIST;
  constructor(
    public payload: {
      name: string;
      price: number;
      image: string;
    }
  ) {}
}

export class EmptyCheckoutList implements Action {
  readonly type = checoutActionTypes.EMPTY_SHOPPING_LIST;
  constructor() {}
}

export class CheckoutFail implements Action {
  readonly type = checoutActionTypes.CHECKOUT_FAIL;
  constructor(payload: string) {}
}

export type CheckoutActions =
  | AddToCheckoutList
  | RemoveFromCheckoutList
  | EmptyCheckoutList
  | CheckoutFail;
