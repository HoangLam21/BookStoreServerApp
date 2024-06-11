import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useBook2 } from '../context/BookContext';
import axios from "axios";
import OverlayEditBook from "./overlayBook";
import EditDetailBook from "./EditDetailBook";
import './detailBook.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBook from "./AddBook";
import './detailBook.css'
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


const BOOKALL = `http://167.172.69.8:8010/BookStore/book/all`;
const CATEGORYALL = `http://167.172.69.8:8010/BookStore/category/all`;



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
  const { id: bookId } = useParams();
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


  
  const [showAddStock, setshowAddStock] = useState(false);


  const openDialog = () => {
    setshowAddStock(true);
    setOverlayVisible(true); // Hiển thị overlay khi mở dialog
  };

  const closeDialog = () => {
      setshowAddStock(false);
      setOverlayVisible(false); // Ẩn overlay khi đóng dialog
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

  const handleDeleteBook = async (event) => {
    event.preventDefault();
    toast.warn(
        <div className='flex flex-col'>
         <p>Bạn có muốn xóa sách này</p>
           <div className='flex w-full py-1 justify-between'>
           <button onClick={confirmDelete}>Confirm</button>
           <button onClick={() => toast.dismiss()}>Cancel</button>
           </div>
         
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progress: undefined
        }
      );
    };

    
    const confirmDelete = async () => {
      const url = `http://167.172.69.8:8010/BookStore/book/delete/${bookId}`;
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Book deleted:', response.data);
         
            console.log('Book deleted:', response.data);
            // Add any additional logic after successful deletion, e.g., update state or UI
            toast.success("Book deleted successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
        }
        catch (error) {
            console.error('Error deleting stock:', error);
            if (error.response?.data) {
              console.error("Error response:", error.response.data);
            }
            toast.error("Error deleting stock. Please try again later.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          }
};


  return (
    <div>
      <div className="flex min-h-fit h-fit bg-color-background-main p-2">
        <div className="flex w-full max-w-screen-lg mt-10">
          <div className="flex w-1/3" style={{ marginLeft: '1%' }}>
            <div className="flex flex-col">
              <img className="w-full mb-4" src={selectedBook.galleryManage && selectedBook.galleryManage.length > 0 && selectedBook.galleryManage[0].thumbnail 
                      ? `data:image/jpeg;base64,${selectedBook.galleryManage[0].thumbnail}` 
                      : 'https://via.placeholder.com/150'}
                alt="" />
            </div>
          </div>
          <div className="flex-1 ml-10">
            <span className="text-color-main text-4xl font-garamond font-semibold"><i>{selectedBook.title}</i></span>
            <h6 className="text-color-main font-garamond text-xl font-semibold mr-3 mt-1">
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

            <div className='flex w-full justify-between p-4'>
              <div className="flex mt-10">
                <h3 className="text-color-main text-xl mr-2 font-garamond font-semibold">Chỉnh sửa thông tin sách</h3>
                <FontAwesomeIcon className="text-color-main mt-1 text-xl" icon={faArrowRight} onClick={openDialog} />
              </div>
              <div className="flex mt-10">
              <h3 className="text-color-main text-xl mr-2 font-garamond font-semibold">Xóa sách</h3>
              <FontAwesomeIcon className="text-color-main mt-1 text-xl" icon={faArrowRight}  onClick={handleDeleteBook}/>
              </div>
            </div>
           
          </div>
        </div>
      </div>
      {/* {isDetailBookOpen && (
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
                  onClick={openDialog}
                  className="hover:text-color-main hover:scale-110 cursor-pointer"
                />
              </div>
              <EditDetailBook />
            </div>
          </div>
        </>
      )} */}

      <div className="z-10 ml-4 mt-1 w-full max-md:max-w-full h-1/5">
        <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
        <div className='flex  w-full justify-start items-center'>
        <span className="text-color-main font-garamond text-xl font-semibold">Đánh giá cho: </span>
        <span className="text-color-main mt-5 ml-2 text-2xl font-garamond font-semibold mb-5 ">{selectedBook.title}</span>
        </div>
        
        <div className="p-5 overflow-y-auto max-h-screen">
          
          {feedbackList.length > 0 ? (
            <div>
              <h2 className="text-color-main font-garamond text-header--lightcolor flex items-center mt-3">Danh sách đánh giá:</h2>
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

      {showAddStock && (
        <AddBook trigger={setshowAddStock} setTrigger={setshowAddStock}>
          <OverlayEditBook isOpen={overlayVisible} onClose={closeDialog}>
            <EditBookInfor bookId={bookId}/>
          </OverlayEditBook>
        </AddBook>
      )}
    </div>
  );
}


function EditBookInfor({ bookId }) {
  const [book, setBook] = useState(null);
  const [file, setFile] = useState(null);

  const [book_title, setBookTitle] = useState('');
  const [book_num_pages, setBookNumPages] = useState(0);
  const [book_publication_date, setBookPublicationDate] = useState('');
  const [book_bookQuantity, setBookBookQuantity] = useState(0);
  const [book_price, setBookPrice] = useState(0);
  const [book_discount, setBookDiscount] = useState(0);
  const [book_description, setBookDescription] = useState('');
  const [book_hot, setBookHot] = useState(false);
  const [book_available, setBookAvailable] = useState(true);
  const [book_language_id, setBookLanguageId] = useState(0);
  const [book_category_id, setBookCategoryId] = useState(0);
  const [book_publisher_id, setBookPublisherId] = useState(0);
  const [book_provider_id, setBookProviderId] = useState(0);
  const [book_gallery_ids, setBookGalleryIds] = useState([]);
  const [book_author_ids, setBookAuthorIds] = useState([]);
  const fileInputRef = useRef(null);

  const url_update = `http://167.172.69.8:8010/BookStore/book/update/${bookId}`;

  const [gal_description, setGalDescription] = useState('chưa có des');
  const [thumbnail, setThumbnail] = useState('');  // Correct state variable name
  const [category, setCategory] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, please log in.');
            return;
        }

        try {
            const response = await axios.get(CATEGORYALL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = response.data.result;
            setCategory(result);
        } catch (error) {
            console.error('Error fetching user data:', error.response?.data || error);
        }
    };

    fetchUserData();
}, []);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(BOOKALL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
     
        const result = response.data.result;
        console.log('API Response:', result); // Log the entire result for debugging
        const foundStaff = result.find(staff => staff.id === parseInt(bookId, 10));
        console.log('Found Book:', foundStaff);


        if (foundStaff) {
          setBook(foundStaff);
          setBookTitle(foundStaff.title);
          setBookNumPages(foundStaff.num_pages);
          setBookPublicationDate(foundStaff.publication_date);
          setBookBookQuantity(foundStaff.bookQuantity);
          setBookPrice(foundStaff.price);
          setBookDiscount(foundStaff.discount);
          setBookDescription(foundStaff.description);
          setBookHot(foundStaff.hot);
          setBookAvailable(foundStaff.available);
          setBookLanguageId(foundStaff.language.id);
          setBookCategoryId(foundStaff.category);
          setBookPublisherId(foundStaff.publisher.id);
          setBookProviderId(foundStaff.provider.id);
          // setBookGalleryIds(foundStaff.gallery_ids || []);
          // setBookAuthorIds(foundStaff.author_ids || []);

          const galleryManage = foundStaff.galleryManage || [];
          const galleryIds = galleryManage.map(gallery => parseInt(gallery.id, 10)); // Ensure IDs are integers
         // setGallery(galleryIds)
          setBookGalleryIds(galleryIds);
          console.log(book_gallery_ids)

          const authors = foundStaff.authors || [];
          const authorId = authors.map(authors => parseInt(authors.id, 10)); // Ensure IDs are integers
          setBookAuthorIds(authorId);
          console.log(book_author_ids)


            
        } else {
          console.error('Book not found with ID:', bookId);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.data) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    fetchUserData();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleEditBook = async () => {
    const token = localStorage.getItem('token');

    const bookInformationRequest = {
      title: book_title,
      num_pages: book_num_pages,
      publication_date: book_publication_date,
      bookQuantity: book_bookQuantity,
      price: book_price,
      discount: book_discount,
      description: book_description,
      hot: book_hot,
      available: book_available,
      language_id: book_language_id,
      publisher_id: book_publisher_id,
      category_id: book_category_id,
      provider_id: book_provider_id,
      gallery_ids: book_gallery_ids,
      author_ids: book_author_ids,
    };

    try {
      console.log('Token:', token);
      console.log('Book Request:', bookInformationRequest);

      const response = await axios.put(url_update, bookInformationRequest, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
    
      handleEditGallery(bookId)
      console.log('Response:', response.data);
      toast.success("Book updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      console.error('Error updating book:', error);
      if (error.response?.data) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Book update failed!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const handleEditGallery = async (bookId) => {
    const url_update_gall = `http://167.172.69.8:8010/BookStore/gallery/update/${book_gallery_ids}`;

    const token = localStorage.getItem('token');

    console.log(url_update_gall)
    const galleryManageRequest = {
      book_id: bookId,
      description: gal_description,
    };

    console.log('Gallery Request:', galleryManageRequest);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('galleryManageRequest', new Blob([JSON.stringify(galleryManageRequest)], { type: "application/json" }));

    for (let [key, value] of fd.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.patch(url_update_gall, fd, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Accept': 'application/json'
        }
      });
      console.log('Gallery updated:', response.data);
      toast.success("Gallery updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      console.error('Error updating gallery:', error);
      if (error.response?.data) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Gallery update failed!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

 
  return (
   <div className="w-full h-full flex flex-col overflow-auto">
      <div className="mt-2 ml-3 text-base text-primary--color p-3 border-b">Chỉnh sửa thông tin sách</div>
      <div className="p-4 w-5/6 flex flex-col gap-10">
        <div className="setting-content flex flex-row w-full h-2/4 gap-10">
          <div className="w-1/4 h-2/4 mt-3 flex flex-col items-center">
          <img
                        src={book.galleryManage && book.galleryManage.length > 0 && book.galleryManage[0].thumbnail 
                      ? `data:image/jpeg;base64,${book.galleryManage[0].thumbnail}` 
                      : 'https://via.placeholder.com/150'}
                    alt=""
                        className="rounded-xl h-full w-full"
                    />
            <input
              type="file"
              style={{ display: 'none' }}
            />
            <button className="border-2 mt-5 text-header--lightcolor font-semibold py-2 px-4 rounded-full">
              Sửa ảnh
            </button>
          </div>
          <div className="content-bookinf whitespace-nowrap flex-1 w-full flex flex-col items-start pt-2 ml-3 gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Tên sách:</div>
                <input
                  type="text"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_title}
                  onChange={(e) => setBookTitle(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Số trang:</div>
                <input
                  type="number"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_num_pages}
                  onChange={(e) => setBookNumPages(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Ngày xuất bản:</div>
                <input
                  type="date"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_publication_date}
                  onChange={(e) => setBookPublicationDate(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Số lượng:</div>
                <input
                  type="number"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_bookQuantity}
                  onChange={(e) => setBookBookQuantity(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Giá:</div>
                <input
                  type="number"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_price}
                  onChange={(e) => setBookPrice(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Giảm giá:</div>
                <input
                  type="number"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_discount}
                  onChange={(e) => setBookDiscount(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Mô tả:</div>
                <textarea
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_description}
                  onChange={(e) => setBookDescription(e.target.value)}
                />
              </div>
              <div className="w-full flex gap-20">
                <div className="mt-1 flex gap-4 text-primary--color">
                  <div className="text-header--lightcolor flex items-center">Nổi bật:</div>
                  <input
                    type="checkbox"
                    className="ml-2 p-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    checked={book_hot}
                    onChange={(e) => setBookHot(e.target.checked)}
                  />
                </div>
                <div className="mt-1 flex gap-4 text-primary--color">
                  <div className="text-header--lightcolor flex items-center">Còn hàng:</div>
                  <input
                    type="checkbox"
                    className="ml-2 p-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    checked={book_available}
                    onChange={(e) => setBookAvailable(e.target.checked)}
                  />
                </div>
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Ngôn ngữ ID:</div>
                <input
                  type="number"
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={book_language_id}
                  onChange={(e) => setBookLanguageId(e.target.value)}
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <div className="text-header--lightcolor flex items-center">Danh mục ID:</div>
                <select
                  value={book_category_id}
                  onChange={(e) => setBookCategoryId(e.target.value)}
                  name='category'
                  className="border-2 h-7 border-border--color rounded-md px-2 w-40"
                >
                  <option value="">Chọn danh mục</option>
                  {category.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name} - DM{cat.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Mã nhà xuất bản:</span>
                <input
                  type="number"
                  value={book_publisher_id}
                  onChange={(e) => setBookPublisherId(Number(e.target.value))}
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Mã nhà cung cấp:</span>
                <input
                  type="number"
                  value={book_provider_id}
                  onChange={(e) => setBookProviderId(Number(e.target.value))}
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Mã ảnh:</span>
                <input
                  type="text"
                  value={book_gallery_ids.join(',')}
                  onChange={(e) => setBookGalleryIds(e.target.value.split(',').map(Number))}
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mt-1 flex gap-4 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Mã tác giả:</span>
                <input
                  type="text"
                  value={book_author_ids.join(',')}
                  onChange={(e) => setBookAuthorIds(e.target.value.split(',').map(Number))}
                  className="ml-2 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className='h-1/6 flex justify-center items-center'>
      <button className="bg-primary--color text-[#fff] font-bold py-2 px-4 rounded mt-1 " onClick={handleEditBook}>
          Thêm sách mới
        </button>
      </div>
      
    </div>
  );
}