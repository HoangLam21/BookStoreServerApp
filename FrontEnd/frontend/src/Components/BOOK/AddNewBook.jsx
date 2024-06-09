import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewBook() {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [avatar, setAvatar] = useState('');
    const [id, setId] = useState('');
    const [bookname, setBookName] = useState('');
    const [price, setPrice] = useState(0);
    const [author, setAuthor] = useState(0);
    const [publisher, setPublisher] = useState(0);
    const [address, setAddress] = useState('');

    const url = `https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/create/info/${20}`;

    async function handleUpload() {
        if (!file) {
            setMsg("No file selected");
            return;
        }

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('image', file);

        setMsg("Uploading...");
        setProgress({ ...progress, started: true });

        try {
            const responseImage = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const avatar = responseImage.data.avatar; // You might need to adjust this based on your backend response

            const bookInformationRequest = {
                avatar: avatar,
                bookname: bookname,
                price: price,
                author: author,
                publisher: publisher,
                address: address
            };

            await axios.post(url, bookInformationRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setMsg("Upload successful");
        } catch (error) {
            setMsg("Upload failed");
            console.error('Error response:', error.response);
            console.error('Error message:', error.message);
        }
    }

    const handleAddOrder = async () => {
        const token = localStorage.getItem('token');

        const bookInformationRequest = {
            avatar: avatar,
            bookname: bookname,
            price: price,
            author: author,
            publisher: publisher,
            address: address
        };

        const fd = new FormData();
        fd.append('image', file);
        fd.append('bookInformationRequest', JSON.stringify(bookInformationRequest));
        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }
        try {
          const response = await axios.post(url, fd, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            }
          });
          console.log('Book added:', response.data);
          // Clear the cart after successful submission
        } catch (error) {
          console.error('Error adding staff:', error);
          if (error.response?.data) {
            console.error("Error response:", error.response.data);
          }
        }
      };

    return (
        <div className="w-full h-full">
            <div className="text-base text-primary--color p-3 mt-4">Chỉnh sửa thông tin sách</div>

            <div className='p-4 w-5/6 flex flex-col items-center'>
                <div className="setting-content w-full h-2/5 ">
                    <div className='w-1/3 h-2/5 mt-3 flex flex-col items-center'>
                        <img
                            src={avatar ? `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
                            alt="avatar"
                            className="rounded-xl"
                        />
                        <label className="border-2 mt-5 m-2 text-header--lightcolor font-semibold py-2 px-4 rounded-full cursor-pointer">
                            Sửa ảnh
                            <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="content-bookinf flex-1 w-full flex flex-col items-start pt-2 ml-9">
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã sách: </span>
                            <input type="text" className="m-2" value={"Book" + id} readOnly />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Tên sách: </span>
                            <input type="text" className="m-2" value={bookname} onChange={(e) => setBookName(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Giá: </span>
                            <input type="datetime-local" className="m-2" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Tác giả: </span>
                            <input type="text" className="m-2" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Nhà xuất bản: </span>
                            <input type="email" className="m-2" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                        </div>
                        <div className="m-2 mt-4 flex gap-1 text-primary--color">
                            <div className="w-20 whitespace-nowrap">
                                <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
                            </div>
                            <textarea className="m-2 -mt-1" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </div>
                <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleUpload}>Thêm sách mới</button>
                <div className="w-full h-6 flex items-center justify-center text-primary--color">{msg}</div>
            </div>
        </div>
    );
}
