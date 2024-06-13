import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { CusUserContext } from "../../context/CusUserContext";
import "../Account/account.css"
import { Link  } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from '../../context/OrderContext';
import noinfo from "../../Assets/noinfo.png"
import noorder from "../../Assets/noorder.png"



const Account = () => {
  const [isAccount, setIsAccount] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null); 
  const [userOrder, setUserOrder] = useState([]); 
  const [activeTab, setActiveTab] = useState("info"); 
  const { token, id, login, logout } = useContext(AuthContext);
  const { login2, logout2} = useContext(CusUserContext)
  
  const [userID, setUserID] = useState("");
  const [fullnameUp, setFullnameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [genderUp, setGenderUp] = useState(true); 
  const [birthdayUp, setBirthdayUp] = useState("");
  const [phonenumberUp, setPhonenumberUp] = useState("");
  const [addressUp, setAddressUp] = useState("");
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [avatarUp, setAvatarUp] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsUp, setErrorsUp] = useState({});




  



  const validateUp = () => {
    const newErrorsUp = {};
    if (!fullnameUp) newErrorsUp.fullnameUp = 'Họ tên là bắt buộc.';
    if (!emailUp) {
      newErrorsUp.emailUp = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(emailUp)) {
      newErrorsUp.emailUp = 'Email không hợp lệ.';
    }
    if (!phonenumberUp) newErrorsUp.phonenumberUp = 'Số điện thoại là bắt buộc.';
    if (!addressUp) newErrorsUp.addressUp = 'Địa chỉ là bắt buộc.';
    if (!birthdayUp) newErrorsUp.birthdayUp = 'Ngày sinh là bắt buộc.';
    if (!genderUp) newErrorsUp.genderUp = 'Giới tính là bắt buộc.';
    return newErrorsUp;
  };

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUp, setSelectedFileUp] = useState(null);





  useEffect(() => {
    console.log(token)
    if (token) {
      setIsAccount(true);
      fetchUserInfo(token);
      fetchUserOrders(token);
    }
    else{
      setIsAccount(false)
    }
  }, [token]);

  useEffect(() => {
    if (id) {
      setUserID(id)
      console.log("id",id)
    }
  }, [id]);

 

function extractDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}






