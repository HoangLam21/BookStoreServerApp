import React, { useState, useEffect } from "react";
import axios from "axios";
import banner from "../../Assets/background2.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { useBook2 } from '../../context/BookContext';
import { Link } from "react-router-dom";
import { useCategory} from '../../context/CategoryContext';
import customer from '../../Assets/e8920b24adf6525436594f5876a7b299.jpg';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';



import './Home.css';

const HorizontalLine = () => {
  return (
    <div style={{ borderTop: '1px solid #a89b8f', width: '80%', margin: '0 auto' }} />
  );
}

const HorizontalLineBook = () => {
  return (
    <div style={{ borderTop: '1px solid #a89b8f', width: '20%', 'margin-left':0 }} />
  );
}

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredBooksNew, setFilteredBooksNew] = useState([]);
  const [categories, setCategories] = useState([]);
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


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const { selectedBook, setSelectedBook } = useBook2();
  
  const { selectedCategory, setSelectedCategory } = useCategory();


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/book/all");
        setBooks(response.data.result);

        const sortedByBestSeller = [...response.data.result].sort((a, b) => b.readingsession - a.readingsession);
        const sortedByNew = [...response.data.result].sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));

        setFilteredBooks(sortedByBestSeller.slice(0, 3)); 
        setFilteredBooksNew(sortedByNew.slice(0, 3)); 

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);


  

  return (
    <div style={{ background: '#fdfbf7' }} className="w-full h-full overflow-auto">
      <div>
        <img src={banner} alt="" />
      </div>
      <div className="relative mt-20 mb-20">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.button-next-slide',
            prevEl: '.button-prev-slide',
          }}
          modules={[Navigation]}
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-auto" />
              <div className="">
                <div className="slide flex">
                  <div className="contentBL w-2/3">
                    <h3 className="de text-color-main text-2xl font-garamond font-semibold mb-10">Best Seller</h3>
                    <h3 className="title text-color-main-2 text-4xl font-garamond font-semibold">{book.title}</h3>
                    <h6 className="author text-color-main-2 active font-garamond mb-4 text-xl font-semibold mr-6">- {book.authors.map(author => author.author_name).join(", ")}</h6>
                    <HorizontalLineBook/>
                    <p className="description text-color-main-2 text-xl mt-4 font-garamond font-semibold">{book.description}</p>
                    <Link
                    to="/orderBuyNow"
                    onClick={() => setSelectedBook(book)}
                  >
                                        <button className=" bg-color-main-2 hover:bg-color-main w-52 h-10 border  rounded-md text-white active font-garamond text-1xl font-light mr-6">Mua ngay</button>

                  </Link>
                  </div>

                  <div className="ml-[3%]">
                  <Link
                    to="/detailBook"
                    onClick={() => setSelectedBook(book)}
                  >
                  {book.galleryManage && book.galleryManage[0] && book.galleryManage[0].thumbnail ? (
        <img
          className="imageBook w-60 h-80 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl" 
          src={`data:image/jpeg;base64,${book.galleryManage[0].thumbnail}`}
          alt={book.title}
        />
      ) : (
        <div className="img-book-placeholder h-80 w-60 bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}

                  </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="button-next-slide">
            <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={faChevronRight} />
          </div>
          <div className="button-prev-slide">
            <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={faChevronLeft} />
          </div>
        </Swiper>
      </div>
      <HorizontalLine />

      <div className="relative mt-24 mb-24">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.button-next-slide-2',
            prevEl: '.button-prev-slide-2',
          }}
          modules={[Navigation]}
        >
          {filteredBooksNew.map((book, index) => (
            <SwiperSlide key={index}>
            <div className="w-full h-auto" />
              <div className="">
                <div className="">
                  <div className="flex slide">
                    <div className="content">
                    <h3 className="de text-color-main text-2xl font-garamond mb-10 font-semibold">New Book</h3>

                    <Link
                    to="/detailBook"
                    onClick={() => setSelectedBook(book)}
                  >
                  {book.galleryManage && book.galleryManage[0] && book.galleryManage[0].thumbnail ? (
        <img
          className="imageBook w-60 h-80 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl" 
          src={`data:image/jpeg;base64,${book.galleryManage[0].thumbnail}`}
          alt={book.title}
        />
      ) : (
        <div className="img-book-placeholder h-80 w-60 bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}

                  </Link>              
                  
                  </div>
                    <div className="contentNA w-2/3 ml-[3%] mt-20">
                      <h3 className="title text-color-main-2 text-4xl font-garamond font-semibold ">{book.title}</h3>
                      <h6 className="author text-color-main-2  active font-garamond mb-4 text-xl font-semibold mr-6">- {book.authors.map(author => author.author_name).join(", ")}</h6>
                      <HorizontalLineBook/>
                      <p className="description text-color-main-2 mt-4 text-xl font-garamond font-semibold ">{book.description}</p>
                      <Link
                    to="/orderBuyNow"
                    onClick={() => setSelectedBook(book)}
                  >
                                        <button className=" bg-color-main-2 hover:bg-color-main w-52 h-10 border  rounded-md text-white active font-garamond text-1xl font-light mr-6">Mua ngay</button>

                  </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="button-next-slide-2">
            <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={faChevronRight} />
          </div>
          <div className="button-prev-slide-2">
            <FontAwesomeIcon className="text-color-main mr-2 text-xl" icon={faChevronLeft} />
          </div>
        </Swiper>
      </div>
      <HorizontalLine />

      <h3 className="Category mb-8 text-color-main text-2xl mt-20 font-garamond font-semibold">_Category</h3>

      <div className="categories-container  flex justify-start overflow-x-auto">

  {categories.map((category, index) => (
    <div key={index} className="category-item flex flex-col items-center m-4">
    <Link
                    to="/bookWithCategory"
                    onClick={() => setSelectedCategory(category)}
                  >
      <img src={`data:image/jpeg;base64,${category.avatar}`} alt={category.name} className="category-image w-40 h-40 object-cover" />

                  </Link>    
      <p className="category-name text-color-main mt-2 text-xl font-garamond font-semibold">{category.name}</p>
    </div>
  ))}
</div>
<div className="customer mt-24 pb-20">
<h3 className=" mb-8 text-color-main text-2xl mt-20 font-garamond font-semibold">_Customer Care</h3>
<div className="flex">
  <img src={customer} alt="" className="h-60 "/>
  <div className="w-2/3">
  <p className="text-color-main mt-2 ml-10 text-xl font-garamond font-light">Dịch vụ chăm sóc khách hàng của Book Store không chỉ dừng lại ở việc hỗ trợ khách hàng trong quá trình mua sắm, mà còn hướng đến việc xây dựng mối quan hệ lâu dài và bền vững. Với đội ngũ chuyên nghiệp và các chính sách ưu đãi linh hoạt, Book Store cam kết mang lại sự hài lòng tối đa cho khách hàng.</p>
  <div className="flex">
  <h4 className="text-color-main mt-2 ml-10 text-xl font-garamond font-semibold">Xem chi tiết các dịch vụ chăm sóc khách hàng</h4>
  <Link
                    to="/customerCare"
                  >
  <FontAwesomeIcon className="text-color-main mr-2 mt-3 ml-5 text-xl" icon={faArrowRight} />

                  </Link>   
  </div>
  </div>
  

</div>


</div>
    </div>
  );
}
