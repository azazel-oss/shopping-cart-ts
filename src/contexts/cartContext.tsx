import React from "react";

export type Item = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

export type CartContextType = {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = React.createContext<CartContextType | null>(null);

export default CartContext;
