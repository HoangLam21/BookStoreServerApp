import React from 'react'

const staffinfdisplay = 'staffinfor flex gap-4 text-primary--color pb-4 '
export default function SettingBody({ user }) {
  return (
    <div className="setting-content flex sm:flex-row sm:w-full h-full pl-4 gap-10 justify-center items-center flex-col">
      {/* Nếu không có avatar từ API, bạn có thể dùng một hình ảnh mặc định */}
      <div className='w-2/4 h-full flex items-center justify-center'>
        <img 
          src={`data:image/jpeg;base64,${user.avatar}` || 'https://via.placeholder.com/150'} 
          alt="avatar" 
          className='sm:w-fit sm:h-fit h-60 w-60 sm:mt-0' 
        />
      </div>
     
      <div className="content-staffinf flex-1 w-full h-3/4 flex flex-col pt-10 whitespace-nowrap">
        <div className="staffinfor flex gap-4 text-primary--color pb-4">
          <span className='text-header--lightcolor'>Mã nhân viên: </span>
          <div className="staffnumber">{user.id}</div> {/* Hiển thị mã nhân viên */}
        </div>
        <div className={staffinfdisplay}>
          <span className='text-header--lightcolor'>Họ và tên: </span>
          <div className="staffname">{user.fullname}</div> {/* Hiển thị tên */}
        </div>
        <div className={staffinfdisplay}>
          <span className='text-header--lightcolor'>Giới tính: </span>
          <div className="staffgender">{user.gender || 'N/A'}</div> {/* Hiển thị giới tính nếu có */}
        </div>
        <div className={staffinfdisplay}>
          <span className='text-header--lightcolor'>Ngày sinh: </span>
          <div className="staffdof">{new Date(user.birthday).toLocaleDateString('vi-VN') || 'N/A'}</div> {/* Hiển thị ngày sinh nếu có */}
        </div>
        <div className={staffinfdisplay}>
          <span className='text-header--lightcolor'>Số điện thoại: </span>
          <div className="staffphonenb">{user.phonenumber}</div> {/* Hiển thị số điện thoại */}
        </div>
        <div className={staffinfdisplay}>
          <span className='w-fit text-header--lightcolor'>Địa chỉ: </span>
          <div className="staffaddress whitespace-pre-wrap">
            {user.address ? `${user.address}` : 'N/A'}
          </div> {/* Hiển thị địa chỉ nếu có */}
        </div>
      </div>
    </div>
  );
}