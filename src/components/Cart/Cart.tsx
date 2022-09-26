import { useContext } from "react";
import CartContext, { CartContextType } from "../../contexts/cartContext";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

type Props = {
  onHideCart: React.MouseEventHandler;
};

const Cart = ({ onHideCart }: Props) => {
  const cart = useContext(CartContext) as CartContextType;
  const cartAmount = "₹" + cart.totalAmount.toFixed(2);
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
  return (
    <Modal onBackdropClick={onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={onHideCart} className={styles["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
