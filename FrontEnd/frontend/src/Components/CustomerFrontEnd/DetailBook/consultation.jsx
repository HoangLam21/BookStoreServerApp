import React, { useState, useEffect,useContext } from 'react';
import { useBook2 } from '../../context/BookContext';
import { AuthContext } from '../../context/AuthContext';
import ChatBook from './chatBook';



const Consultation = () => {
  const { selectedBook } = useBook2();

  const autoMessage = `tôi cần tư vấn cho quyển sách có tên là ${selectedBook.title}`;



  return (
    <div className="p-5">
      <h1 className="text-color-main font-garamond text-xl font-semibold">Tư vấn mua sách</h1>
        <ChatBook autoMessage={autoMessage} />
      
    </div>
  );
};

export default Consultation;
