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

type ClearCartAction = {
  type: "CLEAR";
  payload: null;
};

const defaultCartState: Cart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (
  state: Cart,
  action: AddReducerAction | RemoveReducerAction | ClearCartAction
) => {
  let updatedTotalAmount;
  switch (action.type) {
    case "ADD":
      console.log(action.payload);
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];
      updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      if (existingItem) {
        state.items[existingItemIndex].amount += action.payload.amount;
        return {
          items: [...state.items],
          totalAmount: updatedTotalAmount,
        };
      } else {
        return {
          items: [...state.items, action.payload],
          totalAmount:
            state.totalAmount + action.payload.price * action.payload.amount,
        };
      }
    case "REMOVE":
      console.log(action.payload);
      const itemToRemoveIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      console.log(itemToRemoveIndex);
      updatedTotalAmount =
        state.totalAmount - state.items[itemToRemoveIndex].price;
      state.items[itemToRemoveIndex].amount -= 1;
      if (state.items[itemToRemoveIndex].amount < 1) {
        return {
          items: state.items.filter((item) => item.id !== action.payload),
          totalAmount: updatedTotalAmount,
        };
      } else {
        return {
          items: [...state.items],
          totalAmount: updatedTotalAmount,
        };
      }

    case "CLEAR":
      return {
        items: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item: Item) => {
    console.log("Add dispatch called");
    dispatch({ type: "ADD", payload: item });
  };
  const removeItemFromCartHandler = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR", payload: null });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
