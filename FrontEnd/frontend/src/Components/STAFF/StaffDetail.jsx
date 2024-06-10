

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OverlayEditStaff from "./overlayStaff";
import AddStaff from "./AddStaff";
import {toast } from 'react-toastify';


const STAFFALL_URL = 'http://167.172.69.8:8010/BookStore/staff/all';

const StaffDetail = () => {


  const { id: staffId } = useParams();
  const [showAddStock, setshowAddStock] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false); // State để điều khiển hiển thị overlay

  const url = `http://167.172.69.8:8010/BookStore/admin/user/delete/${staffId}`;

  const openDialog = () => {
      setshowAddStock(true);
      setOverlayVisible(true); // Hiển thị overlay khi mở dialog
  };

  const closeDialog = () => {
      setshowAddStock(false);
      setOverlayVisible(false); // Ẩn overlay khi đóng dialog
  };


  const handleDeleteStaff = async () => {
    const confirmDelete = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Stock deleted:', response.data);
        toast.success('Stock deleted successfully!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error('Error deleting stock:', error);
        if (error.response?.data) {
          console.error('Error response:', error.response.data);
        }
        toast.error('Error deleting stock. Please try again later.', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
  
    toast.warn(
      <div className='flex flex-col'>
        <p>Bạn có muốn xóa nhân viên này?</p>
        <div className='flex w-full py-4 justify-between'>
          <button onClick={confirmDelete}>Đồng ý</button>
          <button onClick={() => toast.dismiss()}>Thoát</button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
      }
    );
  };
  


  return (
    <div className='w-full h-full relative lg:overflow-hidden overflow-auto flex flex-col gap-8 '>
        <div className='h-3/5 w-full flex flex-col'>
          <div className="flex border-b  border-border--color text-header--lightcolor pl-4 items-center gap-4 ">
              <h4 className='h-8 w-2/6 relative  flex items-start '>Thông tin khách hàng</h4>
              <div className='flex w-full  '>
                  <button
                    onClick={openDialog}
                    className="btn_addworkshift bg-primary--color text-white--color rounded-full mb-2 mr-8 cursor-pointer hover:opacity-70 border 
                                h-10 w-28 text-xs 
                                sm:w-26 sm:text-sm
                                md:w-26 md:text-sm
                                lg:w-32 lg:text-sm"
                    >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={handleDeleteStaff}
                    className="btn_addworkshift bg-primary--color text-white--color rounded-full mb-2 mr-8 cursor-pointer hover:opacity-70 border 
                                h-10 w-28 text-xs 
                                sm:w-26 sm:text-sm
                                md:w-26 md:text-sm
                                lg:w-32 lg:text-sm"
                    >
                    Xóa nhân viên
                  </button>
              </div>
              
          </div>
          <StaffInFor staffId={staffId} />
        </div>
        <div>
          <h4 className='h-20 items-end pb-2 lg:h-8 lg:items-center flex border-b border-t border-border--color text-header--lightcolor lg:pl-4 '>Thông tin làm việc</h4>
          <JobInfor staffId={staffId} />
        </div>
        
        {showAddStock && (
            <AddStaff trigger={setshowAddStock} setTrigger={setshowAddStock}>
                <OverlayEditStaff isOpen={overlayVisible} onClose={closeDialog}>
                  <EditStaffInfor staffId={staffId} />
                </OverlayEditStaff>
            </AddStaff>
        )}
    </div>
  );
};

