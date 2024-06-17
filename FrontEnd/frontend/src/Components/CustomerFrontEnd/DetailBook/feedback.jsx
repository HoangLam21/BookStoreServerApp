import React, { useState, useContext, useEffect } from "react";
import { useBook2 } from '../../context/BookContext';
import Rating from './rating';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import { CusUserContext } from "../../context/CusUserContext";

const Feedback = () => {
  const { selectedBook } = useBook2();
  const { token, id } = useContext(AuthContext);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [error, setError] = useState("");
  const { fullname, avatar } = useContext(CusUserContext);
  const [isMyBook, setIsMyBook] = useState(false);
  const [allMyBooks, setAllMyBooks] = useState([]);

  useEffect(() => {
    const fetchAllMyBooks = async () => {
      try {
        const response = await axios.get("http://167.172.69.8:8010/BookStore/customer/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.code === 200) {
          setAllMyBooks(response.data.result);
          setIsMyBook(response.data.result.some(book => book.id === selectedBook.id));
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchAllMyBooks();
  }, [selectedBook, token]);

  const handleFeedbackSubmit = async () => {
    try {
      const newFeedback = {
        fullname: fullname,
        avatar: avatar,
        feedback_comment: feedbackComment,
        rating: feedbackRating,
      };

      selectedBook.feedback.push(newFeedback);

      setFeedbackComment('');
      setFeedbackRating(0);

      const response = await axios.post("http://167.172.69.8:8010/BookStore/feedback/add", {
        book_id: selectedBook.id,
        feedback_comment: feedbackComment,
        rating: feedbackRating,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code !== 200) {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-5 overflow-y-auto max-h-screen">
      {selectedBook ? (
        <>
          <h1 className="text-color-main font-garamond text-xl font-semibold">{selectedBook.title}</h1>
          {selectedBook.feedback && selectedBook.feedback.length > 0 ? (
            <div>
              <h2 className="text-color-main font-garamond text-lg font-semibold mt-3">Danh sách đánh giá:</h2>
              <ul className="list-disc ml-5 mt-5">
                {selectedBook.feedback.map((feedback, index) => (
                  <div key={index} className="flex mb-4">
                    <img className="w-12 h-12 rounded-full" src={`data:image/jpeg;base64,${feedback.avatar}`} alt="" />
                    <div className="ml-4">
                      <p className="text-color-main font-garamond  text-xl">{feedback.fullname}</p>
                      <Rating value={feedback.rating} />
                      <p className="text-color-main font-garamond text-light text-xl">{feedback.feedback_comment}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-color-main font-garamond text-lg mt-3">Chưa có đánh giá nào cho cuốn sách này.</p>
          )}

          {isMyBook && (
            <div className="mt-6 fixed right-16 bottom-0">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-color-main font-garamond text-lg font-semibold">Gửi đánh giá của bạn:</h2>
                {!token ? (
                  <p className="text-color-main font-garamond text-lg mt-3">Bạn phải đăng nhập để gửi phản hồi.</p>
                ) : (
                  <div className="mt-4 ">
                    <div className="mb-4">
                      <label className="block text-color-main font-garamond text-lg">Phản hồi:</label>
                      <div className="flex">
                        <textarea
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                          className="w-60 h-10  border border-color-main-2 rounded"
                          rows="4"
                        ></textarea>
                        <button
                          type="submit"
                          className="bg-color-main-2 ml-5 text-white px-4 py-2 rounded"
                          onClick={handleFeedbackSubmit}
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-color-main font-garamond text-lg">Đánh giá:</label>
                      <select
                        value={feedbackRating}
                        onChange={(e) => setFeedbackRating(Number(e.target.value))}
                        className="w-80 p-2 border text-color-main font-garamond border-color-main-2 rounded"
                      >
                        <option value={0} className="text-color-main font-garamond text-lg">Chọn số sao</option>
                        <option value={1}>★</option>
                        <option value={2}>★★</option>
                        <option value={3}>★★★</option>
                        <option value={4}>★★★★</option>
                        <option value={5}>★★★★★</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Feedback;
