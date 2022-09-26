import { useContext } from "react";
import CartContext, { CartContextType, Item } from "../../contexts/cartContext";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

type Props = {
  onClick: React.MouseEventHandler;
};

const HeaderCartButton = ({ onClick }: Props) => {
  const cart = useContext(CartContext) as CartContextType;

  const uniqueCartItemsNumber = cart.items.reduce(
    (acc: Item[], curr) =>
      acc.some((ele) => ele.id === curr.id) ? acc : [...acc, curr],
    []
  );
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{uniqueCartItemsNumber.length}</span>
    </button>
  );
};

export default HeaderCartButton;
