import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toggleCart } from "../store/Slices/Cartshown";

function ProtectedRoute({ element }) {
  const cart = useSelector((state) => state.cartData.cartItems);
  const cartShow = useSelector((state) => state.cartShow.show);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length === 0) {
      alert("You need to add items to the cart before proceeding.");
      dispatch(toggleCart(false));
    }
  }, [cart.length, dispatch]);

  if (cart.length === 0) {
    return <Navigate to="/home" />;
  }

  return <>{element}</>;
}

export default ProtectedRoute;
