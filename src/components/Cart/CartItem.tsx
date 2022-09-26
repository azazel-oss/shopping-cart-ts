import React from "react";
import { Item } from "../../contexts/cartContext";
import styles from "./CartItem.module.css";

type Props = {
  price: number;
  name: string;
  amount: number;
  onRemove: (id: string) => void;
  onAdd: (item: Item) => void;
};

const CartItem: React.FC<Props> = ({
  price,
  name,
  amount,
  onRemove,
  onAdd,
}) => {
  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{`₹${price.toFixed(2)}`}</span>
          <span className={styles.amount}>x {amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
