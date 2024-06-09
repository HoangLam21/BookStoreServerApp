

import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewStaff() {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
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

    const url = `http://167.172.69.8:8010/BookStore/staff/create/info/${20}`;

    async function handleUpload() {
        if (!file) {
            setMsg("No file selected");
            return;
        }

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('image', file);

        setMsg("Uploading...");
        setProgress({ ...progress, started: true });

        try {
            const responseImage = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const avatar = responseImage.data.avatar; // You might need to adjust this based on your backend response

            const staffInformationRequest = {
                fullname: fullname,
                gender: gender,
                birthday: birthday,
                phonenumber: phonenumber,
                email: email,
                address: address,
                initiate_time: initiate_time,
                salary: salary,
                avatar: avatar
            };

            await axios.post(url, staffInformationRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setMsg("Upload successful");
        } catch (error) {
            setMsg("Upload failed");
            console.error('Error response:', error.response);
            console.error('Error message:', error.message);
        }
    }

    const handleAddOrder = async () => {
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
        fd.append('staffInformationRequest', JSON.stringify(staffInformationRequest));
        for (let [key, value] of fd.entries()) {
            console.log(key, value);
        }
        try {
          const response = await axios.post(url, fd, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            }
          });
          console.log('Staff added:', response.data);
          // Clear the cart after successful submission
        } catch (error) {
          console.error('Error adding staff:', error);
          if (error.response?.data) {
            console.error("Error response:", error.response.data);
          }
        }
      };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mt-2 ml-3 text-base text-primary--color p-3">Chỉnh sửa thông tin nhân viên</div>
            <div className="ml-4 font-medium w-11/12 text-lg text-primary--color border-b"></div>

            <div className='p-4 w-5/6 flex flex-col gap-10'>
                <div className="setting-content flex flex-row w-full h-2/5">
                    <div className='w-1/3 h-2/5 mt-3'>
                        <img
                            src={avatar ? `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
                            alt="avatar"
                            className="rounded-xl"
                        />
                        <label className="border-2 mt-20 m-2 text-header--lightcolor font-semibold py-2 px-4 rounded-full cursor-pointer">
                            Sửa ảnh
                            <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="content-staffinf flex-1 h-2/5 flex flex-col ml-2 w-4">
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Mã nhân viên: </span>
                            <input type="text" className="m-2" value={"NV" + id} readOnly />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Họ và tên: </span>
                            <input type="text" className="m-2" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Giới tính: </span>
                            <select className="m-2" value={gender} onChange={(e) => setGender(e.target.value === 'true')}>
                                <option value={true}>Nữ</option>
                                <option value={false}>Nam</option>
                            </select>
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Ngày sinh: </span>
                            <input type="datetime-local" className="m-2" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Số điện thoại: </span>
                            <input type="text" className="m-2" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Email: </span>
                            <input type="email" className="m-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <div className="w-20 whitespace-nowrap">
                                <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
                            </div>
                            <textarea className="m-2 -mt-1" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="z-10 w-full mt-2 max-md:max-w-full h-1/4">
                    <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
                    <div className="text-base text-primary--color p-3">Chỉnh sửa thông tin làm việc</div>
                    <div className="font-medium text-lg text-primary--color border-b w-full"></div>

                    <div className="content-jobinfor ml-9 flex-1 w-full flex-col pt-2">
                        <div className="m-2 flex gap-1 text-primary--color">
                            <div className='w-30'>
                                <span className="text-header--lightcolor flex items-center">Chức vụ: </span>
                            </div>
                            <input type="text" className="m-2 -mt-0" value="Nhân viên" readOnly />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <div className='w-15'>
                                <span className="text-header--lightcolor flex items-center">Ngày vào làm: </span>
                            </div>
                            <input type="datetime-local" className="m-2 -mt-0" value={initiate_time} onChange={(e) => setInitiate_time(e.target.value)} />
                        </div>
                        <div className="m-2 flex gap-1 text-primary--color">
                            <span className="text-header--lightcolor flex items-center">Lương: </span>
                            <input type="number" className="m-2" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded h-12" onClick={handleUpload}>Tạo nhân viên mới</button>
                <div className="w-full h-6 flex items-center justify-center text-primary--color">{msg}</div>
            </div>
        </div>
    );
}
