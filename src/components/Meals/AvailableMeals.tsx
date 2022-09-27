import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

type Meal = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const AvailableMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await axios.get(
          "https://react-http-backend-default-rtdb.firebaseio.com/meals.json"
        );
        const loadedData = [];
        console.log(response);
        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
        for (const key in response.data) {
          loadedData.push({
            id: key,
            ...response.data[key],
          });
        }
        setMeals(loadedData);
        setIsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setHttpError(err.message);
          setIsLoading(false);
        }
      }
    }
    fetchMeals();
  }, []);
  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <h1>Loading...</h1>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={styles["meals-error"]}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
