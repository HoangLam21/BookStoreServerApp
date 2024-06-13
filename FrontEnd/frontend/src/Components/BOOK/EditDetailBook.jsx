import React, { useState, useEffect } from "react";
import axios from "axios";

const BOOKALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/book/all';

function EditDetailBook({ bookId }) {
  const [book, setBook] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(BOOKALL_URL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = response.data.result;
        const foundBook = result.find(book => book.id === parseInt(bookId, 10));
        setBook(foundBook);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const {
    id,
    title: bookname,
    price,
    authors: author,
    publisher,
    thumbnail: avatar,
    description: address
  } = book;

  const handleUpload = () => {
    if (!file) {
      console.log("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append('file', file);

    axios.patch('')
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-2 ml-3 text-base text-primary--color p-3">Chỉnh sửa thông tin sách</div>
      <div className="ml-4 font-medium w-11/12 text-lg text-primary--color border-b"></div>
      <div className='p-4 w-5/6 gap-10'>
        <div className="setting-content w-full h-2/4">
          <div className='w-1/3 h-2/5 mt-3'>
            <img
              src={avatar ? `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
              alt="avatar"
              className="rounded-xl"
            />
            <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />
            <button onClick={handleUpload} className="border-2 ml-12 mt-5 m-2 text-header--lightcolor font-semibold py-2 px-4 rounded-full">Sửa ảnh</button>
          </div>
          <div className="content-bookinf flex-1 h-2/5 flex flex-col ml-2 w-4">
            <div className="m-2 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Mã sách: </span>
              <input type="text" className="m-2" value={"Book" + id} readOnly />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Tên sách: </span>
              <input type="text" className="m-2" value={bookname} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Giá: </span>
              <input type="text" className="m-2" value={price} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Tác giả: </span>
              <input type="text" className="m-2" value={author.map(a => a.author_name).join(', ')} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Nhà xuất bản: </span>
              <input type="text" className="m-2" value={publisher.publisher_name} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
              <div className="w-20 whitespace-nowrap">
                <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
              </div>
              <textarea
                type="text"
                className="m-2 -mt-1"
                value={address}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDetailBook;
