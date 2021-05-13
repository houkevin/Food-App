import { useState, Fragment } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

// app component which creates a useState hook to determine
// whether the checkout cart should be shown.  It uses two
// functions, showCartHandler and hideCartHandler to set the state.

// within the return it uses the CartProvider wrapper which includes
// the cart-context that determines what is current within the cart.
// Next is the visibility of the checkout cart.  If it is currently being
// shown, call the Cart component and pass it the hideCartHandler prop through
// onClose.  If not being shown then use the Header component and pass it
// showCartHandler using onShowCart.  The last component would be the meals component.
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  function showCartHandler() {
    setCartIsShown(true);
  }
  function hideCartHandler() {
    setCartIsShown(false);
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}


export default App;