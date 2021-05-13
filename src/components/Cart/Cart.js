import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cartActions} from '../../store/index';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';


// the cart component contains 3 useState hooks which
// are used to check if they are checkingout, if they are
// submitting, and if they already submitted.  it also
// uses the cartcontext to check the current state of the cart

// cartitemremovehandler will remove the item, cartItemAddHandler
// will add to the cart, orderHandler which will set the checkout to true
// and submitOrderHandler which will make a post request to firebase
// to store the ordered item and set submitting to false and didsubmit
// to true, then clear the cart.

// the return will contain the values for the check of if it is currently
// submitting and display the css depending.
const Cart = (props) => {
  const dispatch = useDispatch();
  const initialTotalAmount = useSelector((state) => state.totalAmount);
  const items = useSelector((state) => state.items);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${initialTotalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (item) => {
    dispatch(cartActions.remove(item));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.add(item));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://reacthttp-6e610-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clear());
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
