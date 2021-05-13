import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    add(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        state.items[existingCartItemIndex].amount += action.payload.amount;
      } else {
        state.items = state.items.concat(action.payload);
      }
    },
    remove(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      state.totalAmount -= action.payload.price;
      if (existingCartItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items[existingCartItemIndex].amount -= 1;
      }
    },
    clear(state) {
        state = initialCartState;
    }
  },
});
const store = configureStore({reducer: cartSlice.reducer});
export const cartActions = cartSlice.actions;
export default store;
