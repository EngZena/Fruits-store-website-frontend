import * as customersActionTypes from './customer.action-types';

import { Action } from '@ngrx/store';
import { CustomerUserModel } from 'src/app/admin-site/core/models/customers.models';

export class setCustomersData implements Action {
  readonly type = customersActionTypes.SET_CUSTOMERS;
  constructor(public payload: CustomerUserModel) {}
}

export class removeAdminFromTheList implements Action {
  readonly type = customersActionTypes.REMOVE_ADMIN_FROM_CUSTOMERS_LIST;
  constructor() {}
}

export class removeCustomerFromTheList implements Action {
  readonly type = customersActionTypes.REMOVE_CUSTOMER_FROM_CUSTOMES_LIST;
  constructor(public payload: string) {}
}

export type CustomerActions =
  | setCustomersData
  | removeAdminFromTheList
  | removeCustomerFromTheList;
