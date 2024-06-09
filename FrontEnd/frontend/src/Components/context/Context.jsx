import React, { createContext, useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Tạo một context cho giỏ hàng
const CartContext = createContext();

// Tạo một custom hook để sử dụng context này
export const useCart = () => {
  return useContext(CartContext);
};

// Tạo một Provider cho context giỏ hàng
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (selectedBook) => {
    const existingCartItem = cartItems.find(item => item.id === selectedBook.id);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === selectedBook.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      toast.success('Thêm vào giỏ hàng thành công!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    } else {
      setCartItems([...cartItems, { ...selectedBook, quantity: 1 }]);
    }
    console.log("cartContext", cartItems)
  };

  // Hàm thay đổi số lượng sản phẩm trong giỏ hàng
  const handleChange = (item, d) => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + d } : cartItem
    ).filter(cartItem => cartItem.quantity > 0);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, handleChange }}>
      {children}
    </CartContext.Provider>
  );
};