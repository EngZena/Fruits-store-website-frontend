import * as checkoutActionTypes from './checkout.action-types';
import * as checkoutActions from './checkout.actions';

export interface CheckoutListItem {
  name: string;
  price: number;
  image: string;
}

export interface checkoutState {
  checkoutList: CheckoutListItem[];
  total: number;
  error: string;
}

const initialState: checkoutState = {
  checkoutList: [],
  total: 0,
  error: null,
};

const calculateTotal = state => {
  let totalPrice = 0;
  state.checkoutList.map(item => {
    totalPrice = totalPrice + item.price;
  });
  return {
    ...state,
    total: totalPrice,
  };
};

const addToCheckoutList = (action, state) => {
  const fruitData = {
    name: action.payload.name,
    price: action.payload.price,
    image: action.payload.image,
  };
  const totalPrice = calculateTotal(state);
  state = {
    ...state,
    checkoutList: [...state.checkoutList, fruitData],
  };
  return calculateTotal(state);
};

const RemoveFromCheckoutList = (action, state) => {
  const filteredData = state.checkoutList.filter(
    item => item.name !== action.payload.name
  );
  state = {
    ...state,
    checkoutList: [...filteredData],
  };
  return calculateTotal(state);
};

export function checkoutReducer(
  state = initialState,
  action: checkoutActions.CheckoutActions
) {
  switch (action.type) {
    case checkoutActionTypes.ADD_TO_SHOPPING_LIST:
      return addToCheckoutList(action, state);
    case checkoutActionTypes.REMOVE_FROM_SHOPPING_LIST:
      return RemoveFromCheckoutList(action, state);
    case checkoutActionTypes.EMPTY_SHOPPING_LIST:
      return {
        ...state,
        checkoutList: [],
      };
    case checkoutActionTypes.CHECKOUT_FAIL:
      return {
        ...state,
        error: action,
      };
    default:
      return state;
  }
}
