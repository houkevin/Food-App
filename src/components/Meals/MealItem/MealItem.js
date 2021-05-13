import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/index";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
// meal item component will take in the context
// which contains the current state of the cart
// a function addToCartHandler which will add a new
// item to the cartCtx.

// the return will contain the name of the item,
// the description, and then the price of the item
// the last one will be the cart for the meal item.
const MealItem = (props) => {
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.add({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
