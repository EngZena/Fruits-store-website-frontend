import * as ordersActionTypes from './orders.action-types';
import * as ordersActions from './orders.actions';

import { CheckoutListItem } from '../../checkout/store/checkout.reducers';

export interface CurrentLoadedOrdersList {
  currentOrders: any[];
}

export interface OrdersList {
  phoneNumber: string;
  streetName: string;
  notes: string;
  checkoutList: CheckoutListItem[];
  totalPrice: number;
  date: string;
}

export interface ordersState {
  currentLoadedOrdersList: [];
  OrdersList: OrdersList;
  error: string;
}

const initialState: ordersState = {
  OrdersList: null,
  currentLoadedOrdersList: null,
  error: null,
};

const setAllUserOrders = (action, state) => {
  let orderList = [];
  action.payload.forEach(element => {
    let orderItem = {
      phoneNumber: element.phoneNumber,
      streetName: element.streetName,
      notes: element.notes,
      checkoutList: [...element.checkoutList],
      totalPrice: element.totalPrice,
      date: element.date,
    };
    orderList.push(orderItem);
  });
  let firstItems = setFirstUserOrders(orderList);
  state = {
    ...state,
    OrdersList: [...orderList],
    currentLoadedOrdersList: [...firstItems],
  };
  return state;
};

const getAllUserOrders = (action, state) => {
  return state;
};

const setFirstUserOrders = list => {
  let firstItems = [];
  if (list.length > 3) {
    firstItems = list.slice(0, 3);
  } else {
    firstItems = list;
  }
  return firstItems;
};

function getMoreUserOrders(
  action: ordersActions.setMoreUserOrders,
  state: any
) {
  let currentLoadedOrdersListLength = state.currentLoadedOrdersList.length;
  let moreItems = state.OrdersList.slice(
    currentLoadedOrdersListLength,
    currentLoadedOrdersListLength + 3
  );
  state = {
    ...state,
    currentLoadedOrdersList: [...state.currentLoadedOrdersList, ...moreItems],
  };
  return state;
}

export function ordersReducer(
  state = initialState,
  action: ordersActions.ordersActions
) {
  switch (action.type) {
    case ordersActionTypes.SET_ALL_USER_ORDERS:
      return setAllUserOrders(action, state);
    case ordersActionTypes.GET_ALL_USER_ORDERS:
      return getAllUserOrders(action, state);
    case ordersActionTypes.GET_MORE_USER_ORDERS:
      return getMoreUserOrders(action, state);
    default:
      return state;
  }
}
