import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

const Cart = () => {
  const { cartItems, addToCart, handleChange } = useCart();
  const cartTotal = () => {
    return cartItems.reduce((total, item) => total + item.total_pay * item.quantity, 0).toLocaleString('vi-VN');
  };

  

  return (
    <div container>
      <div className=" overflow-y-auto max-h-screen  p-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex mt-5 items-center">
            <div className="flex gap-4">
              <img src={`data:image/jpeg;base64,${item.galleryManage[0].thumbnail}`} alt="" className="imgBook h-52 w-32" />
              <div className="pl-5">
                <span className="text-color-main text-2xl font-garamond font-semibold"><i>{item.title}</i></span>
                <h4 className="text-color-main text-xl font-garamond font-light">{item.authors.map(author => author.author_name).join(", ")}</h4>
                <h5 className="text-color-main mt-3 text-2xl font-garamond font-light">{(item.total_pay).toLocaleString('vi-VN')} vnđ</h5>
                <div className="flex">
                  <div className="flex mt-5">
                    <h3 className="soluong text-color-main  text-xl font-garamond font-light">Số lượng</h3>
                    <div className='flex ml-9'>
                    <button
                        className="px-4 py-2 w-14 text-color-main-2 text-xs font-bold uppercase "
                        onClick={() => handleChange(item, -1)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    <p className="text-color-main ml-5 mr-5 text-xl font-garamond font-light">{item.quantity}</p>
                      <button
                        className="px-4 py-2 w-14 text-color-main-2 text-xs font-bold uppercase "
                        onClick={() => addToCart(item)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                     
                      
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <h1 className="text-color-main text-2xl font-garamond font-light">Giỏ hàng của bạn trống, hãy thêm sách vào giỏ hàng</h1>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-end mt-2 mr-5 mb-32">
            <h3 className="text-color-main text-2xl font-garamond font-light">
              Tổng: {cartTotal()} VND
            </h3>
          </div>
        )}
        <div className="">
      <Link to="/orderCus" >
  <button className='w-96 h-10 fixed bottom-0 right-14 bg-color-main-2 text-white hover:bg-primary--color hover:text-white--color text-xs font-garamond font-bold uppercase rounded focus:outline-none'>Thanh toán</button>
</Link>
        
      </div>
      </div>
      
    </div>
  );
};

export default Cart;
