import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OverlayEditStaff from "./overlayStaff";
import AddStaff from "./AddStaff";

const STAFFALL_URL = 'http://167.172.69.8:8010/BookStore/staff/all';

const StaffDetail = () => {
  const { id: staffId } = useParams();
  const [showAddStock, setshowAddStock] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false); // State để điều khiển hiển thị overlay


  const openDialog = () => {
      setshowAddStock(true);
      setOverlayVisible(true); // Hiển thị overlay khi mở dialog
  };

  const closeDialog = () => {
      setshowAddStock(false);
      setOverlayVisible(false); // Ẩn overlay khi đóng dialog
  };
  return (
    <div className='w-full h-full relative lg:overflow-hidden overflow-auto flex flex-col gap-8 '>
        <div className='h-3/5 w-full flex flex-col'>
          <div className="flex border-b  border-border--color text-header--lightcolor pl-4 items-center justify-between ">
              <h4 className='h-8 relative  flex items-start '>Thông tin khách hàng</h4>
              <button
                onClick={openDialog}
                className="btn_addworkshift bg-primary--color text-white--color rounded-full mb-2 mr-8 cursor-pointer hover:opacity-70 border 
                            h-10 w-28 text-xs 
                            sm:w-26 sm:text-sm
                            md:w-26 md:text-sm
                            lg:w-32 lg:text-sm"
                >
                Thêm nhân viên
              </button>
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
        <div className="m-2 flex gap-1 text-primary--color">
          <span className="text-header--lightcolor flex items-center">Chức vụ:{" "}</span>
          <div className="m-2">{id === 1 ? "admin" : "Nhân viên"}</div>
        </div>
        <div className="m-2 flex gap-1 text-primary--color">
          <span className="text-header--lightcolor flex items-center">Ngày vào làm:{" "}</span>
          <div className="m-2">{new Date(initiate_time).toLocaleDateString()}</div>
        </div>
        <div className="m-2 flex gap-1 text-primary--color">
          <span className="text-header--lightcolor flex items-center">Lương:{" "}</span>
          <div className="m-2">{salary}</div>
        </div>
        
      </div>
    </div>
  );
}


function EditStaffInfor({ staffId }) {
  const [staff, setStaff] = useState(null);
  const [file, setFile] = useState(null);

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
    id,
    fullname,
    gender,
    initiate_time,
    birthday,
    phonenumber,
    avatar,
    address,
    salary
  } = staff;

  function handleUpload(){
    if(!file){
      console.log("no file selected")
      return;
    }
    const fd = new FormData();
    fd.append('file',file);

    axios.patch('')
  }

  return (
    <div className="w-full h-full flex flex-col">
    {/* Drawer content */}
  <div className=" mt-2 ml-3 text-base text-primary--color p-3">Chỉnh sửa thông tin nhân viên</div>
  <div className=" ml-4 font-medium w-11/12 text-lg text-primary--color border-b"></div>
          
  <div className='p-4 w-5/6 flex flex-col gap-10'>
    <div className="setting-content flex flex-row w-full h-2/4">
      <div className=' w-1/3 h-2/5 mt-3'>
        <img
              src={avatar ? `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
              alt="avatar"
              className="rounded-xl"
          />
        <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" >
            
        </input>    
        <button onClick={handleUpload} className=" border-2 ml-12 mt-5 m-2 text-header--lightcolor font-semibold py-2 px-4 rounded-full">Sửa ảnh</button>            
      </div>
      <div className="content-staffinf flex-1 h-2/5 flex flex-col ml-2 w-4 ">
            <div className="m-2 flex gap-1 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Mã nhân viên: </span>
                <input type="text" className="m-2" value={"NV"+ id} readOnly />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Họ và tên: </span>
                <input type="text" className="m-2" value={fullname} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
              <span className="text-header--lightcolor flex items-center">Giới tính: </span>
              <select className="m-2">
                <option value={1}>Nữ</option>
                <option value={0}>Nam</option>
              </select>
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Ngày sinh: </span>
                <input type="text" className="m-2" value={new Date(birthday).toLocaleDateString()} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
                <span className="text-header--lightcolor flex items-center">Số điện thoại: </span>
                <input type="text" className="m-2" value={phonenumber} />
            </div>
            <div className="m-2 flex gap-1 text-primary--color">
                <div className="w-20 whitespace-nowrap">
                    <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
                </div>
                <textarea
                    type="text"
                    className="m-2 -mt-1"
                    value={address}
                />
            </div>
        </div>
      </div>
      {/* JobInforEdit */}
      <div className="z-10 w-full mt-2 max-md:max-w-full h-2/5">
            <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
            <div className=" text-base text-primary--color p-3">Chỉnh sửa thông tin làm việc</div>
            <div className="font-medium text-lg text-primary--color border-b w-full"></div>
            
            <div className="content-jobinfor ml-9 flex-1 w-full flex-col pt-2">
                <div className="m-2 flex gap-1 text-primary--color">
                  <div className='w-30'>
                    <span className="text-header--lightcolor flex items-center">Chức vụ: </span>
                  </div>  
                    <input type="text" className="m-2 -mt-0" value="Nhân viên" />
                </div>
                <div className="m-2 flex gap-1 text-primary--color">
                  <div className='w-15'>
                    <span className="text-header--lightcolor flex items-center">Ngày vào làm: </span>
                  </div>  
                    <input type="text" className="m-2 -mt-0" value={new Date(initiate_time).toLocaleDateString()} />
                </div>
                <div className="m-2 flex gap-1 text-primary--color">
                    <span className="text-header--lightcolor flex items-center">Lương: </span>
                    <input type="text" className="m-2" value={salary} />
                </div>
            </div>
      </div> 
    </div>
      <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" >
        Close Editing
      </button>
  </div>
  );
}

export default StaffDetail;
