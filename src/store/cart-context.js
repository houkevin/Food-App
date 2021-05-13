import React from 'react';

// context hook which keeps tracks of items, totalAmount,
// addItem, removeItem, and clearCart
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;