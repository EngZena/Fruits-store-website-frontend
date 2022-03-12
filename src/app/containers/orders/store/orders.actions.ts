import * as ordersActionTypes from './orders.action-types';

import { Action } from '@ngrx/store';

export class getAllUserOrders implements Action {
  readonly type = ordersActionTypes.GET_ALL_USER_ORDERS;
  constructor() {}
}

export class setAllUserOrders implements Action {
  readonly type = ordersActionTypes.SET_ALL_USER_ORDERS;
  constructor(public payload: any) {}
}

export class setMoreUserOrders implements Action {
  readonly type = ordersActionTypes.GET_MORE_USER_ORDERS;
  constructor() {}
}

export type ordersActions =
  | setAllUserOrders
  | getAllUserOrders
  | setMoreUserOrders;
