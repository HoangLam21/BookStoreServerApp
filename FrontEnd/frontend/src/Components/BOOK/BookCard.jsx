// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BOOKALL_URL = 'http://167.172.69.8:8010/BookStore/book/all';

// const BookCard = ({ data, currentPage }) => {
//   const [showAll, setShowAll] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [selectedBookIndex, setSelectedBookIndex] = useState(null);
//   const [images, setImages] = useState([]);
//   const [token, setToken] = useState(null);
//   const [bookListData, setBookListData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const tokenFromStorage = localStorage.getItem('token');
//     setToken(tokenFromStorage); // Set token from local storage

//     const fetchUserData = async () => {
//         if (!token) {
//             console.error('No token found, please log in.');
//             return;
//         }
//         try {
//             const response = await axios.get(BOOKALL_URL, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const result = response.data.result;
//             setBookListData(result);
//             console.log(result);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             if (error.response?.data) {
//                 console.error("Error response:", error.response.data);
//             }
//         }
//     };

//     fetchUserData();
// }, [token]);

//   const maxItemsPerPage = 8;

//   const startIndex = currentPage * maxItemsPerPage;
//   const endIndex = startIndex + maxItemsPerPage;

//   const handleClick = (book, index) => {
//     setSelectedBook(book);
//     setSelectedBookIndex(index);
//     navigate(`/admin/book/all/${book.id}`);
//   };

//   return (
//     <div className='mb-10'>
//       <div className='p-4 h-4/5 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center'>
//         {data.slice(0, showAll ? data.length : maxItemsPerPage).map((book, index) => (
//           <div className="group" key={book.id}>
//             <div className='relative justify-center items-center flex-col gap-4 bg-background--lightcolor rounded-lg py-10'>
//               {images.find((image) => image.bookId === book.id) ? (
//                 <img
//                   src={images.find((image) => image.bookId === book.id).url}
//                   alt={book.title}
//                   className='[h-180px] w-[260px] object-cover rounded-md'
//                 />
//               ) : (
//                 <img
//                   src={'data:image/jpeg;base64,' + book.galleryManage[0].thumbnail}
//                   alt={book.title}
//                   className='[h-180px] w-[260px] object-cover rounded-md'
//                 />
//               )}
//               {/* hover button */}
//               <div className=' hidden group-hover:flex absolute h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
//                 <button
//                   onClick={() => handleClick(book, index)}
//                   className=' bg-primary--color py-2 px-4 rounded text-white--color'
//                 >
//                   Xem chi tiết
//                 </button>
//               </div>
//             </div>
//             <div className='leading-7'>
//               <h2 className=' font-medium text-pretty text-center mt-2'>{book.title}</h2>
//               <h2 className='font-bold text-right mr-8'>${book.price}đ</h2>
//             </div>
// </div>
//         ))}
//       </div>
//       <div className="book-detail">
//         <div className="overlay" onClick={() => setSelectedBook(null)} />
//         <div className="detail-container">
//           {selectedBook && (
//             <div>
//               {images.find((image) => image.bookId === selectedBook.id)? (
//                 <img src={images.find((image) => image.bookId === selectedBook.id).url} alt={selectedBook.title} className='w-full mb-4' />
//               ) : (
//                 <img src={'data:image/jpeg;base64,' + selectedBook.galleryManage[0].thumbnail} alt={selectedBook.title} className='w-full mb-4' />
//               )}
//               <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
//               <p>{selectedBook.description}</p>
//               <p>Giá: {selectedBook.price}đ</p>
//               <button
//                 onClick={() => setSelectedBook(null)}
//                 className='bg-primary--color py-2 px-4 rounded text-white--color'
//               >
//                 Đóng
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBook2 } from '../../Components/context/BookContext';

const BookCard = ({ book }) => {
  const { title, authors, price, discount, galleryManage } = book;
  const discountedPrice = (price - (price * discount / 100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  const navigate = useNavigate();
  const { setSelectedBook } = useBook2();

  const handleBookDetail = () => {
    setSelectedBook(book);
    navigate('/detailBook');
  };

  return (
    <div className="row h-auto w-64 ml-10 mb-20">
      <h4 className="text-color-main active font-garamond text-2xl font-semibold mr-6">{discount}%</h4>
      <img 
        className="h-80 w-60 cursor-pointer" 
        src={`data:image/jpeg;base64,${galleryManage[0].thumbnail}`} 
        alt={title} 
        onClick={handleBookDetail} 
      />
      <div className="book-text">
        <span className="text-color-main active font-garamond text-2xl font-semibold mr-6">{title}</span>
        <h6 className="text-color-main active font-garamond text-1xl font-light mr-6">{authors.map(author => author.author_name).join(", ")}</h6>
        <div className="flex justify-end">
          <h5 className="text-color-main text-right active font-garamond text-2xl font-light line-through mr-6">
            {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </h5>
          <h5 className="text-color-main text-right active font-garamond text-2xl font-light mr-6">
            {discountedPrice}
          </h5>
        </div>
        <button 
          className="bg-color-main-2 hover:bg-color-main w-60 h-9 border border-gray-400 rounded-md text-white active font-garamond text-1xl font-light mr-6" 
          onClick={handleBookDetail}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default BookCard;
