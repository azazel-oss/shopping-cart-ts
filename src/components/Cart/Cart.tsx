import axios from "axios";
import { useContext, useState } from "react";
import CartContext, { CartContextType } from "../../contexts/cartContext";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

type Props = {
  onHideCart: React.MouseEventHandler;
};

type User = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
};

const Cart = ({ onHideCart }: Props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cart = useContext(CartContext) as CartContextType;
  const cartAmount = "₹" + Math.abs(cart.totalAmount).toFixed(2);
  const hasItems = cart.items.length > 0;
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onAdd={cart.addItem}
          onRemove={cart.removeItem}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsOrdering(true);
  };

  const submitOrderHandler = async (userData: User) => {
    setIsSubmitting(true);
    await axios.post(
      "https://react-http-backend-default-rtdb.firebaseio.com/orders.json",
      {
        user: userData,
        orderedItems: cart.items,
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    setIsOrdering(false);
    cart.clearCart();
  };
  return (
    <Modal onBackdropClick={onHideCart}>
      {" "}
      {!isSubmitting && !didSubmit && (
        <>
          {!isOrdering && cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{cartAmount}</span>
          </div>
          {isOrdering && (
            <Checkout
              onOrderSubmit={submitOrderHandler}
              onCancel={onHideCart}
            />
          )}
          {!isOrdering && (
            <div className={styles.actions}>
              <button onClick={onHideCart} className={styles["button--alt"]}>
                Close
              </button>
              {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}
      {isSubmitting && <p>Sending over data...</p>}
      {didSubmit && (
        <>
          <p>Successfully sent the order!</p>
          <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={onHideCart}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