function StaffInFor({ staffId }) {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(STAFFALL_URL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = response.data.result;
        const foundStaff = result.find(staff => staff.id === parseInt(staffId, 10));
        console.log(foundStaff);
        setStaff(foundStaff);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.data) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    fetchUserData();
  }, [staffId]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  const {
    fullname,
    gender,
    birthday,
    phonenumber,
    avatar,
    address
  } = staff;

  return (
    <div className="setting-content flex lg:flex-row flex-col w-full h-full pl-4 gap-10 justify-center items-center">
      <img 
        src={avatar ? `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
        alt="avatar"
        className="w-2/5 lg:h-3/4 lg:w-2/5 h-2/5 md:w-1/6"
      />


      <div className="content-staffinf flex-1 w-full h-3/4 flex flex-col pt-10">
        <div className="staffinfor flex gap-4 text-primary--color pb-4">
          <span className='text-header--lightcolor whitespace-nowrap'>Họ và tên: </span>
          <div className="staffname">{fullname}</div>
        </div>
        <div className="staffinfor flex gap-4 text-primary--color pb-4">
          <span className='text-header--lightcolor whitespace-nowrap'>Giới tính: </span>
          <div className="staffgender">{gender ? "Nữ" : "Nam"}</div>
        </div>
        <div className="staffinfor flex gap-4 text-primary--color pb-4">
          <span className='text-header--lightcolor whitespace-nowrap'>Ngày sinh: </span>
          <div className="staffdof">{new Date(birthday).toLocaleDateString()}</div>
        </div>
        <div className="staffinfor flex gap-4 text-primary--color pb-4">
          <span className='text-header--lightcolor whitespace-nowrap'>Số điện thoại: </span>
          <div className="staffphonenb">{phonenumber}</div>
        </div>
        <div className="staffinfor flex gap-4 text-primary--color pb-4">
          <span className='w-fit text-header--lightcolor whitespace-nowrap'>Địa chỉ: </span>
          <div className="staffaddress">{address}</div>
        </div>
      </div>
    </div>
  );
}

function JobInfor({ staffId }) {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(STAFFALL_URL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = response.data.result;
        const foundStaff = result.find(staff => staff.id === parseInt(staffId, 10));
        setStaff(foundStaff);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.data) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    fetchUserData();
  }, [staffId]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  const {
    salary,
    id,
    initiate_time,
    address
  } = staff;

  return (
    <div className="z-10 w-full  max-md:max-w-full">
      <div className="content-jobinf flex-1 w-full flex-col pt-4 ">
        <div className="m-1 flex gap-1 text-primary--color">
          <span className="text-header--lightcolor flex items-center">Chức vụ:{" "}</span>
          <div className="m-1">{id === 1 ? "admin" : "Nhân viên"}</div>
        </div>
        <div className="m-1 flex gap-1 text-primary--color">
          <span className="text-header--lightcolor flex items-center">Ngày vào làm:{" "}</span>
          <div className="m-1">{new Date(initiate_time).toLocaleDateString()}</div>
        </div>
        <div className="m-1 flex gap-1 text-primary--color">
          <span className="text-header--lightcolor flex items-center">Lương:{" "}</span>
          <div className="m-1">{salary}</div>
        </div>
        
      </div>
    </div>
  );
}


function EditStaffInfor({ staffId }) {
  const [staff, setStaff] = useState(null);
  const [file, setFile] = useState(null);

  const [staff_fullname, setStaffFullname] = useState('');
  const [staff_gender, setStaffGender] = useState(true);
  const [staff_initiate_time, setStaffInitiateTime] = useState('2024-06-05T00:00');
  const [staff_birthday, setStaffBirthday] = useState('2024-06-05T00:00');
  const [staff_phonenumber, setStaffPhoneNumber] = useState('');
  const [staff_email, setStaffEmail] = useState('');
  const [staff_address, setStaffAddress] = useState('');
  const [staff_salary, setStaffSalary] = useState(0);
  const [staff_avatar, setStaffAvatar] = useState('');

  const fileInputRef = useRef(null);

  const url = `http://167.172.69.8:8010/BookStore/staff/update/info/${staffId}`;
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(STAFFALL_URL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = response.data.result;
        const foundStaff = result.find(staff => staff.id === parseInt(staffId, 10));
        console.log(foundStaff);
        setStaff(foundStaff);
        setStaffFullname(foundStaff.fullname);
        setStaffGender(foundStaff.gender);
        setStaffInitiateTime(foundStaff.initiate_time);
        setStaffBirthday(foundStaff.birthday);
        setStaffPhoneNumber(foundStaff.phonenumber);
        setStaffEmail(foundStaff.email);
        setStaffAddress(foundStaff.address);
        setStaffSalary(foundStaff.salary);
        setStaffAvatar(foundStaff.avatar);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.data) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    fetchUserData();
  }, [staffId]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  const handleEditStaff = async () => {
    const token = localStorage.getItem('token');

    const staffInformationRequest = {
      fullname: staff_fullname,
      gender: staff_gender,
      birthday: staff_birthday,
      phonenumber: staff_phonenumber,
      email: staff_email,
      address: staff_address,
      initiate_time: staff_initiate_time,
      salary: staff_salary
    };

    const fd = new FormData();
    fd.append('image', file);
    fd.append('staffInformationRequest', new Blob([JSON.stringify(staffInformationRequest)], { type: "application/json" }));

    for (let [key, value] of fd.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.patch(url, fd, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Accept': 'application/json'
        }
      });
      console.log('Staff updated:', response.data);
      // Clear the form after successful submission
    } catch (error) {
      console.error('Error updating staff:', error);
      if (error.response?.data) {
        console.error("Error response:", error.response.data);
      }
    }
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
        setStaffAvatar(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-2 ml-3 text-base text-primary--color p-3 border-b">Chỉnh sửa thông tin nhân viên</div>

      <div className='p-4 w-5/6 flex flex-col gap-10'>
        <div className="setting-content flex flex-row w-full h-2/4 gap-10">
          <div className='w-1/3 h-2/5 mt-3'>
            <img
              src={staff_avatar ?  `data:image/jpeg;base64,${staff_avatar}` : 'https://via.placeholder.com/150'}
              alt="avatar"
              className="rounded-xl"
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={handleFileButtonClick} className="border-2 ml-12 mt-5 m-1 text-header--lightcolor font-semibold py-2 px-4 rounded-full">Sửa ảnh</button>
          </div>
          <div className="content-staffinf flex-1 h-2/5 flex flex-col ml-2 w-4 ">
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Mã nhân viên: </span>
              <input type="text" className="m-1" value={"NV" + staff.id} readOnly />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Họ và tên: </span>
              <input type="text" className="m-1" value={staff_fullname} onChange={(e) => setStaffFullname(e.target.value)} />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Email: </span>
              <input type="text" className="m-1" value={staff_email} onChange={(e) => setStaffEmail(e.target.value)} />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Giới tính: </span>
              <select className="m-1" value={staff_gender ? 'true' : 'false'} onChange={(e) => setStaffGender(e.target.value === 'true')}>
                <option value="false">Nữ</option>
                <option value="true">Nam</option>
              </select>
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Ngày sinh: </span>
              <input type="text" className="m-1" value={staff_birthday} onChange={(e) => setStaffBirthday(e.target.value)} />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Số điện thoại: </span>
              <input type="text" className="m-1" value={staff_phonenumber} onChange={(e) => setStaffPhoneNumber(e.target.value)} />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <div className="w-20 whitespace-nowrap">
                <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
              </div>
              <textarea
                type="text"
                className="m-1 -mt-1"
                value={staff_address}
                onChange={(e) => setStaffAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
      
      </div>
      <div className="z-10 w-full mt-2 max-md:max-w-full h-2/5">
          <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
          <div className="text-base text-primary--color p-3">Chỉnh sửa thông tin làm việc</div>
          <div className="font-medium text-lg text-primary--color border-b w-full"></div>

          <div className="content-jobinfor ml-9 flex-1 w-full flex-col pt-2">
            <div className="m-1 flex gap-1 text-primary--color">
              <div className='w-30'>
                <span className="text-header--lightcolor flex items-center">Chức vụ: </span>
              </div>
              <input type="text" className="m-1 -mt-0" value="Nhân viên" readOnly />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <div className='w-15'>
                <span className="text-header--lightcolor flex items-center">Ngày vào làm: </span>
              </div>
              <input type="text" className="m-1 -mt-0" value={staff_initiate_time} onChange={(e) => setStaffInitiateTime(e.target.value)} />
            </div>
            <div className="m-1 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Lương: </span>
              <input type="text" className="m-1" value={staff_salary} onChange={(e) => setStaffSalary(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='w-full h-12 flex items-center justify-center'>
            <button className="bg-primary--color m-1 w-3/6 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleEditStaff}>
            Chỉnh sửa
          </button>
        </div>
      
    </div>
  );
}



export default StaffDetail;