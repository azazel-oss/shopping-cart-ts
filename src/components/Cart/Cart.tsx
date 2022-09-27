import { useContext, useState } from "react";
import CartContext, { CartContextType } from "../../contexts/cartContext";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

type Props = {
  onHideCart: React.MouseEventHandler;
};

const Cart = ({ onHideCart }: Props) => {
  const [isOrdering, setIsOrdering] = useState(false);
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
  return (
    <Modal onBackdropClick={onHideCart}>
      {!isOrdering && cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartAmount}</span>
      </div>
      {isOrdering && <Checkout onCancel={onHideCart} />}
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
    </Modal>
  );
};

export default Cart;
