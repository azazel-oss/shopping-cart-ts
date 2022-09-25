import React, { ReactNode } from "react";
import CartContext from "./cartContext";

type Props = {
  children?: ReactNode;
};

const CartProvider: React.FC<Props> = ({ children }) => {
  const addItemToCartHandler = (item) => {};
  const removeItemFromCartHandler = (id) => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
