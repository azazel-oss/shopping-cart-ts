import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

type Props = {
  onHideCart: React.MouseEventHandler;
};

const Cart = ({ onHideCart }: Props) => {
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onBackdropClick={onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.22</span>
      </div>
      <div className={styles.actions}>
        <button onClick={onHideCart} className={styles["button--alt"]}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
