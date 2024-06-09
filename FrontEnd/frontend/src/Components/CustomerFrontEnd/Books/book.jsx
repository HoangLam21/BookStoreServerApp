import React, { useEffect, useState } from "react";
import axios from "axios";

// export const bookList = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("get products data from api")
//     axios.get("https://bookstorebackend-production-7f54.up.railway.app/BookStore/book/all")
//       .then(response => {
//         setBooks(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <div className="flex flex-wrap">
//       {books.map((book, index) => (
//         <BookCard key={index} book={book} />
//       ))}
//     </div>
//   );
// };

const BookCard = ({ book }) => {
  const { title, author, price, percent, imgSrc } = book;
  const discountedPrice = (price - (price * percent / 100)).toFixed(3);

  const addToCart = () => {
    // Add to cart functionality here
    console.log("Added to cart:", book);
  };

  return (
    <div className="row h-auto w-64 ml-10 mb-20">
      <h4 className="text-color-main active font-garamond text-2xl font-semibold mr-6">{percent}%</h4>
      <img className="h-80 w-60 cursor-pointer" src={imgSrc} alt={title} onClick={() => window.location.href='detailBook.html'} />
      <div className="book-text">
        <span className="text-color-main active font-garamond text-2xl font-semibold mr-6">{title}</span>
        <h6 className="text-color-main active font-garamond text-1xl font-light mr-6">{author}</h6>
        <div className="flex justify-end">
          <h5 className="text-color-main text-right active font-garamond text-2xl font-light line-through mr-6">{price}</h5>
          <h5 className="text-color-main text-right active font-garamond text-2xl font-light mr-6">{discountedPrice}</h5>
        </div>
        <button className="bg-color-main-2 hover:bg-color-main w-60 h-9 border border-gray-400 rounded-md text-white active font-garamond text-1xl font-light mr-6" onClick={addToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};