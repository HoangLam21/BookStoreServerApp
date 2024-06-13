import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddNewBook() {
    const [file, setFile] = useState(null);
    const [book_id, setBookID] = useState(null);

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

    const [gal_description, setGalDescription] = useState('chưa có des');
    const [category, setCategory] = useState([]); // Change from '' to []
    const [thumbnail, setThumbnail] = useState('');  // Correct state variable name



    const url = `http://167.172.69.8:8010/BookStore/book/add`;
    const galurl = `http://167.172.69.8:8010/BookStore/gallery/add`;
    const CATEGORYALL = `http://167.172.69.8:8010/BookStore/category/all`;

    const fileInputRef = useRef(null);


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

    const handleAddBook = async () => {
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
        console.log(token)

            const response = await axios.post(url, bookInformationRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setBookID(response.data.result.id)

            handleAddGallery(response.data.result.id);
            console.log(bookInformationRequest)
            console.log(response.data.result.id)
            console.log('Book added:', response.data);
            toast.success("Book added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
        } catch (error) {
            console.error('Error adding book:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
            toast.dismiss("Book added failed!", {
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


    const handleAddGallery = async (bookId) => {
        const token = localStorage.getItem('token');

        const galleryManageRequest = {
            book_id: bookId,
            description: gal_description,
           
        };
        console.log(galleryManageRequest)
        const fd = new FormData();
        fd.append('image', file);
        fd.append('galleryManageRequest', new Blob([JSON.stringify(galleryManageRequest)], { type: "application/json" }));

        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }
        try {
            const response = await axios.post(galurl, fd, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept': 'application/json'
                }
            });
            console.log('Galaryadd added:', response.data);
            toast.success("Galary added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
        } catch (error) {
            console.error('Error adding gallery:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
            toast.dismiss("Book added failed!", {
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


    const handleRegisterAndAddBook = () => {
        handleAddBook()
  
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
        // <div className="w-full h-full">
        //     <div className="text-base text-primary--color p-3 mt-4">Chỉnh sửa thông tin sách</div>

        //     <div className="p-4 flex flex-col">
        //         <div className="setting-content w-full h-2/5 flex ">
        //             <div className="w-1/4 h-2/5 mt-3 flex flex-col items-center">
        //             <img
        //                 src={thumnail ? `data:image/jpeg;base64,${thumnail}` : 'https://via.placeholder.com/150'}
        //                 alt="avatar"
        //                 className="rounded-xl"
        //             />
        //             <input
        //                 type="file"
        //                 ref={fileInputRef}
        //                 style={{ display: 'none' }}
        //                 onChange={handleFileChange}
        //             />
        //                 <button onClick={handleFileButtonClick} className="border-2 mt-5 text-header--lightcolor font-semibold py-2 px-4 rounded-full">
        //                     Sửa ảnh
        //                 </button>
        //             </div>
        //             <div className="content-bookinf flex-1 w-4/5 items-start pt-2 ml-9">
        //                 <div className="flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Tên sách: </span>
        //                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        //                 </div>
        //                 <div className="flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Số trang: </span>
        //                     <input type="number" value={num_pages} onChange={(e) => setNumPages(Number(e.target.value))} />
        //                 </div>
        //                 <div className="flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Ngày xuất bản: </span>
        //                     <input type="datetime-local" value={publication_date} onChange={(e) => setPublicationDate(e.target.value)} />
        //                 </div>
        //                 <div className="flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Số lượng: </span>
        //                     <input type="number" value={bookQuantity} onChange={(e) => setBookQuantity(Number(e.target.value))} />
        //                 </div>
        //                 <div className="flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Giá: </span>
        //                     <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Giảm giá: </span>
        //                     <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mô tả: </span>
        //                     <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Là mặt hàng hot: </span>
        //                     <input type="checkbox" checked={hot} onChange={(e) => setHot(e.target.checked)} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Còn hàng không: </span>
        //                     <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mã ngôn ngữ: </span>
        //                     <input type="number" value={language_id} onChange={(e) => setLanguageId(Number(e.target.value))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mã loại: </span>
        //                     <input type="number" value={category_id} onChange={(e) => setCategoryId(Number(e.target.value))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mã nhà xuất bản: </span>
        //                     <input type="number" value={publisher_id} onChange={(e) => setPublisherId(Number(e.target.value))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mã nhà cung cấp: </span>
        //                     <input type="number" value={provider_id} onChange={(e) => setProviderId(Number(e.target.value))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mã ảnh: </span>
        //                     <input type="text" value={gallery_ids.join(',')} onChange={(e) => setGalleryIds(e.target.value.split(',').map(Number))} />
        //                 </div>
        //                 <div className="mt-4 flex gap-4 text-primary--color">
        //                     <span className="text-header--lightcolor flex items-center">Mã tác giả: </span>
        //                     <input type="text" value={author_ids.join(',')} onChange={(e) => setAuthorIds(e.target.value.split(',').map(Number))} />
        //                 </div>
        //             </div>
        //         </div>
        //         <button className="bg-primary--color text-[#fff] font-bold py-2 px-4 rounded mt-4 " onClick={handleRegisterAndAddStaff}>
        //             Thêm sách mới
        //         </button>
                
        //     </div>
        // </div>
        <div className="w-full h-full flex flex-col overflow-auto">
        <div className="mt-0 ml-3 text-base text-primary--color p-3 border-b">Thêm sách mới</div>
        <div className="p-4 w-11/12">
          <div className="setting-content flex flex-row w-full gap-10">
            <div className="w-2/5 h-2/4 mt-1 flex flex-col">
                <img
                    src={thumbnail ? `data:image/jpeg;base64,${thumbnail}` : 'https://via.placeholder.com/150'}
                    alt="avatar"
                    className="rounded-xl"
                />
                <input
                 type="file"
                 ref={fileInputRef}
                 style={{ display: 'none' }}
                 onChange={handleFileChange}
                />
                <button onClick={handleFileButtonClick} className="border-2 mt-5 text-header--lightcolor font-semibold py-2 px-4 rounded-full">
                    Sửa ảnh
                </button>
            </div>
            <div className="content-bookinf whitespace-nowrap flex-1 w-full flex flex-col items-start">
              <div className="gap-2 w-full">
                <div className="mt-3 mb-5 flex gap-4 text-primary--color w-full">
                  <div className="text-header--lightcolor flex items-center w-1/4">Tên sách:</div>
                  <input
                    type="text"
                    className="ml-2 p-2 border-2 text-center rounded-md w-3/4"
                    value={book_title}
                    onChange={(e) => setBookTitle(e.target.value)}
                  />
                </div>
                
                <div className="w-full flex gap-4">
                  <div className="mt-1 mb-5 flex gap-2 text-primary--color w-1/2">
                    <div className="text-header--lightcolor flex items-center w-1/2">Nổi bật:</div>
                    <input
                      type="checkbox"
                      className="ml-2 p-2 border-2 flex rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      checked={book_hot}
                      onChange={(e) => setBookHot(e.target.checked)}
                    />
                  </div>
                  <div className="mt-1 mb-4 flex gap-4 text-primary--color w-1/2">
                    <div className="text-header--lightcolor flex items-center w-1/2">Còn hàng:</div>
                    <input
                      type="checkbox"
                      className="ml-2 p-2 border-2 rounded-md text-end focus:outline-none focus:ring focus:border-blue-300"
                      checked={book_available}
                      onChange={(e) => setBookAvailable(e.target.checked)}
                    />
                  </div>
                </div>
                
                <div className="mt-1 mb-5 flex gap-4 text-primary--color w-full">
                  <div className="text-header--lightcolor flex items-center w-1/4">Giá:</div>
                  <input
                    type="number"
                    className="ml-8 p-2 border-2 rounded-md text-end w-1/3 focus:outline-none focus:ring focus:border-blue-300"
                    value={book_price}
                    onChange={(e) => setBookPrice(e.target.value)}
                  />
                </div>
                
                <div className="mt-1 mb-5 flex gap-4 text-primary--color w-full">
                  <div className="text-header--lightcolor flex items-center w-1/4">Giảm giá:</div>
                  <input
                    type="number"
                    className="ml-8 p-2 border-2 rounded-md text-end w-1/3 focus:outline-none focus:ring focus:border-blue-300"
                    value={book_discount}
                    onChange={(e) => setBookDiscount(e.target.value)}
                  />
                </div>
                
                <div className="mt-1 mb-5 flex gap-4 text-primary--color w-full">
                  <div className="text-header--lightcolor flex items-center w-1/4">Số trang:</div>
                  <input
                    type="number"
                    className="ml-8 p-2 border-2 rounded-md text-end w-1/3 focus:outline-none focus:ring focus:border-blue-300"
                    value={book_num_pages}
                    onChange={(e) => setBookNumPages(e.target.value)}
                  />
                </div>
                
                <div className="mt-1 mb-5 flex gap-4 text-primary--color w-full">
                  <div className="text-header--lightcolor flex items-center w-1/4">Số lượng:</div>
                  <input
                    type="number"
                    className="ml-8 p-2 border-2 rounded-md text-end w-1/3 focus:outline-none focus:ring focus:border-blue-300"
                    value={book_bookQuantity}
                    onChange={(e) => setBookBookQuantity(e.target.value)}
                  />
                </div>
                
                <div className="mt-1 mb-5 flex gap-4 text-primary--color w-full">
                  <div className="text-header--lightcolor flex items-center w-1/4">Ngày xuất bản:</div>
                  <input
                    type="date"
                    className="ml-8 p-2 border-2 rounded-md w-2/4 focus:outline-none focus:ring focus:border-blue-300"
                    value={book_publication_date}
                    onChange={(e) => setBookPublicationDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
  
  
          <div className='ml-10 mt-2'>
            <div className="flex mb-6 gap-0 text-primary--color">
              <div className="text-header--lightcolor flex items-center w-1/4">Mô tả:</div>
              <textarea
                className="p-2 w-4/6 h-auto border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={book_description}
                onChange={(e) => setBookDescription(e.target.value)}
                rows="4"
              />
            </div>
  
            <div className="flex gap-4">
              <div className="flex mb-6 gap-0 text-primary--color w-1/2">
                <div className="text-header--lightcolor flex items-center w-1/2">Ngôn ngữ ID:</div>
                <input
                  type="number"
                  className="p-2 border-2 text-center rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/4"
                  value={book_language_id}
                  onChange={(e) => setBookLanguageId(e.target.value)}
                />
              </div>
              <div className="flex mb-6 gap-4 text-primary--color w-1/2">
                <div className="text-header--lightcolor flex items-center w-1/3">Danh mục ID:</div>
                <select
                  value={book_category_id}
                  onChange={(e) => setBookCategoryId(e.target.value)}
                  name='category'
                  className="border-2 h-10 border-border--color rounded-md px-2 w-2/4"
                >
                  <option value="">Chọn danh mục</option>
                  {category.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name} - DM{cat.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="flex gap-4">
              <div className="flex mb-6 gap-0 text-primary--color w-1/2">
                <span className="text-header--lightcolor flex items-center w-1/2">Mã tác giả:</span>
                <input
                  type="text"
                  value={book_author_ids.join(',')}
                  onChange={(e) => setBookAuthorIds(e.target.value.split(',').map(Number))}
                  className="p-2 text-center border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/4"
                />
              </div>
              <div className="flex mb-6 gap-0 text-primary--color w-1/2">
                <span className="text-header--lightcolor flex items-center w-1/2">Mã nhà xuất bản:</span>
                <input
                  type="number"
                  value={book_publisher_id}
                  onChange={(e) => setBookPublisherId(Number(e.target.value))}
                  className="p-2 text-center border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/4"
                />
              </div>
            </div>
  
            <div className="flex gap-4">
              <div className="flex mb-6 gap-0 text-primary--color w-1/2">
                <span className="text-header--lightcolor flex items-center w-1/2">Mã nhà cung cấp:</span>
                <input
                  type="number"
                  value={book_provider_id}
                  onChange={(e) => setBookProviderId(Number(e.target.value))}
                  className="p-2 text-center border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/4"
                />
              </div>
              <div className="flex mb-6 gap-0 text-primary--color w-1/2">
                <span className="text-header--lightcolor flex items-center w-1/2">Mã ảnh:</span>
                <input
                  type="text"
                  value={book_gallery_ids.join(',')}
                  onChange={(e) => setBookGalleryIds(e.target.value.split(',').map(Number))}
                  className="p-2 text-center border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/4"
                />
              </div>
            </div>
          </div>
          <div className='h-2/5 flex justify-center items-center'>
            <button className="bg-primary--color text-[#fff] font-bold py-2 px-4 rounded-lg " onClick={handleAddBook}>
                  Thêm sách
            </button>
        </div>
      </div>
    );
};