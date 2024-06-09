import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { Link } from 'react-router-dom';
import OverlayEditBook from "./overlayBook";
import AddBook from "./AddBook";
import AddNewBook from "./AddNewBook";
import PaginationButtons from "./PaginationButtons"; 


const BOOKALL_URL = 'http://167.172.69.8:8010/BookStore/book/all';


export default function BookList() {
  const [bookListData, setBookListData] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [showAddStock, setshowAddStock] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false); 
  const [showAll, setShowAll] = useState(false);
  const [images, setImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 8;
  const totalPagesCalc = Math.ceil(bookListData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const bookOnPage = bookListData.slice(startIndex, endIndex);
  console.log(bookListData)
  console.log(startIndex)
  console.log(endIndex)


  const openDialog = () => {
    setshowAddStock(true);
    setOverlayVisible(true); // Hiển thị overlay khi mở dialog
  };

  const closeDialog = () => {
      setshowAddStock(false);
      setOverlayVisible(false); // Ẩn overlay khi đóng dialog
  };
  useEffect(() => {

      const fetchUserData = async () => {
          const token = localStorage.getItem('token');

          if (!token) {
              console.error('No token found, please log in.');
              return;
          }

          try {
              const response = await axios.get(BOOKALL_URL, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              const result = response.data.result;
              setBookListData(result);
              console.log(result);
              console.log(response)
          } catch (error) {
              console.error('Error fetching user data:', error);
              if (error.response?.bookListData) {
                  console.error("Error response:", error.response.bookListData);
              }
          }
      };

      fetchUserData();
  }, []);

  const handleSearchBook = (event) => {
      const value = event.target.value;
      setSearchBook(value);
  };

  const maxItemsPerPage = 8;
 
  return (
    <div className='w-full h-full'>
    {showAddStock && (
      <AddBook trigger={setshowAddStock} setTrigger={setshowAddStock}>
          <OverlayEditBook isOpen={overlayVisible} onClose={closeDialog}>
              <AddNewBook />
          </OverlayEditBook>
      </AddBook>
    )}
    <div className="list-chat-search relative flex w-full border-b h-16  gap-10 items-center -top-0 border-border--lightcolor">
      <div className='w-2/5 relative flex items-center'>
        <input 
          type="text" 
          value={searchBook} 
          placeholder="Tìm kiếm sách" 
          className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" 
          onChange={handleSearchBook} 
        />
        <span className='text-xl absolute right-3 text-primary--color '><IoSearchOutline/></span>
      </div>
      <button
        onClick={openDialog}
        className="btn_addworkshift bg-primary--color text-white--color rounded-full mb-2 mr-8 cursor-pointer hover:opacity-70 border 
                    h-10 w-28 text-xs 
                    sm:w-26 sm:text-sm
                    md:w-26 md:text-sm
                    lg:w-32 lg:text-sm"
        >
          Thêm sách
      </button>
      </div>
      {/*  list */}
        {/* <BookCard data={bookListData.slice(startIndex, endIndex)} currentPage={currentPage} />
        <div className='font-medium text-lg text-primary--color border-b w-full'></div>
        <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div> */}

        <div className='mb-10'>
          <div className='p-4 h-4/5 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center'>   
            {bookOnPage.map((book) => (
              <div className="group" key={book.id}>
                <div className='relative justify-center items-center flex-col gap-4 bg-background--lightcolor rounded-lg py-10'>
                  {images.find((image) => image.bookId === book.id) ? (
                    <img
                      src={images.find((image) => image.bookId === book.id).url}
                      alt={book.title}
                      className='[h-180px] w-[260px] object-cover rounded-md'
                    />
                  ) : (
                    <img
                      src={'data:image/jpeg;base64,' + book.galleryManage[0].thumbnail}
                      alt={book.title}
                      className='[h-180px] w-[260px] object-cover rounded-md'
                    />
                  )}
                  {/* hover button */}
                  <div className=' hidden group-hover:flex absolute h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
                  <Link to={`/book/${book.id}`}>
                      <button
                          className=' bg-primary--color py-2 px-4 rounded text-white--color'
                      >
                          Xem chi tiết
                      </button>
                  </Link>
                  </div>
                </div>
                <div className='leading-7'>
                  <h2 className=' font-medium text-pretty text-center mt-2'>{book.title}</h2>
                  <h2 className='font-bold text-right mr-8'>${book.price}đ</h2>
                </div>  
              </div>
            ))}
          </div>
            <div className='font-medium text-lg text-primary--color border-b w-full'></div>
            <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
          </div>
  </div>
  );
}


