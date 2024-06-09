import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const setSelectedOrderData = (orderData) => {
    setSelectedOrder(orderData);
  };

  return (
    <OrderContext.Provider value={{ selectedOrder, setSelectedOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
