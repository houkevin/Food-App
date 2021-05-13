import { useReducer } from "react";

import CartContext from "./cart-context";

// defaultCartState has both items as empty and total
// amount as 0
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// cartReducer reducer function will check for
// type ADD where it will update the total amount stored
// in the state.  Then it will find the item object within
// the cart using findIndex to find the index of the item
// and if it already exists then update the original by copying
// it over to a new variable.  Create a new updateItems array
// by copying over the original and set the item in to the update
// item.  If it didn't exist then just concat the item and return
// the items and new totalAmount

// if the action type is REMOVE then find the item using findIndex
// and reduce the total amount by the price of the item.  If there is
// only 1 of the item left then remove the item from the updatedItem list
// by using filter to filter out the item with the matching id. If it isn't
// the last one then just reduce the amount by 1.

// if action is RESET then return the defaultCartState or if it matches
// none of the actions above.
function cartReducer(state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.item.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
}

// cartprovider component uses the useReducer hook and creates
// a cartState using the cartReducer function.  It contains addItemToCartHandler
// which uses dispatchCartAction and passes a type ADD passing the item, removeItemFromCartHandler
// which uses type REMOVE and passes the id, and clearCartHandler which just uses
// type CLEAR.  It sets the cartContext with the respective values.
// within the return it uses CartContext.Provider to pass the context values
// to its props.children.
function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  function addItemToCartHandler(item) {
    dispatchCartAction({ type: "ADD", item: item });
  }
  function removeItemFromCartHandler(id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  }
  function clearCartHandler() {
    dispatchCartAction({ type: "CLEAR" });
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
