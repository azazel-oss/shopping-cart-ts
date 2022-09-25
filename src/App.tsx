import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const showCartHandler = () => {
    setIsCartOpen(true);
  };

  const hideCartHandler = () => {
    setIsCartOpen(false);
  };

  return (
    <React.Fragment>
      {isCartOpen && <Cart onHideCart={hideCartHandler} />}
      <Header onCartButtonClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
