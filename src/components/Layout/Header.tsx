import React from "react";
import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

type Props = {
  onCartButtonClick: React.MouseEventHandler;
};

const Header = ({ onCartButtonClick }: Props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={onCartButtonClick} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="table full of food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
