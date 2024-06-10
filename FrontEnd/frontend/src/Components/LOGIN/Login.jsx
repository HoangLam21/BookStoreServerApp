import React, {useContext, useEffect, useState} from 'react';
import loginAPI from './loginAPI';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import {MyInfoContext} from '../context/MyInfoContext'
const BASE_URL = 'http://167.172.69.8:8010/BookStore/staff/myinfo';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const { login2, logout2} = useContext(MyInfoContext)


  const navigate = useNavigate();
  const {loginContext} = useContext(UserContext);
  
 
  const fetchData =()=>{
      const fetchUserData = async () => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage.
  
        if (!token) {
          console.error('No token found, please log in.');
          return;
        }
  
        try {
          const response = await axios.get(BASE_URL, {
            headers: {
              'Authorization': `Bearer ${token}` // Thêm token vào header của request.
            }
          });
          const result = response.data.result;
          console.log('login2',result.fullname,result.avatar)
          login2(result.fullname,result.avatar)
  
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error);
          if(error.response.data){
            console.error("Error response:", error.response.data)
          }
        }
      };
  
      fetchUserData(); // Gọi hàm fetch dữ liệu khi component được mount.
  
  }

 


  const showSuccessToast = () => {
    toast.success("Đăng nhập thành công!",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
};

  const showErrorToast = () => {
    toast.error("Tài khoản hoặc mật khẩu không chính xác",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingAPI(true);

    let res = await loginAPI(username, password);
    
    if (res && res.result && res.result.token) {
      loginContext(username, res.result.token);

      localStorage.setItem('token', res.result.token);
      localStorage.setItem('username', username);
      let token1 = localStorage.getItem('token');
      console.log(token1, "token 1");
      showSuccessToast();      
      navigate("/admin/Dashboard"); 
      navigate("/admin/Customer"); 
      console.log(res.result.token, "token ben Login cai nay set token");
      fetchData();
      

    } else {
      showErrorToast();
    }
    setLoadingAPI(false);
  };
  let token1 = localStorage.getItem('token');
  console.log(token1, "cai nay la token khi ra khoi");


  return (
    <div className='w-screen h-screen'>
      <ToastContainer />
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed p-4"
         style={{ backgroundImage: 'url("https://i0.wp.com/gclibrary.commons.gc.cuny.edu/wp-content/blogs.dir/1267/files/2022/06/Augustyniak-ill.png?resize=512%2C301&ssl=1")' }}>
      <div className="flex flex-col lg:flex-row w-full max-w-4xl h-auto lg:h-[600px] border-3 border-opacity-30 border-white rounded-3xl backdrop-blur-xl overflow-hidden">
        <div className="lg:flex items-center justify-center w-full lg:w-2/4 bg-opacity-30 backdrop-blur-xl rounded-r-[5%] transition-all duration-300 bg-background--color">
          <div className="relative">
            <img src={require('../Assets/book.png')} className="w-full animate-pulse object-center" alt="sach" />
          </div>
        </div>
        <div className="relative w-full lg:w-3/5 p-6 overflow-hidden flex flex-col items-center">
          <div className="text-white--color text-4xl font-bold my-10">
            <span>Đăng nhập</span>
          </div>
          <LoginForm 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            isShowPassword={isShowPassword} 
            setIsShowPassword={setIsShowPassword}
            handleLogin={handleLogin}
            loadingAPI={loadingAPI} 
          />
        </div>
      </div>
    </div>
    </div>
  );
};

const LoginForm = ({ username, setUsername, password, setPassword, isShowPassword, setIsShowPassword, handleLogin, loadingAPI }) => (
  <form className="w-full flex flex-col items-center transition-all duration-300" onSubmit={handleLogin}>
    <div className="w-full flex flex-col items-start mb-3">
      <label htmlFor="username" className="text-header--lightcolor mb-2 ms-2">Tên người dùng</label>
      <FormInputs 
        type="text" 
        placeholder="Nhập email hoặc số điện thoại" 
        value={username}
        icon="user" 
        onChange={(event) => setUsername(event.target.value)}
      />
    </div>
    <div className="w-full flex flex-col items-start mb-3">
      <label htmlFor="password" className="text-header--lightcolor mb-2 ms-2">Mật khẩu</label>
      <FormInputs 
        type={isShowPassword ? "text" : "password"}
        placeholder="Mật khẩu của bạn" 
        value={password}
        icon="lock" 
        onChange={(event) => setPassword(event.target.value)}
      />
      {/* <i 
        className={`fa-solid ${isShowPassword ? 'fa-eye' : 'fa-eye-slash'}`} 
        onClick={() => setIsShowPassword(!isShowPassword)}></i> */}
    </div>
    <FormOptions />
    <SubmitButton text="Đăng nhập" username={username} password={password} loadingAPI={loadingAPI} />
  </form>
);

const FormInputs = ({ type, placeholder, value, icon, onChange }) => (
  <div className="relative w-full flex items-center mb-4">
    <div className="absolute left-3 flex items-center pointer-events-none">
      <i className={`bx bxs-${icon} text-normal--color`}></i>
    </div>
    <input 
      type={type} 
      className="w-full text-primary--color h-11 pl-10 pr-4 bg-white--color border rounded-lg shadow-lg outline-none hover:bg-border--lightcolor" 
      placeholder={placeholder} 
      value={value}
      onChange={onChange}
      required 
    />
  </div>
);

const FormOptions = () => (
  <div className="flex justify-between w-full text-sm mt-1 ml-5 text-white--color">
    <label className="flex items-center">
      <input type="checkbox" className="mr-2" />
      Ghi nhớ mật khẩu
    </label>
    <a href="#" className="hover:underline me-6">Quên mật khẩu?</a>
  </div>
);

const SubmitButton = ({ text, username, password, loadingAPI }) => (
  <button 
    type="submit"
    className={`w-full h-14 mt-4 flex items-center justify-center gap-2 text-white--color bg-primary--color rounded-lg shadow-lg transition-all duration-300 ${username && password ? "active" : ""} ${loadingAPI ? "opacity-50" : ""}`}
    disabled={!username || !password || loadingAPI}
  >
    {loadingAPI && (
      <i class='bx bx-loader bx-spin'></i>
    )}    
      <span>{text}</span>
  </button>
);


export default Login;