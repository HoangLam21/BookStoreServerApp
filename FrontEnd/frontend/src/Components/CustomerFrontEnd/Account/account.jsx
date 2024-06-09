import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import imgAccount from "../../Assets/Book store (2).png";
import { AuthContext } from '../../context/AuthContext';
import { CusUserContext } from "../../context/CusUserContext";
import "../Account/account.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from '../../context/OrderContext';
import imgAva from "../../Assets/imageava.png"


const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAccount, setIsAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameS, setUsernameS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [userData, setUserData] = useState(null); 
  const [userOrder, setUserOrder] = useState([]); 
  const [activeTab, setActiveTab] = useState("info"); 
  const { token, id, login, logout } = useContext(AuthContext);
  const { login2, logout2} = useContext(CusUserContext)
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(true); 
  const [birthday, setBirthday] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [userID, setUserID] = useState("");
  const [imgAva, setImgAva] = useState("../../Assets/imageava.png");
  const [fullnameUp, setFullnameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [genderUp, setGenderUp] = useState(true); 
  const [birthdayUp, setBirthdayUp] = useState("");
  const [phonenumberUp, setPhonenumberUp] = useState("");
  const [addressUp, setAddressUp] = useState("");
  const [showUpdateInfo, setShowUpdateInfo] = useState(false); // Add state for showing update form
  const [avatarUp, setAvatarUp] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsUp, setErrorsUp] = useState({});




  const validate = () => {
    const newErrors = {};
    if (!fullname) newErrors.fullname = 'Họ tên là bắt buộc.';
    if (!email) {
      newErrors.email = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!phonenumber) newErrors.phonenumber = 'Số điện thoại là bắt buộc.';
    if (!address) newErrors.address = 'Địa chỉ là bắt buộc.';
    if (!birthday) newErrors.birthday = 'Ngày sinh là bắt buộc.';
    if (!gender) newErrors.gender = 'Giới tính là bắt buộc.';
    return newErrors;
  };



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
    if (token) {
      setIsAccount(true);
      fetchUserInfo(token);
      fetchUserOrders(token);
    }
  }, [token]);

  useEffect(() => {
    if (id) {
      setUserID(id)
      console.log("id",id)
    }
  }, [id]);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://167.172.69.8:8010/BookStore/customer/register", {
        username: usernameS,
        password: passwordS,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.data.code === 200 ) {
        setIsLogin(true);
        setError("");
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  const handleLogin = async () => {
    
    try {
      const response = await axios.post("http://167.172.69.8:8010/BookStore/auth/login", {
        username: username,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 200 && response.data.result.token) {
        login(response.data.result.token, response.data.result.id);
        setUserID(response.data.result.id);
        console.log("resulttrave", response.data.result.id)
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };
//

function extractDate(timestamp) {
  const date = new Date(timestamp);
  // Extract the date part in YYYY-MM-DD format
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



const handleAddInfo = async () => {
  const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const customerInformationRequest = {
        fullname,
        email,
        gender,
        birthday,
        phonenumber,
        address,
      };
    
      const formData = new FormData();
      formData.append('image', selectedFile);
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
        const response = await axios.post(
          `http://167.172.69.8:8010/BookStore/customer/create/info/${id}`,
          formData,config
        );
    
        if (response.data.code === 200) {
          console.log("Tạo thông tin thành công");
          fetchUserInfo(token);  // Fetch and update the user data
          setShowAddInfo(false);
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

  if (isAccount) {
    return (
      <div className="account1">
        {/* Phần hiển thị thông tin cá nhân */}
        <div className="info-order">
        <button 
            className={`account-info bg-white hover:bg-color-main hover:text-white w-52 h-9 border mt-2 border-color-main-2 text-color-main font-garamond text-xl font-light ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => handleTabClick('info')}
          >
            Thông tin cá nhân
          </button>
          <button 
            className={`account-order bg-white hover:bg-color-main hover:text-white w-52 h-9 border mt-2 border-color-main-2 text-color-main font-garamond text-xl font-light ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabClick('orders')}
          >
            Đơn hàng
          </button>        </div>
        {/* Kiểm tra tab active */}
        {activeTab === 'info' ? (
          <div className="account-input-info">
            {/* Kiểm tra đã có dữ liệu người dùng hay không */}
            {userData ? (
              <>
                {/* Kiểm tra xem có hiển thị form cập nhật hay không */}
                {showUpdateInfo ? (
                  <div className="add-info mt-10 overflow-y-auto max-h-screen">
                  <div className="add-info mt-10 overflow-y-auto max-h-screen">
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
        </div>
                  </div>
                ) : (
                  <>
                  <div className="account-img mt-5 flex justify-center items-center">
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
                    <p className="text-color-main text-xl font-garamond h-9 font-light"><i>{userData.fullname}</i></p>
                  </div>
                </div>
                <div className="account-email">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Email</span>
                    <p className="text-color-main text-xl font-garamond h-9 font-light"><i>{userData.email}</i></p>
                  </div>
                </div>
                <div className="account-phone">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Số điện thoại</span>
                    <p className="text-color-main text-xl font-garamond h-9 font-light"><i>{userData.phonenumber}</i></p>
                  </div>
                </div>
                <div className="account-birthday">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Ngày sinh</span>
                    <p className="text-color-main text-xl font-garamond h-9 font-light"><i>{extractDate(userData.birthday)}</i></p>
                  </div>
                </div>
                <div className="account-gender">
                  <div className="input">
                    <span className="text-color-main text-xl font-garamond h-9 font-light">Giới tính</span>
                    <p className="text-color-main text-xl font-garamond h-9 font-light"><i>{userData.gender ? "Nữ" : "Nam"}</i></p>
                  </div>
                </div>
                  </>
                )}
              </>
            ) : (
              <div className="no-info justify-center items-center">
                {/* Hiển thị form thêm thông tin cá nhân nếu chưa có */}
                {showAddInfo ? (
        <div className="add-info mt-10 overflow-y-auto max-h-screen">
        <div>
        
  {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Avatar" className="h-24 w-24" />}
  <input
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    id="avatarInput"
    onChange={handleImageChange}
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
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
                    {errors.fullname && <div className="error text-red text-xl font-garamond">{errors.fullname}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Email:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                    {errors.email && <div className="error text-red text-xl font-garamond">{errors.email}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Số điện thoại:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
                    {errors.phonenumber && <div className="error text-red text-xl font-garamond">{errors.phonenumber}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Địa chỉ:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
                    {errors.address && <div className="error text-red text-xl font-garamond">{errors.address}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Ngày sinh:
            </span>
            <input
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
                    {errors.birthday && <div className="error text-red text-xl font-garamond">{errors.birthday}</div>}

          </div>
          <div className="input">
            <span className="text-color-main text-xl font-garamond h-9 font-light w-full rounded-md pl-1 border-color-main-2">
              Giới tính:
            </span>
            <select
              className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="true">Nữ</option>
              <option value="false">Nam</option>
            </select>
            {errors.gender && <div className="error text-red text-xl font-garamond">{errors.gender}</div>}

          </div>
          <button
            className="account-save bg-color-main hover:bg-white mt-10 hover:text-color-main w-full h-9 border border-color-main-2 text-white font-garamond text-xl font-light"
            onClick={handleAddInfo}
          >
            Lưu
          </button>
        </div>
      ) : (
        <button
          className="account-save mx-auto mt-52 bg-color-main hover:bg-white--color hover:text-color-main w-full h-9 border border-color-main-2 text-white--color font-garamond text-xl font-light"
          onClick={() => setShowAddInfo(true)}
        >
          Thêm thông tin cá nhân
        </button>
      )}
              </div>
            )}
          </div>
        ) : (
          <div className="account-orders overflow-y-auto max-h-screen">
            <h2 className="text-color-main text-xl font-garamond h-9 font-light">Danh sách đơn hàng</h2>
            <ul className="mb-30">
              {userOrder.length > 0 ? (
                userOrder.map((order) => (
                  <li key={order.id}>
                  <div className=" overflow-y-auto max-h-screen mb-5" style={{ border: '1px solid #a89b8f', padding: '10px', borderRadius: '5px', maxHeight: '200px', overflowY: 'auto' }}>
  <p className="text-color-main text-xl font-garamond h-9 font-light">Mã đơn hàng: {order.id}</p>
  <p className="text-color-main text-xl font-garamond h-9 font-light">Ngày đặt hàng: {extractDate(order.createAt)}</p>
  <p className="text-color-main text-xl font-garamond h-9 font-light">Tổng tiền: {(order.total_price).toLocaleString('vi-VN')} vnđ</p>
  <Link className="text-color-main  text-xl font-garamond h-9 font-semibold" to="/orderDetailCus" onClick={() => handleViewDetail(order)}>Xem chi tiết</Link>
</div>
                  </li>
                ))
              ) : (
                <p className="text-color-main text-xl font-garamond h-9 font-light">Không có đơn hàng nào.</p>
              )}
            </ul>
          </div>
        )}
        <div className="btn-logout mx-auto text-center bottom-0 fixed bg-color-main-2 hover:bg-color-main h-9 border text-white--color active font-garamond text-1xl font-light">
          <button onClick={() => { logout();logout2(); setIsAccount(false); }}>Đăng xuất</button>
        </div>
      </div>
    );
    
  }
  

  return (
    <div>
      <div className="login-signup">
        <button
          className={`login bg-white hover:bg-color-main hover:text-white w-52 h-9 border mt-2 border-color-main-2 text-color-main font-garamond text-xl font-light ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={` signup bg-white hover:bg-color-main hover:text-white w-52 h-9 border mt-2 border-color-main-2 text-color-main font-garamond text-xl font-light ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>
      <img className="w-96 mx-auto mt-5" src={imgAccount} alt="" />
      <div className="mt-20">
        {isLogin ? (
          <div>
            <div className="login-input-email mt-20">
              <div className="mt-10">
                <span className="text-color-main text-2xl font-garamond font-light">Username</span>
                <div>
                  <input
                    className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
                    type="text"
                    placeholder="Nhập username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="login-input-pass">
              <div className="input mt-5">
                <span className="text-color-main text-2xl font-garamond font-light">Password</span>
                <div>
                  <input
                    className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
                    type="password"
                    placeholder="Nhập password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="btn-login w-full">
              <button
                className="w-96 mx-auto text-center bottom-0 fixed bg-color-main-2 hover:bg-color-main h-9 border text-white--color active font-garamond text-1xl font-light"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="signup-input-username mt-20">
              <div className="input mt-10">
                <span className="text-color-main text-2xl font-garamond font-light">Username</span>
                <input
                    className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
                    type="text"
                    placeholder="Nhập username"
                    value={usernameS}
                    onChange={(e) => setUsernameS(e.target.value)}
                  />
              </div>
            </div>
            <div className="signup-input-password">
              <div className="input mt-5">
                <span className="text-color-main text-2xl font-garamond font-light">Password</span>
                <input
                    className="text-color-main text-xl font-garamond h-9 font-light border w-full rounded-md pl-1 border-color-main-2"
                    type="password"
                    placeholder="Nhập password"
                    value={passwordS}
                    onChange={(e) => setPasswordS(e.target.value)}
                  />
              </div>
            </div>
            <div className="btn-signup w-full">
              <button 
              onClick={handleSignup}
               className="w-96 mx-auto text-center bottom-0 fixed bg-color-main-2 hover:bg-color-main h-9 border text-white--color active font-garamond text-1xl font-light">
                Đăng ký
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
