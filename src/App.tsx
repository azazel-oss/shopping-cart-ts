import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./contexts/CartProvider";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const showCartHandler = () => {
    setIsCartOpen(true);
  };

  const hideCartHandler = () => {
    setIsCartOpen(false);
  };

  return (
    <CartProvider>
      {isCartOpen && <Cart onHideCart={hideCartHandler} />}
      <Header onCartButtonClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
