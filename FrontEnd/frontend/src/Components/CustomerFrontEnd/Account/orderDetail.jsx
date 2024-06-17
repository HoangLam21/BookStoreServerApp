import { useOrder } from '../../../Components/context/OrderContext';
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import "./account.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderDetailCus = () => {
    const { selectedOrder } = useOrder();
    const { token } = useContext(AuthContext);
    const [error, setError] = useState("");

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'chờ xác nhận';
            case 1:
                return 'đã xác nhận';
            case 2:
                return 'đang chuẩn bị hàng';
            case 3:
                return 'đang giao';
            case 4:
                return 'đã thanh toán';
            case 5:
                return 'đã giao';
            default:
                return 'Không rõ trạng thái';
        }
    };

    const handleUpdateInfo = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const response = await axios.delete(
                `http://167.172.69.8:8010/BookStore/order/delete/${selectedOrder.id}`,
                config
            );

            if (response.data.code === 200) {
                toast.success('Hủy đơn hàng thành công!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setError("Tạo thông tin không được. Vui lòng thử lại.");
            }
        } catch (error) {
            if (error.response) {
                setError(`Đăng nhập thất bại. Lỗi: ${error.response.status}`);
            } else {
                setError("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        }
    };

    const generatePDF = () => {
      const doc = new jsPDF();
      const fontSize = 12;
      const fontFamily = 'Times New Roman';
      const fontStyle = 'normal';
      

      doc.setFont(fontFamily, fontStyle);
      doc.setFontSize(18);
      doc.text("Thông tin đơn hàng", 10, 10);

      doc.setFontSize(fontSize);
      doc.text(`ID đơn hàng: ${selectedOrder.id}`, 10, 20);
      doc.text(`Ngày tạo hóa đơn: ${currentDay}`, 10,20)
      doc.text(`Địa chỉ: ${selectedOrder.address}`, 10, 30);
      doc.text(`Giá: ${(selectedOrder.price).toLocaleString('vi-VN')} vnđ`, 10, 40);
      doc.text(`Giảm: ${(selectedOrder.total_dis).toLocaleString('vi-VN')} vnđ`, 10, 50);
      doc.text(`Tổng: ${(selectedOrder.total_price).toLocaleString('vi-VN')} vnđ`, 10, 60);
      doc.text(`Trạng thái đơn hàng: ${getStatusText(selectedOrder.status_trans)}`, 10, 70);

      const columns = ["Tên sản phẩm", "Số lượng", "Giá", "Giảm", "Tổng giá"];
      const rows = selectedOrder.orderDetailResponse.map(item => [
          item.title,
          item.quantity,
          (item.price).toLocaleString('vi-VN'),
          (item.discount).toLocaleString('vi-VN'),
          (item.total_price).toLocaleString('vi-VN')
      ]);

      doc.autoTable({
          startY: 80,
          head: [columns],
          body: rows,
          styles: { font: fontFamily, fontStyle: fontStyle, fontSize: fontSize }
      });

      doc.save(`Order_${selectedOrder.id}.pdf`);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const currentDay=getCurrentDate()
  
    return (
        <div className='ml-[5%]'>
            {selectedOrder && (
                <div>
                    <h2 className='text-color-main font-garamond text-5xl mt-24 font-light'>Thông tin đơn hàng có ID {selectedOrder.id}</h2>
                    <p className='text-color-main font-garamond text-2xl mt-10 font-light'>ID đơn hàng: {selectedOrder.id}</p>
                    <p className='text-color-main font-garamond text-2xl mb-5 font-light'>Địa chỉ: {selectedOrder.address}</p>
                    <p className='text-color-main font-garamond text-xl font-light'>Giá: {(selectedOrder.price).toLocaleString('vi-VN')} vnđ</p>
                    <p className='text-color-main font-garamond text-xl font-light'>Giảm: {(selectedOrder.total_dis).toLocaleString('vi-VN')} vnđ</p>
                    <p className='text-color-main font-garamond text-xl font-light'>Tổng: {(selectedOrder.total_price).toLocaleString('vi-VN')} vnđ</p>

                    <div className='flex'>
                        <p className='text-color-main font-garamond text-xl font-light mt-5'> Trạng thái đơn hàng: {getStatusText(selectedOrder.status_trans)} </p>

                        {selectedOrder.status_trans === 0 && (
                            <Link
                                to="/"
                                onClick={handleUpdateInfo}
                            >
                                <button className=" bg-color-main-2 mt-4 ml-5 hover:bg-color-main w-40 h-9 border border-gray-400 rounded-md text-white active font-garamond text-1xl font-light mr-6">Hủy đơn hàng</button>
                            </Link>
                        )}
                    </div>
                    <p className='text-color-main font-garamond text-xl font-light mt-5'><i>*Lưu ý: chỉ hủy với các hóa đơn chưa được thanh toán và chưa xác nhận hóa đơn thanh toán rồi vui lòng liên hệ nhân viên để hỗ trợ.</i>  </p>

                    <h3 className='text-color-main font-garamond text-3xl mt-10 font-light'>Danh sách sản phẩm:</h3>
                    <table className="table-auto border-collapse w-full mt-5 mb-52">
                        <thead>
                            <tr>
                                <th className="border text-color-main font-garamond text-left py-2 px-4">Tên sản phẩm</th>
                                <th className="border text-color-main font-garamond text-left py-2 px-4">Số lượng</th>
                                <th className="border text-color-main font-garamond text-left py-2 px-4">Giá</th>
                                <th className="border text-color-main font-garamond text-left py-2 px-4">Giảm</th>
                                <th className="border text-color-main font-garamond text-left py-2 px-4">Tổng giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder.orderDetailResponse.map((item, index) => (
                                <tr key={index}>
                                    <td className="border text-color-main font-garamond py-2 px-4">{item.title}</td>
                                    <td className="border text-color-main font-garamond py-2 px-4">{item.quantity}</td>
                                    <td className="border text-color-main font-garamond py-2 px-4">{(item.price).toLocaleString('vi-VN')} vnđ</td>
                                    <td className="border text-color-main font-garamond py-2 px-4">{(item.discount).toLocaleString('vi-VN')} vnđ</td>
                                    <td className="border text-color-main font-garamond py-2 px-4">{(item.total_price).toLocaleString('vi-VN')} vnđ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button onClick={generatePDF} className="bg-color-main-2 mt-4 hover:bg-color-main w-40 h-9 border border-gray-400 rounded-md text-white active font-garamond text-1xl font-light">In hóa đơn</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default OrderDetailCus;
