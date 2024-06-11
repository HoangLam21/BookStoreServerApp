import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddNewBook() {
    const [file, setFile] = useState(null);
    const [book_id, setBookId] = useState('');
    const [title, setTitle] = useState('');  // Corrected to setTitle
    const [num_pages, setNumPages] = useState(0);  // Corrected to setNumPages
    const [publication_date, setPublicationDate] = useState('');  // Corrected to setPublicationDate
    const [bookQuantity, setBookQuantity] = useState(0);  // Corrected to setBookQuantity
    const [price, setPrice] = useState(0);  // Added price state
    const [discount, setDiscount] = useState(0);  // Corrected to setDiscount
    const [description, setDescription] = useState('');  // Corrected to setDescription
    const [hot, setHot] = useState(false);  // Corrected to setHot and set default to false
    const [available, setAvailable] = useState(true);  // Corrected to setAvailable
    const [language_id, setLanguageId] = useState(0);  // Corrected to setLanguageId
    const [category_id, setCategoryId] = useState(0);  // Corrected to setCategoryId
    const [publisher_id, setPublisherId] = useState(0);  // Corrected to setPublisherId
    const [provider_id, setProviderId] = useState(0);  // Corrected to setProviderId
    const [gallery_ids, setGalleryIds] = useState([]);  // Corrected to setGalleryIds
    const [author_ids, setAuthorIds] = useState([]);  // Corrected to setAuthorIds


    const [gal_description, setGal_Description] = useState('chưa có des');  // Corrected to setDescription
    const [thumnail, setThumnail] = useState('');
    const [bookID, setBookID] = useState('');


    const url = `http://167.172.69.8:8010/BookStore/book/add`;
    const galurl = `http://167.172.69.8:8010/BookStore/gallery/add`;

    const fileInputRef = useRef(null);


    const handleAddBook = async () => {
        const token = localStorage.getItem('token');


        const bookInformationRequest = {
            title: title,
            num_pages: num_pages,
            publication_date: publication_date,
            bookQuantity: bookQuantity,
            price: price,
            discount: discount,
            description: description,
            hot: hot,
            available: available,
            language_id: language_id,
            publisher_id: publisher_id,
            category_id: category_id,
            provider_id: provider_id,
            gallery_ids: gallery_ids,
            author_ids: author_ids,
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
            console.log('Staff added:', response.data);
            toast.success("Staff added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
        } catch (error) {
            console.error('Error adding boook:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
            toast.dismiss("boook added failed!", {
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
            toast.dismiss("Staff added failed!", {
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


    const handleRegisterAndAddStaff = () => {
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
                setThumnail(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="w-full h-full">
            <div className="text-base text-primary--color p-3 mt-4">Chỉnh sửa thông tin sách</div>

            <div className="p-4 w-5/6 flex flex-col items-center">
                <div className="setting-content w-full h-2/5 flex ">
                    <div className="w-1/4 h-2/5 mt-3 flex flex-col items-center">
                    <img
                        src={thumnail ? `data:image/jpeg;base64,${thumnail}` : 'https://via.placeholder.com/150'}
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
                    <div className="content-bookinf flex-1 w-full flex flex-col items-start pt-2 ml-9">
                        <div className="flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Tên sách: </span>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Số trang: </span>
                            <input type="number" value={num_pages} onChange={(e) => setNumPages(Number(e.target.value))} />
                        </div>
                        <div className="flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Ngày xuất bản: </span>
                            <input type="datetime-local" value={publication_date} onChange={(e) => setPublicationDate(e.target.value)} />
                        </div>
                        <div className="flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Số lượng: </span>
                            <input type="number" value={bookQuantity} onChange={(e) => setBookQuantity(Number(e.target.value))} />
                        </div>
                        <div className="flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Giá: </span>
                            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Giảm giá: </span>
                            <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mô tả: </span>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Là mặt hàng hot: </span>
                            <input type="checkbox" checked={hot} onChange={(e) => setHot(e.target.checked)} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Còn hàng không: </span>
                            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã ngôn ngữ: </span>
                            <input type="number" value={language_id} onChange={(e) => setLanguageId(Number(e.target.value))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã loại: </span>
                            <input type="number" value={category_id} onChange={(e) => setCategoryId(Number(e.target.value))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã nhà xuất bản: </span>
                            <input type="number" value={publisher_id} onChange={(e) => setPublisherId(Number(e.target.value))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã nhà cung cấp: </span>
                            <input type="number" value={provider_id} onChange={(e) => setProviderId(Number(e.target.value))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã ảnh: </span>
                            <input type="text" value={gallery_ids.join(',')} onChange={(e) => setGalleryIds(e.target.value.split(',').map(Number))} />
                        </div>
                        <div className="mt-4 flex gap-4 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã tác giả: </span>
                            <input type="text" value={author_ids.join(',')} onChange={(e) => setAuthorIds(e.target.value.split(',').map(Number))} />
                        </div>
                    </div>
                </div>
                <button className="bg-primary--color text-[#fff] font-bold py-2 px-4 rounded mt-4" onClick={handleRegisterAndAddStaff}>
                    Thêm sách mới
                </button>
                
            </div>
        </div>
    );
};