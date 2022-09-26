import { useContext } from "react";
import CartContext from "../../../contexts/cartContext";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
type Props = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const MealItem = ({ id, name, description, price }: Props) => {
  const cart = useContext(CartContext);
  const addToCartHandler = (amount: number) => {
    cart?.addItem({
      id,
      name,
      price,
      amount,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>₹{price}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
