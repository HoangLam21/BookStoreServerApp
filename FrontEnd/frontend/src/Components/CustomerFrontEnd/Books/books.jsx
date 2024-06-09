import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/Context"; // Import CartContext
import { useBook2 } from '../../context/BookContext';
import './Books.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Books() {
  const { cartItems, addToCart } = useCart();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    author: '',
    publisher: ''
  });

  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showAuthorFilter, setShowAuthorFilter] = useState(false);
  const [showPublisherFilter, setShowPublisherFilter] = useState(false);

  const { selectedBook, setSelectedBook } = useBook2();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/book/all");
        setBooks(response.data.result);
        setFilteredBooks(response.data.result); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/category/all");
        setCategories(response.data.result);
        setLoading(false);
        console.log("Categories",categories)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/author/all");
        setAuthors(response.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/publisher/all");
        setPublishers(response.data.result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = books.filter(book => {
      return (
        (!selectedFilters.category || book.category === selectedFilters.category) &&
        (!selectedFilters.author || book.authors.some(author => author.author_name === selectedFilters.author)) &&
        (!selectedFilters.publisher || book.publisher.some( publisher =>publisher.publisher_name === selectedFilters.publisher))
      );
    });
    setFilteredBooks(filteredResults);
  }, [selectedFilters, books]);

  const handleFilterChange = (filterType, filterValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === filterValue ? '' : filterValue
    }));
  };

  const renderClearButton = (filterType) => (
    <button
      onClick={() => handleFilterChange(filterType, '')}
      className="text-color-main-2 text-xl font-garamond font-light ml-2"
    >
      Bỏ chọn
    </button>
  );
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className="bg-color-background-main pt-10">
      <div>
        <div>
          <div className="flex ml-20">
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-3" to="/home">
                <span className="hover:underline hover:tracking-wider">Home</span>
              </Link>
            </div>
            <span className="text-color-main-2 text-xl mr-3"> / </span>
            <div className="mb-5">
              <Link style={{ color: '#a89b8f' }} className="active font-garamond text-xl font-semibold mr-6" to="/books">
                <span className="hover:underline hover:tracking-wider">Books</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="ml-20">
            <div className="text-color-main-2 text-xl font-garamond font-semibold mr-3">Filter</div>
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
        <div className="w-96 mt-10">
          <div>
            <div className="flex ml-14 cursor-pointer" onClick={() => setShowCategoryFilter(!showCategoryFilter)}>
              <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={showCategoryFilter ? faChevronUp : faChevronDown} />
              <span className="text-color-main text-2xl font-garamond font-semibold">Thể loại</span>
            </div>
            {showCategoryFilter && categories.map((category, index) => (
              <div key={index} className="box-book row h-auto w-64 ml-24">
                <button
                  className={`text-xl font-garamond font-light ${selectedFilters.category === category.name ? 'text-[#513820]' : 'text-color-main-2'}`}
                  onClick={() => handleFilterChange('category', category.name)}
                >
                  {category.name}
                </button>
                {selectedFilters.category === category.name && renderClearButton('category')}
              </div>
            ))}
          </div>

          <div>
            <div className="flex ml-14 mt-10 cursor-pointer" onClick={() => setShowAuthorFilter(!showAuthorFilter)}>
              <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={showAuthorFilter ? faChevronUp : faChevronDown} />
              <span className="text-color-main text-2xl font-garamond font-semibold">Tác giả</span>
            </div>
            {showAuthorFilter && authors.map((author, index) => (
              <div key={index} className="box-book row h-auto w-64 ml-24">
                <button
                  className={`text-xl font-garamond font-light ${selectedFilters.author === author.author_name ? 'text-[#513820]' : 'text-color-main-2'}`}
                  onClick={() => handleFilterChange('author', author.author_name)}
                >
                  {author.author_name}
                </button>
                {selectedFilters.author === author.author_name && renderClearButton('author')}
              </div>
            ))}
          </div>

          <div>
            <div className="flex ml-14 mt-10 cursor-pointer" onClick={() => setShowPublisherFilter(!showPublisherFilter)}>
              <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={showPublisherFilter ? faChevronUp : faChevronDown} />
              <span className="text-color-main text-2xl font-garamond font-semibold">Nhà xuất bản</span>
            </div>
            {showPublisherFilter && publishers.map((publisher, index) => (
              <div key={index} className="box-book row h-auto w-64 ml-24">
                <button
                  className={`text-xl font-garamond font-light ${selectedFilters.publisher === publisher.publisher_name ? 'text-[#513820]' : 'text-color-main-2'}`}
                  onClick={() => handleFilterChange('publisher', publisher.publisher_name)}
                >
                  {publisher.publisher_name}
                </button>
                {selectedFilters.publisher === publisher.publisher_name && renderClearButton('publisher')}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 w-11/12">
          <div className="main-books">
            <div className="books flex flex-wrap">
              {sortedBooks.map((book, index) => (
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
  <h5 className="text-color-main text-right active font-garamond text-xl font-light mr-6">
    {(book.total_pay).toLocaleString('vi-VN')} vnđ
  </h5>
  
</div>
                    <button
                      onClick={() => addToCart(book)}
                      className="bg-backgrond--color hover:bg-color-main hover:text-white--color w-11/12 h-9 border border-color-main-2 rounded-md text-color-main active font-garamond text-1xl font-light mr-6"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-10">
            {/* <FontAwesomeIcon className="text-color-main-2 mr-6 mt-2 text-2xl" icon={faChevronLeft} />
            <div className="flex">
              <div>
                <div className="text-color-main-2 mr-5 text-3xl font-garamond font-semibold">1</div>
              </div>
              <div>
                <div className="text-color-main-2 mr-5 text-3xl font-garamond font-semibold">2</div>
              </div>
              <div>
                <div className="text-color-main-2 mr-5 text-3xl font-garamond font-semibold">3</div>
              </div>
            </div>
            <FontAwesomeIcon className="text-color-main-2 mt-2 text-2xl" icon={faChevronRight} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

