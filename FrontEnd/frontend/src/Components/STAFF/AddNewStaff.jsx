import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNewStaff() {
    const [file, setFile] = useState(null);
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState(true);
    const [initiate_time, setInitiate_time] = useState('2024-06-05T00:00');
    const [birthday, setBirthday] = useState('2024-06-05T00:00');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState(0);
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const fileInputRef = useRef(null);

    const url = `http://167.172.69.8:8010/BookStore/staff/create/info/${id}`;
    const REGISTER_URL = `http://167.172.69.8:8010/BookStore/staff/register`;

    const handleRegister = async () => {
        const token = localStorage.getItem('token');
        const registerInfor = {
            username: username,
            password: password
        };
        console.log(registerInfor);

        try {
            const response = await axios.post(REGISTER_URL, registerInfor, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = response.data.result;
            setId(result.id);
            console.log(result.id);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response?.data)
            }
        }
    }

    const handleAddStaff = async () => {
        const token = localStorage.getItem('token');

        const staffInformationRequest = {
            fullname: fullname,
            gender: gender,
            birthday: birthday,
            phonenumber: phonenumber,
            email: email,
            address: address,
            initiate_time: initiate_time,
            salary: salary
        };

        const fd = new FormData();
        fd.append('image', file);
        fd.append('staffInformationRequest', new Blob([JSON.stringify(staffInformationRequest)], { type: "application/json" }));

        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }
        try {
            const response = await axios.post(url, fd, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept': 'application/json'
                }
            });
            console.log('Staff added:', response.data);
            toast.success("Staff added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
        } catch (error) {
            console.error('Error adding staff:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
            toast.dismiss("Staff added failed!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
        }
    };

    const handleRegisterAndAddStaff = () => {
        handleRegister()
        handleAddStaff()
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <div className="mt-2 ml-3 text-base text-primary--color gap-4 p-3 border-b">Thêm nhân viên</div>
            <div className="setting-content flex flex-row w-full h-2/5">
                <div className='w-1/4 h-2/5 mt-3 flex flex-col items-center '>
                    <img
                        src={avatar ? `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
                        alt="avatar"
                        className="rounded-xl"
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <button onClick={handleFileButtonClick} className="border-2  mt-5 text-header--lightcolor font-semibold py-2 px-4 rounded-full">Sửa ảnh</button>
                </div>
                <div className="content-staffinf flex-1 h-2/5 flex flex-col pl-4 w-4 gap-4">
                    <div className='flex w-full gap-4 whitespace-nowrap'>
                        <div className="flex  text-primary--color gap-4">
                            <span className="text-header--lightcolor flex items-center">Tài khoản: </span>
                            <input
                                type="text"
                                className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex  text-primary--color gap-1">
                            <span className="text-header--lightcolor flex items-center">Mật Khẩu: </span>
                            <input
                                type="text"
                                className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex  text-primary--color gap-4">
                        <span className="text-header--lightcolor flex items-center">Họ và tên: </span>
                        <input
                            type="text"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="flex  text-primary--color gap-4">
                        <span className="text-header--lightcolor flex items-center">Giới tính: </span>
                        <select
                            className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                            value={gender}
                            onChange={(e) => setGender(e.target.value === 'true')}
                        >
                            <option value={false}>Nữ</option>
                            <option value={true}>Nam</option>
                        </select>
                    </div>
                    <div className="flex  text-primary--color gap-4">
                        <span className="text-header--lightcolor flex items-center">Ngày sinh: </span>
                        <input
                            type="datetime-local"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="flex  text-primary--color gap-4">
                        <span className="text-header--lightcolor flex items-center">Số điện thoại: </span>
                        <input
                            type="text"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                            value={phonenumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex  text-primary--color gap-4">
                        <span className="text-header--lightcolor flex items-center">Email: </span>
                        <input
                            type="email"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex  text-primary--color gap-4">
                        <div className="w-20 whitespace-nowrap">
                            <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
                        </div>
                        <textarea
                            className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md  -mt-1"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="text-base text-primary--color gap-4 p-3 border-b w-full">Thêm nhân viên</div>
            <div className="content-jobinfor ml-9 flex-1 w-full flex-col pt-2">
                <div className="flex  text-primary--color gap-4 pb-2 gap-4 ">
                    <div className='w-30'>
                        <span className="text-header--lightcolor flex items-center">Chức vụ: </span>
                    </div>
                    <input
                        type="text"
                        className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md  -mt-0"
                        value="Nhân viên"
                        readOnly
                    />
                </div>
                <div className="flex  text-primary--color gap-4 pb-2 gap-4">
                    <div className='w-15'>
                        <span className="text-header--lightcolor flex items-center">Ngày vào làm: </span>
                    </div>
                    <input
                        type="datetime-local"
                        className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md  -mt-0"
                        value={initiate_time}
                        onChange={(e) => setInitiate_time(e.target.value)}
                    />
                </div>
                <div className="flex  text-primary--color gap-4 pb-2 gap-4">
                    <span className="text-header--lightcolor flex items-center">Lương: </span>
                    <input
                        type="number"
                        className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md "
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                    />
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button className="bg-primary--color gap-4 text-[#fff] font-bold py-2 px-4 w-3/5 rounded-lg h-12" onClick={handleRegisterAndAddStaff}>Tạo nhân viên mới</button>
            </div>
        </div>
    );
}
