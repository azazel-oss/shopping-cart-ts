import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
type Props = {
  id: string;
  onAddToCart: (amount: number) => void;
};
const MealItemForm = ({ id, onAddToCart }: Props) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current?.value;
    const enteredAmountNumber = enteredAmount ? +enteredAmount : 0;
    if (
      enteredAmount?.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsFormValid(false);
      return;
    }
    onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isFormValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
