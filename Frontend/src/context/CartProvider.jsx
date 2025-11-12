import React, { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthProvider";
// import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // // Fetch cart data from backend on component mount or authUser change
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     if (authUser && authUser._id) {
  //       try {
  //         const token = JSON.parse(localStorage.getItem("Users")).token;
  //         const response = await axios.get(`http://localhost:4001/cart/${authUser._id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setCart(response.data.items.map(item => ({...item.bookId, _id: item.bookId._id, quantity: item.quantity})));
  //       } catch (error) {
  //         console.error("Error fetching cart:", error);
  //         setCart([]); // Clear cart on error
  //       }
  //     } else {
  //       setCart([]); // Clear cart if no user is logged in
  //     }
  //   };
  //   fetchCart();
  // }, [authUser]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
