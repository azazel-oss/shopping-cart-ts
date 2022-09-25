import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
type Props = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const MealItem = ({ id, name, description, price }: Props) => {
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  );
};

export default MealItem;
