import React from "react";
import { Item } from "../../contexts/cartContext";
import styles from "./CartItem.module.css";

type Props = {
  id: string;
  price: number;
  name: string;
  amount: number;
  onRemove: (id: string) => void;
  onAdd: (item: Item) => void;
};

const CartItem: React.FC<Props> = ({
  id,
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
        <button onClick={() => onRemove(id)}>-</button>
        <button onClick={() => onAdd({ id, name, amount: 1, price })}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
