import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

type Props = {
  onClick: React.MouseEventHandler;
};

const HeaderCartButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
