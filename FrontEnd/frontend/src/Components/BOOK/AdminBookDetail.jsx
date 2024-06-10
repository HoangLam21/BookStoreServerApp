import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useBook2 } from '../context/BookContext';
import axios from "axios";
import OverlayEditBook from "./overlayBook";
import EditDetailBook from "./EditDetailBook";
import './detailBook.css';

const BOOKALL_URL = 'http://167.172.69.8:8010/BookStore/book/all';

export default function AdminDetailBook() {
  const [isDetailBookOpen, setIsDetailBookOpen] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const { selectedBook, setSelectedBook } = useBook2();
  const [feedbackList, setFeedbackList] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showEditBook, setShowEditBook] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isFeedbackBookOpen, setIsFeedbackBookOpen] = useState(false);

  const ratings = selectedBook?.feedback.map(feedback => feedback.rating); // Guard against selectedBook being null or undefined
  const averageRating = ratings && ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

  const toggleDetailBookOpen = () => {
    setIsDetailBookOpen(!isDetailBookOpen);
  };

  const toggleOverlay = () => {
    setIsOverlay(!isOverlay);
  };

  const closeEditBookDialog = () => {
    setShowEditBook(false);
    setOverlayVisible(false);
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

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://167.172.69.8:8010/BookStore/feedback/${selectedBook.id}`);
        setFeedbackList(response.data.result);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    if (selectedBook) {
      fetchFeedback();
    }
  }, [selectedBook]);

  const extractDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!selectedBook) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex min-h-fit h-fit bg-color-background-main p-2">
        <div className="flex w-full max-w-screen-lg mt-10">
          <div className="flex w-1/3" style={{ marginLeft: '1%' }}>
            <div className="flex flex-col">
              <img className="w-full mb-4" src={`data:image/jpeg;base64,${selectedBook.galleryManage[0].thumbnail}`} alt="" />
            </div>
          </div>
          <div className="flex-1 ml-10">
            <span className="text-color-main text-4xl font-garamond font-semibold"><i>{selectedBook.title}</i></span>
            <h6 className="text-color-main font-garamond text-xl font-semibold mr-3 mt-2">
              Tác giả: <i className="text-color-main-2">{selectedBook.authors.map(author => author.author_name).join(", ")}</i>
            </h6>
            <p className="text-color-main font-garamond text-xl font-semibold mr-6">
              Giá: <i className="text-color-main-2">{selectedBook.price}</i>
            </p>
            <h4 className="text-color-main font-garamond text-xl font-semibold mr-6">
              Thể loại: <i className="text-color-main-2">{selectedBook.category}</i>
            </h4>
            <h5 className="text-color-main font-garamond text-xl font-semibold mr-6">
              Số trang: <i className="text-color-main-2">{selectedBook.num_pages}</i>
            </h5>
            <p className="text-color-main font-garamond text-xl font-semibold mr-6">
              Ngày xuất bản: <i className="text-color-main-2">{extractDate(selectedBook.publication_date)}</i>
            </p>
            <h4 className="text-color-main font-garamond text-xl font-semibold mr-6">
              Số lượng còn: <i className="text-color-main-2">{selectedBook.bookQuantity}</i>
            </h4>
            <h5 className="text-color-main font-garamond text-xl font-semibold mr-6">
              Nhà xuất bản: <i className="text-color-main-2">{selectedBook.publisher.publisher_name}</i>
            </h5>
            <p className="text-color-main font-garamond text-xl font-semibold mr-6">
              Ngôn ngữ: <i className="text-color-main-2">{selectedBook.language.language_name}</i>
            </p>
            <h5 className="text-color-main font-garamond text-xl font-semibold mr-6">
              Nhà cung cấp: <i className="text-color-main-2">{selectedBook.provider.providername}</i>
            </h5>
            <p className="text-color-main font-garamond text-xl font-semibold mr-6">
              Trích dẫn: <i className="text-color-main-2">{selectedBook.description}</i>
            </p>
            <div className="flex mt-10">
              <h3 className="text-color-main text-xl mr-2 font-garamond font-semibold">Chỉnh sửa thông tin sách</h3>
              <FontAwesomeIcon className="text-color-main mt-1 text-xl" icon={faArrowRight} onClick={() => { toggleDetailBookOpen(); toggleOverlay(); }} />
            </div>
          </div>
        </div>
      </div>
      {isDetailBookOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={() => setIsDetailBookOpen(false)} />
          <div className="container fixed top-24 right-0 bottom-0 bg-white shadow-md">
            <div className="mx-auto pt-5 pl-10 pr-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-color-main text-3xl font-garamond font-light"><i>Chỉnh sửa thông tin sách</i></h1>
                </div>
                <FontAwesomeIcon
                  style={{ color: "#a89b8f", fontSize: "1.1rem" }}
                  icon={faXmark}
                  onClick={() => { toggleDetailBookOpen(); toggleOverlay(); }}
                  className="hover:text-color-main hover:scale-110 cursor-pointer"
                />
              </div>
              <EditDetailBook />
            </div>
          </div>
        </>
      )}

      <div className="z-10 ml-4 mt-2 w-full max-md:max-w-full h-1/5">
        <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
        <h2 className="text-color-main mt-5 ml-5 text-2xl font-garamond font-semibold mb-5">Đánh giá</h2>
        <div className="p-5 overflow-y-auto max-h-screen">
          <h1 className="text-color-main font-garamond text-xl font-semibold">{selectedBook.title}</h1>
          {feedbackList.length > 0 ? (
            <div>
              <h2 className="text-color-main font-garamond text-lg font-semibold mt-3">Danh sách đánh giá:</h2>
              <ul className="list-disc ml-5">
                {feedbackList.map((feedback, index) => (
                  <div key={index} className="flex mb-4">
                    <img className="w-12 h-12 rounded-full" src={`data:image/jpeg;base64,${feedback.avatar}`} alt="" />
                    <div className="ml-4">
                      <p className="text-color-main font-garamond text-xl">{feedback.fullname}</p>
                      <div className="flex items-center">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-color-main font-garamond text-xl">{feedback.feedback_comment}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-color-main font-garamond text-lg mt-3">Chưa có đánh giá nào cho cuốn sách này.</p>
          )}
        </div>
      </div>

      {showEditBook && (
        <OverlayEditBook isOpen={overlayVisible} onClose={closeEditBookDialog}>
          <EditDetailBook bookId={selectedBook.id} />
        </OverlayEditBook>
      )}
    </div>
  );
}
