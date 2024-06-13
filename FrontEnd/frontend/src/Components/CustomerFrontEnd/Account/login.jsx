import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import imgAccount from "../../Assets/Book store (2).png";
import { AuthContext } from '../../context/AuthContext';
import bgOrder from "../../Assets/www.reallygreatsite.com1.png";
import "../Account/account.css";
import { useNavigate } from "react-router-dom";
import banner from "../../Assets/background2.png";
import './login.css'
import avaDefault from '../../Assets/imageava.png';
import { CusUserContext } from "../../context/CusUserContext";



const LoginCus = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { token, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [errors, setErrors] = useState({});
  const selectedFile = avaDefault;
  const { login2, logout2} = useContext(CusUserContext)


  

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://167.172.69.8:8010/BookStore/customer/register", {
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.data.code === 200) {
        console.log("responseSignup",response.data);
        await handleAddInfo(response.data.result.id);
        setIsSignup(false);
        setError("");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };



  const handleLogin = async () => {
    try {
      const response = await axios.post("http://167.172.69.8:8010/BookStore/auth/login", {
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 200 && response.data.result.token) {
        login(response.data.result.token, response.data.result.id, response.data.result.username);
        await fetchUserInfo(response.data.result.token);
        navigate("/");
        setError("");
        return response;
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };


  const fetchUserInfo = async (tokenUser) => {
    try {
      const response = await axios.get(
        "http://167.172.69.8:8010/BookStore/customer/myinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );
      if (response.data.code === 200) {
        console.log("userInfo",response)
        login2(response.data.result.fullname, response.data.result.avatar)
        
      } else {
        setError("Không thể lấy thông tin người dùng.");
      }
    } catch (error) {
      setError("Không thể lấy thông tin người dùng.");
    }
  };

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

  const handleAddInfo = async (idUser) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the function if validation errors are present
    }

    const customerInformationRequest = {
      fullname,
      email,
      gender,
      birthday,
      phonenumber,
      address,
    };

    const formData = new FormData();
    const file = await urlToFile(selectedFile, "avatar.png", "image/jpeg");
    formData.append('image', file);
    formData.append('customerInformationRequest', new Blob([JSON.stringify(customerInformationRequest)], { type: "application/json" }));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        'Accept': 'application/json'
      }
    };

    try {
      const response = await axios.post(
        `http://167.172.69.8:8010/BookStore/customer/create/info/${idUser}`,
        formData, config
      );

      if (response.data.code === 200) {
        console.log("Tạo thông tin thành công");
      } else {
        setError("Tạo thông tin không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with a status:', error.response.status);
        console.error('Server response data:', error.response.data);
        setError(`Tạo thông tin không thành công. Lỗi: ${error.response.status}`);
      } else {
        console.error('Error message:', error.message);
        setError("Tạo thông tin không thành công. Vui lòng thử lại.");
      }
    }
  };

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-color-background-main z-50">
      <img className="w-full h-full object-cover" src={banner} alt="Banner" />
      
      <div className="absolute inset-0  flex justify-center items-center">
        <div className="input-main bg-white p-10 pt-5 rounded-md shadow-lg">
          {isSignup ? (

            <div className="signup-inputs">
            <div className="flex flex-col justify-center mt-2 items-center max-h-full max-w-full">
        <span className="text-color-main text-5xl font-garamond font-semibold">{isSignup ? "Đăng ký" : "Đăng nhập"}</span>
      </div>
     
              <div className="mt-2">
                <span className="text-color-main text-xl font-garamond font-light">Username</span>
                <div>
                  <input
                    className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
                    type="text"
                    placeholder="Nhập username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-2">
                <span className="text-color-main text-xl font-garamond font-light">Full Name</span>
                <div>
                <input
              className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
                    {errors.fullname && <div className="error text-red text-xl font-garamond">{errors.fullname}</div>}
                </div>
              </div>
              <div className="mt-2">
                <span className="text-color-main text-xl font-garamond font-light">Email</span>
                <div>
                <input
              className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                                {errors.email && <div className="error text-red text-xl font-garamond">{errors.email}</div>}

                </div>
              </div>
              <div className="mt-2">
                <span className="text-color-main text-xl font-garamond font-light">Phone Number</span>
                <div>
                <input
              className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
                                {errors.phonenumber && <div className="error text-red text-xl font-garamond">{errors.phonenumber}</div>}

                </div>
              </div>
              <div className="flex">
                <div className="mt-2 w-1/2 mr-2">
                  <span className="text-color-main text-xl font-garamond font-light">Gender</span>
                  <div>
                  <select
              className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="true">Nữ</option>
              <option value="false">Nam</option>
            </select>
            {errors.gender && <div className="error text-red text-xl font-garamond">{errors.gender}</div>}
                  </div>
                </div>
                <div className="mt-2 w-1/2 ml-2">
                  <span className="text-color-main text-xl font-garamond font-light">Birthday</span>
                  <div>
                  <input
              className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
                    {errors.birthday && <div className="error text-red text-xl font-garamond">{errors.birthday}</div>}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mt-2 mr-2">
                  <span className="text-color-main text-xl font-garamond font-light">Password</span>
                  <div>
                    <input
                      className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2 ml-2">
                  <span className="text-color-main text-xl font-garamond font-light">Confirm Password</span>
                  <div>
                    <input
                      className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              
              <div className="mt-2">
                <span className="text-color-main text-xl font-garamond font-light">Address</span>
                <div>
                <input
              className="text-color-main text-xl font-garamond h-9 font-semibold border w-full rounded-md pl-1 border-color-main-2"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
                </div>
              </div>
            </div>
          ) : (
            <div>
            <div className="flex flex-col justify-center mt-5 items-center max-h-full max-w-full">
        <span className="text-color-main text-5xl font-garamond font-semibold">{isSignup ? "Đăng ký" : "Đăng nhập"}</span>
      </div>
      <div className="login-input-email">
              <div className="mt-5">
                <span className="text-color-main text-xl font-garamond font-light">Username</span>
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
              <div className="login-input-pass">
                <div className="input mt-5">
                  <span className="text-color-main text-xl font-garamond font-light">Password</span>
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
            </div>
            </div>
            
          )}
          {error && <p className="text-red-500">{error}</p>}
          <div className="btn-login w-full flex justify-center mt-5 border-color-main-2 rounded-md">
            <button
              className="w-full text-center bg-color-main-2 hover:bg-color-main h-9 border text-white active font-garamond text-1xl font-light"
              onClick={isSignup ? handleSignup : handleLogin}
            >
              {isSignup ? "Đăng ký" : "Đăng nhập"}
            </button>
          </div>
          <div className="flex flex-row justify-center mt-5 items-center max-h-full max-w-full">
            <span className="text-color-main text-xl font-garamond font-light">{isSignup ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}</span>
            <button
              className="signup bg-color-background-main hover:text-color-main w-auto ml-3 text-color-main-2 font-garamond text-xl font-light"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Đăng nhập" : "Đăng ký"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginCus;
