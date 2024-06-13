import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBook2 } from '../../Components/context/BookContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import OverlayAddBook from "./overlayBook";
import AddBook from "./AddBook";
import AddNewBook from "./AddNewBook";
import "./Book.css"
import { Link } from "react-router-dom";
import PaginationButtons from './PaginationButtons';


export default function Books() {
  const useNav = useNavigate();
  const [showAddStock, setshowAddStock] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false); 
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

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // Số lượng sách trên mỗi trang

  const openDialog = () => {
    setshowAddStock(true);
    setOverlayVisible(true); // Hiển thị overlay khi mở dialog
  };

  const closeDialog = () => {
      setshowAddStock(false);
      setOverlayVisible(false); // Ẩn overlay khi đóng dialog
  };

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
        (!selectedFilters.publisher || book.publisher.some(publisher => publisher.publisher_name === selectedFilters.publisher))
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

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleBookDetail = (book) => {
    setSelectedBook(book);
  };
  const renderClearButton = (filterType) => (
    <button
      onClick={() => handleFilterChange(filterType, '')}
      className="text-color-main-2 text-xl font-garamond font-light ml-2"
    >
      Bỏ chọn
    </button>
  );

  // Sắp xếp sách
  let sortedBooks = [...filteredBooks];
  if (sortBy === "newest") {
    sortedBooks.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
  } else if (sortBy === "bestseller") {
    // Sắp xếp theo tiêu chí bán chạy nhất
  } else if (sortBy === "priceLowToHigh") {
    sortedBooks.sort((a, b) => a.total_pay - b.total_pay);
  } else if (sortBy === "priceHighToLow") {
    sortedBooks.sort((a, b) => b.total_pay - a.total_pay);
  }

  // Tính toán chỉ số của sách trên trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-color-background-main pt-5">
      <div className='w-full h-full'>
        {showAddStock && (
          <AddBook trigger={setshowAddStock} setTrigger={setshowAddStock}>
            <OverlayAddBook isOpen={overlayVisible} onClose={closeDialog}>
              <AddNewBook />
            </OverlayAddBook>
          </AddBook>
        )}
        <div className="filter-books flex w-full">
          <div className="">
            <span className="text-color-main-2 text-xl font-garamond font-semibold ml-10">Sắp xếp theo</span>
            <select
              className="block appearance-none ml-7 mt-4 text-center w-auto bg-white border text-color-main text-l font-garamond font-semibold border-gray-300 hover:border-color-main px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleSortChange}
              value={sortBy}
            >
              <option value="">Tất cả</option>
              <option value="newest">Mới nhất</option>
              <option value="bestseller">Bán chạy nhất</option>
              <option value="priceLowToHigh">Giá tăng dần</option>
              <option value="priceHighToLow">Giá giảm dần</option>
            </select>

            <div>
              <div className="flex ml-5 cursor-pointer mt-10 mb-5" onClick={() => setShowCategoryFilter(!showCategoryFilter)}>
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
          <div className="flex ml-5 mt-10 cursor-pointer" onClick={() => setShowAuthorFilter(!showAuthorFilter)}>
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
          <div className="flex ml-5 mt-10 cursor-pointer" onClick={() => setShowPublisherFilter(!showPublisherFilter)}>
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
        <button
          onClick={openDialog}
          className="btn_addworkshift bg-primary--color text-white--color rounded-full mb-2 mr-8 mt-10 ml-7 cursor-pointer hover:opacity-70 border 
                  h-10 w-28 text-xs 
                  sm:w-26 sm:text-sm
                  md:w-26 md:text-sm
                  lg:w-32 lg:text-sm"
        >
          Thêm sách
        </button>
      </div>
      <div className="mt-1 w-full">
        <div className="main-books w-full">
          <div className="books flex flex-wrap justify-center ">
            {currentBooks.map((book, index) => (
              <div key={index} className="box-book w-44 flex flex-col justify-center rounded-lg pb-5 p-2">
                <div className="relative">
                  <img
                    className="img-book h-60 w-56 object-cover rounded-md"
                    src={book.galleryManage && book.galleryManage.length > 0 && book.galleryManage[0].thumbnail 
                      ? `data:image/jpeg;base64,${book.galleryManage[0].thumbnail}` 
                      : 'https://via.placeholder.com/150'}
                    alt=""
                  />
                  <Link to={`/manage/detailBook/${book.id}`} onClick={() => handleBookDetail(book)}>
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white border border-white font-semibold text-lg hover:bg-opacity-50 transition-opacity"
                    >
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
                <div className="book-text mt-2">
                  <div className="h-14 ">
                    <span className="text-color-main active font-garamond text-xl items-center font-semibold"><i>{book.title}</i></span>
                  </div>
                  <h6 className="text-color-main-2 active font-garamond text-l font-semibold mr-6 ">- {book.authors.map(author => author.author_name).join(", ")}</h6>
                  <div className="flex justify-end">
                    <h5 className="text-color-main text-right active font-garamond text-xl font-light mr-6">
                      {(book.total_pay).toLocaleString('vi-VN')} vnđ
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Phân trang */}
          <div className="pagination-container flex justify-center items-center">
            {Array.from({ length: Math.ceil(sortedBooks.length / booksPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`pagination-button focus:outline-none mx-1 py-1 px-3 rounded-lg ${currentPage === index + 1 ? 'bg-primary--color text-white--color' : 'bg-white border border-gray-300 text-color-main-2'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
}
