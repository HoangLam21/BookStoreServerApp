import React from 'react';
import { useBook2 } from '../../context/BookContext';


const DetailInfoBook = () => {
  const { selectedBook } = useBook2();

  function extractDate(timestamp) {
    const date = new Date(timestamp);
    // Extract the date part in YYYY-MM-DD format
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="p-5">
      <h1 className="text-color-main font-garamond text-xl font-semibold">{selectedBook.title}</h1>
      
      <h6 className="text-color-main font-garamond text-xl font-semibold mr-6">
        Tác giả: <i className="text-color-main-2">{selectedBook.authors.map(author => author.author_name).join(", ")}</i>
      </h6>
      
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
        Giá: <i className="text-color-main-2">{selectedBook.price}</i>
      </p>
      
      <p className="text-color-main font-garamond text-xl font-semibold mr-6">
        Trích dẫn: <i className="text-color-main-2">{selectedBook.description}</i>
      </p>
    </div>
  );
};

export default DetailInfoBook;