const handleUpdateInfo = async () => {
  const validationErrors = validateUp();
    if (Object.keys(validationErrors).length > 0) {
      setErrorsUp(validationErrors);
    } else {
      const customerInformationRequest = {
        fullname:fullnameUp,
        email:emailUp,
        gender:genderUp,
        birthday:birthdayUp,
        phonenumber:phonenumberUp,
        address:addressUp,
      };
    
      const formData = new FormData();
      formData.append('image', selectedFileUp);
      formData.append('customerInformationRequest',  new Blob([JSON.stringify(customerInformationRequest)], { type: "application/json" }));
      
    
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const config={
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Accept':'application/json'
        }
      }
    
      try {
        const response = await axios.patch(
          `http://167.172.69.8:8010/BookStore/customer/update/info/${id}`,
          formData,config
        );
    
        if (response.data.code === 200) {
          console.log("Update thông tin thành công");
          console.log(response)
          fetchUserInfo(token); 
          setShowUpdateInfo(false);
        } else {
          setError("tao thong tin ko dc. Vui lòng thử lại.");
        }
      } catch (error) {
        if (error.response) {
          console.error('Server responded with a status:', error.response.status);
          console.error('Server response data:', error.response.data);
          setError(`Đăng nhập thất bại. Lỗi: ${error.response.status}`);
        } else {
          console.error('Error message:', error.message);
          setError("Đăng nhập thất bại. Vui lòng thử lại.");
        }
      }
    }
  
};



  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://167.172.69.8:8010/BookStore/customer/myinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        console.log("userInfo",response)
        login2(response.data.result.fullname, response.data.result.avatar)
        setUserData(response.data.result);
        const result=response.data.result
        setAddressUp(result.address);
        setBirthdayUp(result.birthday);
        setEmailUp(result.email);
        setFullnameUp(result.fullname);
        setGenderUp(result.gender);
        setAvatarUp(result.avatar)
        
      } else {
        setError("Không thể lấy thông tin người dùng.");
      }
    } catch (error) {
      setError("Không thể lấy thông tin người dùng.");
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        "http://167.172.69.8:8010/BookStore/customer/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        setUserOrder(response.data.result);
      } else {
        setError("Không thể lấy thông tin đơn hàng.");
      }
    } catch (error) {
      setError("Không thể lấy thông tin đơn hàng.");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { setSelectedOrderData } = useOrder();

  const handleViewDetail = (order) => {
    setSelectedOrderData(order);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
  
  };
  const handleImageChangeUpdate = (e) => {
    const file = e.target.files[0];
    setSelectedFileUp(file);
    
  
  };

  const handleEditClick = () => {
    setShowUpdateInfo(true);
    
  };


  const handleCloseUpdateInfo=()=>{
    setShowUpdateInfo(false)
  }

 

  if (isAccount) {
    return (
      <div className="account1">
        <div className="info-order flex">
  <button
    className={`account-info bg-transparent hover:bg-color-main hover:text-color-main w-52 h-9 border-none mt-2 text-color-main-2 font-garamond text-xl font-light ${activeTab === 'info' ? 'active' : ''}`}
    style={{ borderBottom: activeTab === 'info' ? '2px solid #513820' : 'none', backgroundColor: 'transparent', border: 'none' }}
    onClick={() => handleTabClick('info')}
  >
    Thông tin cá nhân
  </button>
  <button
    className={`account-order bg-transparent hover:bg-color-main hover:text-color-main w-52 h-9 border-none mt-2 text-color-main-2 font-garamond text-xl font-light ${activeTab === 'orders' ? 'active' : ''}`}
    style={{ borderBottom: activeTab === 'orders' ? '2px solid #513820' : 'none', backgroundColor: 'transparent', border: 'none' }}
    onClick={() => handleTabClick('orders')}
  >
    Đơn hàng
  </button>
</div>
        {activeTab === 'info' ? (
          <div className="account-input-info ">
            {userData ? (
              <>
                {showUpdateInfo ? (
                  <div className="add-info mt-10 overflow-y-auto max-h-screen">
                  <div className="add-info mt-10 overflow-y-auto max-h-screen" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div>
        
                     {selectedFileUp && <img src={URL.createObjectURL(selectedFileUp)} alt="Avatar" className="h-24 w-24" />}
                     <input
                       type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatarInput"
                        onChange={handleImageChangeUpdate}
                        />
                    <button className="text-color-main text-xl mb-5 font-garamond" onClick={() => document.getElementById('avatarInput').click()}>
                      Thêm ảnh
                    </button>
                </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Họ tên:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={fullnameUp}
              onChange={(e) => setFullnameUp(e.target.value)}
            />
            {errorsUp.fullnameUp && <div className="error text-red text-xl font-garamond">{errorsUp.fullnameUp}</div>}
          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Email:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="email"
              value={emailUp}
              onChange={(e) => setEmailUp(e.target.value)}
            />
                    {errorsUp.emailUp && <div className="error text-red text-xl font-garamond">{errorsUp.emailUp}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Số điện thoại:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={phonenumberUp}
              onChange={(e) => setPhonenumberUp(e.target.value)}
            />
                    {errorsUp.phonenumberUp && <div className="error text-red text-xl font-garamond">{errorsUp.phonenumberUp}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Địa chỉ:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={addressUp}
              onChange={(e) => setAddressUp(e.target.value)}
            />
                    {errorsUp.addressUp && <div className="error text-red text-xl font-garamond">{errorsUp.addressUp}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Ngày sinh:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="date"
              value={birthdayUp}
              onChange={(e) => setBirthdayUp(e.target.value)}
            />
                    {errorsUp.birthdayUp && <div className="error text-red text-xl font-garamond">{errorsUp.birthdayUp}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Giới tính:
            </span>
            <select
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              value={genderUp}
              onChange={(e) => setGenderUp(e.target.value)}
            >
              <option value="true">Nữ</option>
              <option value="false">Nam</option>
            </select>
            {errorsUp.genderUp && <div className="error text-red text-xl font-garamond">{errorsUp.genderUp}</div>}

          </div>
          <button
            className="account-save bg-color-main hover:bg-white mt-10 hover:text-color-main w-full h-9 border border-color-main-2 text-white font-garamond text-xl font-light"
            onClick={handleUpdateInfo}
          >
            Lưu
          </button>
          <button
            className=" bg-white hover:bg-color-main mt-4 hover:text-white w-full h-9 border border-color-main-2 text-color-main font-garamond text-xl font-light"          
            onClick={handleCloseUpdateInfo}
            >
            Thoát
          </button>
        </div>
                  </div>
                ) : (
                  <>
                  <div className="account-img mt-10 flex justify-center items-center">
                  <div className="avatar-container">
                    <img className="avatar-image" src={`data:image/jpeg;base64,${userData.avatar}`} alt="" />
                  </div>
                </div>
                <div className="account-edit flex">
                  <p className="text-color-main text-xl ml-[30%] mt-3 font-garamond h-9 font-light">Chỉnh sửa thông tin</p>
                  <FontAwesomeIcon className="text-color-main ml-5 mt-3 mb-10 mr-2 text-xl" onClick={handleEditClick} icon={faPen}></FontAwesomeIcon>
                </div>
                <div className="account-fullname">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Họ tên</span>
                    <p className="text-color-main text-2xl font-garamond h-9 font-semibold"><i>{userData.fullname}</i></p>
                  </div>
                </div>
                <div className="account-email mt-3">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Email</span>
                    <p className="text-color-main text-2xl font-garamond h-9 font-semibold"><i>{userData.email}</i></p>
                  </div>
                </div>
                <div className="account-phone mt-3">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Số điện thoại</span>
                    <p className="text-color-main text-2xl font-garamond h-9 font-semibold"><i>{userData.phonenumber}</i></p>
                  </div>
                </div>
                <div className="account-birthday mt-3">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Ngày sinh</span>
                    <p className="text-color-main text-2xl font-garamond h-9 font-semibold"><i>{extractDate(userData.birthday)}</i></p>
                  </div>
                </div>
                <div className="account-gender mt-3">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Giới tính</span>
                    <p className="text-color-main text-2xl font-garamond h-9 font-semibold"><i>{userData.gender ? "Nữ" : "Nam"}</i></p>
                  </div>
                </div>
                  </>
                )}
              </>
            ) : (
              <div className="no-info justify-center items-center">
                
              </div>
            )}
          </div>
        ) : (
          <div className="account-orders mt-10 ">
            <h2 className="text-color-main text-xl font-garamond h-9 font-semibold ">Danh sách đơn hàng đã mua</h2>
            <ul className="mb-30 " style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {userOrder.length > 0 ? (
                userOrder.map((order) => (
                  <li key={order.id}>
                  <div className=" overflow-y-auto max-h-screen mb-5" style={{ border: '1px solid #a89b8f', padding: '10px', borderRadius: '5px', maxHeight: '200px', overflowY: 'auto' }}>
  <p className="text-color-main text-xl font-garamond h-9 font-light">Mã đơn hàng: {order.id}</p>
  <p className="text-color-main text-xl font-garamond h-9 font-light">Ngày đặt hàng: {extractDate(order.createAt)}</p>
  <p className="text-color-main text-xl font-garamond h-9 font-light">Tổng tiền: {(order.total_price).toLocaleString('vi-VN')} vnđ</p>
  <Link className="text-color-main  text-xl font-garamond h-9 font-semibold" to="/orderDetailCus" onClick={() => {handleViewDetail(order)}}>Xem chi tiết</Link>
</div>
                  </li>
                ))
              ) : (
                <div>
          <img className='mt-10' src={noorder} alt='' ></img>
          <div className="flex justify-center ">
          <h1 className="text-color-main text-2xl font-garamond font-light">Giỏ hàng của bạn trống</h1>

          </div>

          </div>              )}
            </ul>
          </div>
        )}
        <div className="btn-logout mx-auto w text-center bottom-0 fixed bg-color-main-2 hover:bg-color-main h-9 border text-white--color active font-garamond text-1xl font-light">
          <button className="  h-9  text-white--color active font-garamond text-xl font-light" onClick={() => { logout();logout2(); setIsAccount(false); }}>Đăng xuất</button>
        </div>
      </div>
    );
    
  }
  
};

export default Account;
