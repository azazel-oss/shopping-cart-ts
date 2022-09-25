import React, { ReactNode } from "react";
import CartContext from "./cartContext";

type Props = {
  children?: ReactNode;
};

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const CartProvider: React.FC<Props> = ({ children }) => {
  const addItemToCartHandler = (item: Item) => {};
  const removeItemFromCartHandler = (id: string) => {};
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
