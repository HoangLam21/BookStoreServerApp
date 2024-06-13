import React, { useState, useEffect,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useBook2 } from '../../context/BookContext';
import { useCart } from "../../context/Context"; // Import CartContext
import DetailInfoBook from "./detailInfoBook";
import axios from "axios";
import { Link } from "react-router-dom";
import Feedback from "./feedback";

import './detailBook.css'
import ChattingContent from "../Contact/chat";
import Consultation from "./consultation";


export default function DetailBook() {
  const [isDetailBookOpen, setIsDetailBookOpen] = useState(false);
  const [isFeedbackBookOpen, setIsFeedbackBookOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const { cartItems, addToCart } = useCart();
  const { selectedBook, setSelectedBook } = useBook2();

  const ratings = selectedBook.feedback.map(feedback => feedback.rating);
const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

  const toggleDetailBookOpen = () => {
    setIsDetailBookOpen(!isDetailBookOpen);
  };

  const toggleFeedbackBookOpen = () => {
    setIsFeedbackBookOpen(!isFeedbackBookOpen);
  };

  const toggleOverlay = () => {
    setIsOverlay(!isOverlay);
  };
  const toggleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  useEffect(() => {
    if (isDetailBookOpen || isFeedbackBookOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isDetailBookOpen, isFeedbackBookOpen]);

  



  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/book/all");
        setAllBooks(response.data.result);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (selectedBook && allBooks.length > 0) {
      const filteredBooks = allBooks.filter(book =>
        book.authors.some(author => selectedBook.authors.some(sa => sa.author_name === author.author_name)) ||
        book.category === selectedBook.category
      );
      setRelatedBooks(filteredBooks);
    }
  }, [selectedBook, allBooks]);

  if (!selectedBook) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className=" flex items-center justify-center min-h-screen bg-color-background-main">
    <div className="main flex justify-center bg-color-background-main">
      <div className=" flex w-1/3" style={{ marginLeft: '10%' }}>
        <div>
        {selectedBook.galleryManage && selectedBook.galleryManage[0] && selectedBook.galleryManage[0].thumbnail ? (
        <img
          className=" w-24"
          src={`data:image/jpeg;base64,${selectedBook.galleryManage[0].thumbnail}`}
          alt={selectedBook.title}
        />
      ) : (
        <div className=" w-24">
          No Image
        </div>
      )}
      {selectedBook.galleryManage && selectedBook.galleryManage[0] && selectedBook.galleryManage[0].thumbnail ? (
        <img
          className=" w-24 mt-3"
          src={`data:image/jpeg;base64,${selectedBook.galleryManage[0].thumbnail}`}
          alt={selectedBook.title}
        />
      ) : (
        <div className=" w-24 mt-3">
          No Image
        </div>
      )}
          
        </div>
        <div>
        {selectedBook.galleryManage && selectedBook.galleryManage[0] && selectedBook.galleryManage[0].thumbnail ? (
        <img
          className="h-auto w-64 ml-10"
          src={`data:image/jpeg;base64,${selectedBook.galleryManage[0].thumbnail}`}
          alt={selectedBook.title}
        />
      ) : (
        <div className="h-auto w-64 ml-10">
          No Image
        </div>
      )}
        </div>
        </div>
        <div className="content ">
          <span className="text-color-main text-4xl font-garamond font-semibold"><i>{selectedBook.title}</i></span>
          <h6 className="text-color-main-2 text-xl font-garamond font-light">by {selectedBook.authors.map(author => author.author_name).join(", ")}</h6>
          
          <div className="flex justify-start">
  {selectedBook.discount > 0 && (
    <h5 className="text-color-main text-right active font-garamond text-xl font-light line-through line-through-red mr-6">
      {(selectedBook.price).toLocaleString('vi-VN')} vnđ
    </h5>
    
  )}
  {selectedBook.discount > 0 && (
  <h5 className="text-color-main text-right active font-garamond text-xl font-light mr-6">
    {(selectedBook.total_pay).toLocaleString('vi-VN')} vnđ
  </h5>
  )}
  {selectedBook.discount === 0 && (
  <h5 className="text-color-main text-right active font-garamond text-xl font-light mr-6">
  {(selectedBook.price).toLocaleString('vi-VN')} vnđ
  </h5>
)}
</div>          
<div className="feedback flex w-5/6 mt-5 justify-around">
            <div className="flex">
              <h6 className="text-color-main-2 text-xl font-garamond font-light">Lượt mua:</h6>
              <h6 className="text-color-main-2 text-xl font-garamond font-light ml-3">{selectedBook.readingsession} lượt mua  | </h6>
              <FontAwesomeIcon className="text-color-main mt-1 ml-5 text-xl" icon={faStar} />
              <h6 className="text-color-main-2 text-xl font-garamond font-light ml-3">{averageRating.toFixed(1)}/5 ({ratings.length} lượt đánh giá)</h6>
            </div>
            <div className="flex">
              <h3 className="text-color-main mr-2 text-xl font-garamond font-semibold">Xem đánh giá</h3>
              <FontAwesomeIcon className="text-color-main mt-1 text-xl" icon={faArrowRight} onClick={() => { toggleFeedbackBookOpen(); toggleOverlay(); }}/>
            </div>
          </div>
          <h2 className="w-5/6 text-color-main text-xl font-garamond font-light mt-10">Trích dẫn: {selectedBook.description}</h2>
          <div className="flex mt-10">
            <h3 className="text-color-main text-xl mr-2 font-garamond font-semibold">Xem chi tiết thông tin sản phẩm</h3>
            <FontAwesomeIcon className="text-color-main mt-1 text-xl" icon={faArrowRight} onClick={() => { toggleDetailBookOpen(); toggleOverlay(); }} />
          </div>
          <div className="w-5/6 flex">
          <div className="w-2/4">
          <button onClick={() => addToCart(selectedBook)} className="bg-background-button mt-5 w-full hover:bg-color-main hover:text-white  h-9 border-color-main-2 text-color-main active font-garamond text-1xl font-light">Thêm vào giỏ hàng</button>

          </div>
          <div className="w-2/4 mt-5">
          <Link
                    to="/orderBuyNow"
                    onClick={() => setSelectedBook(selectedBook)}
                  >
            <button className="bg-color-main hover:bg-background-button w-full h-9 border hover:text-color-main text-white active font-garamond text-1xl font-light">Mua ngay</button>

                  </Link>
          </div>
           

          </div>
          <div className="w-5/6">
          <button 
        
        className="bg-white mt-5 w-full hover:bg-color-main hover:text-white h-9 border text-color-main active font-garamond border-color-main text-1xl font-semibold"
        onClick={() => { toggleChatOpen() }}
        >
        Nhận tư vấn
        </button>
          </div>
        </div>
      </div>
      {isChatOpen &&(
          <div className="container fixed top-24 w-96 right-0 bottom-0 border border-white--color bg-white shadow-md rounded-lg">
            <div className="mx-auto pt-5 pl-10 pr-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-color-main text-3xl font-garamond font-light"><i>Tin nhắn </i></h1>
                </div>
                <FontAwesomeIcon
                style={{ color: "#a89b8f", fontSize: "1.1rem" }}
                icon={faXmark}
                onClick={() => toggleChatOpen()} 
                className="hover:text-color-main hover:scale-110 cursor-pointer"
                />

              </div>
              <Consultation/>

            </div>
          </div>
        
        )
      }
      {isDetailBookOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={() => setIsDetailBookOpen(false)} />
          <div className="container fixed top-24 right-0 bottom-0 bg-white shadow-md">
            <div className="mx-auto pt-5 pl-10 pr-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-color-main text-3xl font-garamond font-light"><i>Thông tin sách</i></h1>
                </div>
                <FontAwesomeIcon
                  style={{ color: "#a89b8f", fontSize: "1.1rem" }}
                  icon={faXmark}
                  onClick={() => { toggleDetailBookOpen(); toggleOverlay(); }}
                  className="hover:text-color-main hover:scale-110 cursor-pointer"
                />
              </div>
              <DetailInfoBook />
            </div>
          </div>
        </>
      )}

      {isFeedbackBookOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={() => setIsFeedbackBookOpen(false)} />
          <div className="container fixed top-24 right-0 bottom-0 bg-white shadow-md">
            <div className="mx-auto pt-5 pl-10 pr-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-color-main text-3xl font-garamond font-light"><i>Thông tin sách</i></h1>
                </div>
                <FontAwesomeIcon
                  style={{ color: "#a89b8f", fontSize: "1.1rem" }}
                  icon={faXmark}
                  onClick={() => { toggleFeedbackBookOpen(); toggleOverlay(); }}
                  className="hover:text-color-main hover:scale-110 cursor-pointer"
                />
              </div>
              <Feedback />
            </div>
          </div>
        </>
      )}

      
    </div>
    <div className="w-full mt-10 px-10">
        <h2 className="text-color-main text-2xl font-garamond font-semibold mb-5">_Có thể bạn sẽ thích</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedBooks.map(book => (
           
            <div key={book.id} className="flex flex-col items-center bg-white p-5 shadow-md rounded-lg">
            <Link
                    to="/detailBook"
                    onClick={() => setSelectedBook(book)}
                  >
                    {book.galleryManage && book.galleryManage[0] && book.galleryManage[0].thumbnail ? (
        <img
          className="img-book h-80 w-60"
          src={`data:image/jpeg;base64,${book.galleryManage[0].thumbnail}`}
          alt={book.title}
        />
      ) : (
        <div className="img-book-placeholder h-80 w-60 bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}
                  </Link>
              <h3 className="text-color-main text-xl font-garamond font-semibold">{book.title}</h3>
              <h4 className="text-color-main-2 text-lg font-garamond font-light">by {book.authors.map(author => author.author_name).join(", ")}</h4>
              <p className="text-color-main text-lg font-garamond font-light">{book.price} vnđ</p>
              <button onClick={() => addToCart(book)} className="bg-background-button mt-3 hover:bg-color-main hover:text-white w-full h-9 border-color-main-2 text-color-main active font-garamond text-lg font-light">Thêm vào giỏ hàng</button>
            </div>
           
          ))}
        </div>
      </div>
    </div>
  );
}
