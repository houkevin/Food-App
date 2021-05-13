import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

// headercartbutton component which contains
// the useState of checking if thebutton has been highlighted
// and the cartCtx which will be used to display how many items
// are in the cart.

// the numberOfCartItems is determined by the reduce function
// by only including the current number and the previously stored item amount

// useEffect hook is used to determine if the button has been hovered
// over by having a set timeout of 300 milliseconds.  If after 300 millisecond
// the mouse is not on it anymore then set the highlight to false.

// inside the return will be the carticon which is clickable
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector((state) => state.items);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
