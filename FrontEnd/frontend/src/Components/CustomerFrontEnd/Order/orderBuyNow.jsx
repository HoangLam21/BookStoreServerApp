import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../../context/Context";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import { useBook2 } from '../../context/BookContext';

import bgOrder from "../../Assets/www.reallygreatsite.com1.png"
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function OrderBuyNow() {
  const { token } = useContext(AuthContext);
  const { selectedBook, setSelectedBook } = useBook2();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentURL, setPaymentURL] = useState(""); 
  const [detailAdress, setDetailAdress] = useState("");
  const [quantity, setQuantity] =useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("https://vapi.vnappmob.com/api/province")
      .then(response => setProvinces(response.data.results))
      .catch(error => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`)
        .then(response => setDistricts(response.data.results))
        .catch(error => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then(response => setWards(response.data.results))
        .catch(error => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    const selectedProvince = provinces.find(province => province.province_id === selectedProvinceId);
    setSelectedProvince(selectedProvinceId);
    setSelectedProvinceName(selectedProvince.province_name);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const selectedDistrict = districts.find(district => district.district_id === selectedDistrictId);
    setSelectedDistrict(selectedDistrictId);
    setSelectedDistrictName(selectedDistrict.district_name);
  };

  const handleWardChange = (e) => {
    const selectedWardId = e.target.value;
    const selectedWard = wards.find(ward => ward.ward_id === selectedWardId);
    setSelectedWard(selectedWardId);
    setSelectedWardName(selectedWard.ward_name);
  };

  const handleOrder = () => {
    if (!token) {
      alert("Vui lòng đăng nhập để mua hàng.");
      return; 
    }else{
      const order_details = [{
        book_id: selectedBook.id,
        quantity: quantity,
      }];
      
      const fullAddress = `${detailAdress ? detailAdress : ''}`;
  
      const orderData = {
        fullname: fullname,
        order_note: orderNote,
        address: fullAddress,
        phonenumber: phonenumber,
        order_details: order_details // Ensure this is an array
      };
  
      console.log("Order Data: ", orderData);
  
      axios.post("http://167.172.69.8:8010/BookStore/order/add", orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          console.log("Order created successfully:", response.data);
          setOrderId(response.data.result.id);
          if (showPaymentOptions === true) {
            console.log("vo roi")
            payForOrder(response.data.result.id); 
          }
          else{
            navigate("/")
          }
        })
        .catch(error => {
          console.error("Error creating order:", error);
        });
    }
    
  };

  const cartTotal = () => {
    return selectedBook.reduce((total, item) => total + item.total_pay * item.quantity, 0).toLocaleString('vi-VN');
  };

  const payForOrder = (orderId) => {
    // Thực hiện POST request để thanh toán
    axios.post(`http://167.172.69.8:8010/BookStore/payment/payfor?order_id=${orderId}&method=${paymentMethod}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Payment successful:", response);
        // Lấy URL thanh toán từ phản hồi
        const paymentUrl = response.data.result.paymentURL;
        setPaymentURL(paymentUrl); // Lưu URL thanh toán
        // Chuyển hướng người dùng đến trang thanh toán
        window.open(paymentUrl, '_blank');
        navigate("/")
        })
      .catch(error => {
        console.error("Error processing payment:", error);
        // Xử lý lỗi khi thanh toán (nếu cần)
      });
  };

  return (
    <div className="bg-color-background-main">
      <img className="m-auto h-52 max-h-full max-w-full" src={bgOrder} alt="" />

      <div className="grid grid-cols-2 gap-x-3 ">
        <div className="mx-auto">
          <div>
            <h1 className="text-color-main text-3xl font-garamond font-light">Sản phẩm đã chọn</h1>
          </div>
          <div>
            <div className="flex mt-5">
              <div>
              {selectedBook.galleryManage && selectedBook.galleryManage[0] && selectedBook.galleryManage[0].thumbnail ? (
        <img
          className="h-48 w-32"
          src={`data:image/jpeg;base64,${selectedBook.galleryManage[0].thumbnail}`}
          alt={selectedBook.title}
        />
      ) : (
        <div className="img-book-placeholder h-80 w-60 bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}
              </div>
              <div className="ml-5">
                <span className="text-color-main text-3xl font-garamond font-light"><i>{selectedBook.title}</i></span>
                <h6 className="text-color-main-2 text-xl font-garamond font-light">{selectedBook.author}</h6>
                <h5 className="text-color-main mt-3 text-xl font-garamond font-light">{(selectedBook.total_pay).toLocaleString('vi-VN')} vnđ</h5>
                <div className="flex mt-3">
                  <h4 className="text-color-main text-xl font-garamond font-light">Số lượng</h4>
                  <input className="text-color-main text-xl ml-10 font-garamond font-light w-10" type="number" value={quantity} min="0" />
                </div>
              </div>
            </div>
          </div>
          {selectedBook.length === 0 && (
            <h1 className="text-color-main text-2xl font-garamond font-light">Chưa có sản phẩm nào</h1>
          )}
          {selectedBook.length > 0 && (
            <div className="flex justify-end mt-2 mr-5 mb-32">
              <h3 className="text-color-main text-2xl font-garamond font-light">
                Tổng: {(cartTotal()).toLocaleString('vi-VN')} vnđ
              </h3>
            </div>
          )}
        </div>
        <div className="w-5/6 mx-auto">
          <div>
            <span className="text-color-main text-3xl font-garamond font-light">Thông tin đặt hàng</span>
          </div>
          <div className="mt-5">
            <div>
              <div>
                <h3 className="text-color-main text-2xl font-garamond font-light">Họ tên</h3>
                <input className="text-color-main text-xl font-garamond font-light h-9 border w-3/4 rounded-md pl-1 border-color-main-2 " type="text" placeholder="Nhập họ tên" onChange={(e) => setFullname(e.target.value)} />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <h3 className="text-color-main text-2xl font-garamond font-light">Số điện thoại</h3>
                <input className="text-color-main text-xl font-garamond h-9 font-light border w-3/4 rounded-md pl-1 border-color-main-2" type="text" placeholder="Nhập số điện thoại" onChange={(e) => setPhonenumber(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="mt-3 w-3/4">
            <h3 className="text-color-main text-2xl font-garamond font-light">Địa chỉ</h3>
            {/* <div className="grid grid-cols-2 ml-2 gap-x-3">
              <div>
                <div>
                  <h6 className="text-color-main text-xl font-garamond font-semibold">Tỉnh/Thành phố</h6>
                  <select
                    className="text-color-main-2 text-xl font-garamond font-light h-9 border w-full rounded-md pl-1 border-color-main-2"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    <option value="" disabled>Chọn Tỉnh/Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.province_id} value={province.province_id}>
                        {province.province_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <h6 className="text-color-main text-xl font-garamond font-semibold">Quận/Huyện</h6>
                  <select
                    className="text-color-main-2 text-xl font-garamond font-light h-9 border w-full rounded-md pl-1 border-color-main-2"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!districts.length}
                  >
                    <option value="" disabled>Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.district_id} value={district.district_id}>
                        {district.district_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid ml-2 grid-cols-2 gap-x-3">
              <div>
                <h6 className="text-color-main text-xl font-garamond font-semibold">Xã/Phường</h6>
                <select
                  className="text-color-main-2 text-xl font-garamond font-light h-9 border w-full rounded-md pl-1 border-color-main-2"
                  value={selectedWard}
                  onChange={handleWardChange}
                  disabled={!wards.length}
                >
                  <option value="" disabled>Chọn Xã/Phường</option>
                  {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div>
                {/* <h6 className="text-color-main text-xl font-garamond font-semibold">Địa chỉ cụ thể</h6> */}
                <input className="text-color-main-2 text-xl font-garamond font-light h-9 border w-full rounded-md pl-1 border-color-main-2" type="text" placeholder="Nhập địa chỉ" onChange={(e) => setDetailAdress(e.target.value)} />
              </div>
            {/* </div> */}
          </div>
          <div>
            <h3 className="text-color-main text-2xl mt-3 font-garamond font-light">Ghi chú</h3>
            <input className="text-color-main text-xl font-garamond font-light h-9 border w-3/4 rounded-md pl-1 border-color-main-2 " type="text" placeholder="Nhập ghi chú" onChange={(e) => setOrderNote(e.target.value)} />
          </div>
          <div>
            <h3 className="text-color-main mt-3 text-2xl font-garamond font-light">Thanh toán</h3>
            <div className="ml-2">
              <input type="checkbox" name="payOption" />
              <label className="text-color-main text-xl font-garamond font-semibold ml-2">Thanh toán khi nhận hàng</label>
            </div>
            <div className="ml-2">
              <input type="checkbox" name="payOption" onChange={() => setShowPaymentOptions(!showPaymentOptions)} />
              <label className="text-color-main text-xl font-garamond font-semibold ml-2">Thanh toán bằng phương thức chuyển khoản</label>
            </div>
            {showPaymentOptions && (
              <div>
                <h6 className="text-color-main text-xl font-garamond font-semibold mt-3">Phương thức chuyển khoản:</h6>
                <select
                  className="text-color-main-2 text-xl font-garamond font-light h-9 border w-full rounded-md pl-1 border-color-main-2"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Chọn phương thức</option>
                  <option value="1">Mã QA</option>
                  <option value="2">Thẻ nội địa</option>
                  <option value="3">Thẻ visa</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 w-full flex justify-center items-center ">
        <button className="bg-color-main-2 w-80 hover:bg-color-main h-9 border text-white active font-garamond text-1xl font-light"
          onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
}
