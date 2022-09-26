import React, { ReactNode, useReducer } from "react";
import CartContext from "./cartContext";

type Props = {
  children?: ReactNode;
};

type Item = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

type Cart = {
  items: Item[];
  totalAmount: number;
};

type AddReducerAction = {
  type: "ADD";
  payload: Item;
};

type RemoveReducerAction = {
  type: "REMOVE";
  payload: string;
};

const defaultCartState: Cart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (
  state: Cart,
  action: AddReducerAction | RemoveReducerAction
) => {
  switch (action.type) {
    case "ADD":
      return {
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount - action.payload.price,
      };
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id === action.payload),
      };
    default:
      return state;
  }
};

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item: Item) => {
    dispatch({ type: "ADD", payload: item });
  };
  const removeItemFromCartHandler = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
