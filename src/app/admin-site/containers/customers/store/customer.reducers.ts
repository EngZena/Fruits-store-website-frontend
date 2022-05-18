import * as customerActionTypes from './customer.action-types';
import * as customerActions from './customer.actions';

import {
  CustomerModel,
  CustomerUserModel,
} from 'src/app/admin-site/core/models/customers.models';

import { adminEmail } from 'src/app/shared/containers/auth/admin.data';

export interface CustomerState {
  customersList: CustomerUserModel[];
  total: number;
  error: undefined;
}

const initialState: CustomerState = {
  customersList: [],
  total: 0,
  error: null,
};

const setCustomersData = (action, state) => {
  let customersListData = [];
  action.payload.forEach(element => {
    const customer = new CustomerModel(
      element.userName,
      element.firstName,
      element.lastName,
      element.email,
      element.gender
    );
    customersListData.push(customer);
  });
  state = {
    ...state,
    customersList: [...customersListData],
    total: customersListData.length,
  };
  return state;
};

const removeAdminFromCustomersList = (action, state) => {
  const customersList = state.customersList.filter(
    data => data.email !== adminEmail
  );
  state = {
    ...state,
    customersList: [...customersList],
    total: customersList.length,
  };
  return state;
};

const removeCustomerFromCustomersList = (action, state) => {
  const customersList = state.customersList.filter(
    data => data.userName !== action.payload
  );
  state = {
    ...state,
    customersList: [...customersList],
    total: customersList.length,
  };
  return state;
};

export const customerReducer = (
  state = initialState,
  action: customerActions.CustomerActions
) => {
  switch (action.type) {
    case customerActionTypes.SET_CUSTOMERS:
      return setCustomersData(action, state);
    case customerActionTypes.REMOVE_ADMIN_FROM_CUSTOMERS_LIST:
      return removeAdminFromCustomersList(action, state);
    case customerActionTypes.REMOVE_CUSTOMER_FROM_CUSTOMES_LIST:
      return removeCustomerFromCustomersList(action, state);
    default:
      return state;
  }
};
