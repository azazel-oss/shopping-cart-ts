import React from "react";

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type CartContextType = {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
};

const CartContext = React.createContext<CartContextType | null>({
  items: [],
  totalAmount: 0,
  addItem: (item: Item) => {},
  removeItem: (id: string) => {},
});

export default CartContext;
