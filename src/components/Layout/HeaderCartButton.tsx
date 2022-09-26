import { useContext, useEffect, useState } from "react";
import CartContext, { CartContextType, Item } from "../../contexts/cartContext";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

type Props = {
  onClick: React.MouseEventHandler;
};

const HeaderCartButton = ({ onClick }: Props) => {
  const [isButtonBumped, setIsButtonBumped] = useState(false);
  const cart = useContext(CartContext) as CartContextType;

  const uniqueCartItemsNumber = cart.items.reduce(
    (acc: Item[], curr) =>
      acc.some((ele) => ele.id === curr.id) ? acc : [...acc, curr],
    []
  );

  const buttonClasses = `${styles.button} ${isButtonBumped ? styles.bump : ""}`;

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }
    setIsButtonBumped(true);
    const timer = setTimeout(() => {
      setIsButtonBumped(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cart.items]);
  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{uniqueCartItemsNumber.length}</span>
    </button>
  );
};

export default HeaderCartButton;
