import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/Context"; // Import CartContext
import { useBook2 } from '../../context/BookContext';
import { useCategory } from '../../context/CategoryContext'
import './Books.css';

export default function BookWithCategory() {
  const { cartItems, addToCart } = useCart();
  const { selectedBook, setSelectedBook } = useBook2();
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [sortBy, setSortBy] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/book/all");
        setBooks(response.data.result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter books based on selected category
  const filteredBooks = selectedCategory ? books.filter(book => book.category === selectedCategory.name) : books;

  if (loading) {
    return <div className="loadermain">
    <div className="loader">
    <div className="letter">B</div>
    <div className="letter">O</div>
    <div className="letter">O</div>
    <div className="letter">K</div>
    <div className="letter">S</div>
    <div className="letter">T</div>
    <div className="letter">O</div>
    <div className="letter">R</div>
    <div className="letter">E</div>
  </div>
    </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  let sortedBooks = [...filteredBooks];
if (sortBy === "newest") {
  sortedBooks.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
} else if (sortBy === "bestseller") {
} else if (sortBy === "priceLowToHigh") {
  sortedBooks.sort((a, b) => a.total_pay - b.total_pay);
} else if (sortBy === "priceHighToLow") {
  sortedBooks.sort((a, b) => b.total_pay - a.total_pay);
}


  return (
    <div className="bg-color-background-main pt-10">
      <div>
        <div>
          <div className="flex ml-20">
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-3" to="/">
                <span className="hover:underline hover:tracking-wider">Home</span>
              </Link>
            </div>
            <span className="text-color-main-2 text-xl mr-3"> / </span>
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/books">
                <span className="hover:underline hover:tracking-wider">Sách thuộc thể loại {selectedCategory.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="ml-20">
          </div>
          <div className="flex ">
            <span className="text-color-main-2 text-xl font-garamond font-semibold mr-3">Sort by</span>
            <select className="block appearance-none w-auto bg-white mr-20 border text-color-main text-l font-garamond font-semibold border-gray-300 hover:border-color-main px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleSortChange}
            value={sortBy}>
                          <option value="" className="text-color-main-2 text-l font-garamond font-light ">Sắp xếp theo</option>

              <option value="newest" className="text-color-main-2 text-l font-garamond font-light ">Mới nhất</option>
              <option value="bestseller" className="text-color-main-2 text-l font-garamond font-light ">Bán chạy nhất</option>
              <option value="priceLowToHigh" className="text-color-main-2 text-l font-garamond font-light ">Giá tăng dần</option>
              <option value="priceHighToLow" className="text-color-main-2 text-l font-garamond font-light">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </div>
      <div className="filter-books flex">
        <div className="bookss mt-10 w-full ">
          <div className="main-books">
            <div className="books flex flex-wrap">
              {sortedBooks.length > 0 ? (
                sortedBooks.map((book, index) => (
                  <div key={index} className="box-book row h-auto w-64 ml-10 mb-20">
                    <Link
                      to="/detailBook"
                      onClick={() => setSelectedBook(book)}
                    >
                      <img
                        className="img-book h-80 w-60"
                        src={`data:image/jpeg;base64,${book.galleryManage[0].thumbnail}`}
                        alt=""
                      />
                    </Link>
                    <div className="book-text">
                      <div className="h-14">
                        <span className="text-color-main active font-garamond text-xl font-semibold mr-6"><i>{book.title}</i></span>
                      </div>
                      <h6 className="text-color-main-2 active font-garamond text-l font-semibold mr-6">- {book.authors.map(author => author.author_name).join(", ")}</h6>
                      <div className="flex justify-end">
                        {book.discount > 0 && (
                          <h5 className="text-color-main text-right active font-garamond text-xl font-light line-through line-through-red mr-6">
                            {(book.price).toLocaleString('vi-VN')} vnđ
                          </h5>
                        )}
                        {book.discount > 0 && (
                          <h5 className="text-color-main text-right active font-garamond text-xl font-light mr-6">
                            {(book.total_pay).toLocaleString('vi-VN')} vnđ
                          </h5>
                        )}
                        {book.discount === 0 && (
                          <h5 className="text-color-main text-right active font-garamond text-xl font-light mr-6">
                            {(book.price).toLocaleString('vi-VN')} vnđ
                          </h5>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(book)}
                        className="bg-color-main-2 hover:bg-color-main w-11/12 h-9 border border-gray-400 rounded-md text-white active font-garamond text-1xl font-light mr-6"
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no text-color-main text-3xl font-garamond font-semibold ">No books available in the selected category.</div>
              )}
            </div>
          </div>
          <div className="flex justify-center mb-10">
            {/* Pagination controls */}
          </div>
        </div>
      </div>
    </div>
  );
}
