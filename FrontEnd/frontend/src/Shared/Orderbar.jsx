import React from 'react';
import { orderCustomerData } from "../Data/orderCustomerData";
import { orderStockData } from "../Data/orderStockData";
import { FaArrowRight } from "react-icons/fa6";
import classNames from 'classnames';
import './scrollbar.css';

export default function Orderbar() {
  return (
    <div className='flex flex-col w-80 p-3 gap-4'>
    <div className='flex justify-center items-center border-b border-border--lightcolor'>
        <label className=' text-header--lightcolor text-base'>Danh sách đơn hàng của khách hàng</label>
      </div>

      <div className='flex flex-col flex-1 gap-4 overflow-auto pr-1 '>
        
        <CusOrderList />
      </div>
      <div className='flex justify-center items-center border-b border-border--lightcolor'>
        <label className=' text-header--lightcolor text-base'>Danh sách đơn hàng của khách hàng</label>
      </div>
      <div className='flex flex-col flex-1 gap-4 overflow-auto '>
        <StockOrderList />
      </div>
    </div>
  );
}

const linkClass =
	' font-light hover:bg-backgroud--lightcolor  hover:no-underline active:bg-neutral-600  rounded-sm text-base text-primary--color'

function CusOrderList() {
  // const history = useHistory();

  // const handleClick = (orderId) => {
  //   // Chuyển hướng đến trang hóa đơn với id của hóa đơn được chọn
  //   history.push(`/order/${orderId}`);
  // };

  return (
    <div className='ordercus-list z-9 '>
      {orderCustomerData.map((item) => (
        <div key={item.orderCusId} className={classNames('py-2 text-primary--color text-xs',linkClass)} >
          <div className='flex gap-2 cursor-pointer border border-solid border-border--color rounded-md p-1'>

            <div className='flex justify-center items-center border border-solid  rounded-md w-20'>
              {item.orderCusId}
            </div>

            <div className='flex flex-col '>
              <div className='flex gap-1'>
                <span className='font-medium '>Ngày đặt hàng:</span> {item.orderCusDay}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium '>Trạng thái:</span> {item.orderCusStatus === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium '>Nhân viên tạo:</span> {item.orderCusStaff}
              </div>
            </div>
            <span className='text-xl items-center justify-center flex'><FaArrowRight/></span>
          </div>
        </div>
      ))}
    </div>
  );
}


function StockOrderList() {
  return (
    <div className='orderstock-list'>
      {orderStockData.map((item) => (
        <div key={item.orderStockId} className={classNames('py-2 text-primary--color text-xs',linkClass)}>
          <div className='flex gap-2 cursor-pointer border border-solid border-border--color rounded-md p-1'>

            <div className='flex justify-center items-center border border-red-500 border-solid rounded-md w-20'>
              {item.orderStockId}
            </div>

            <div className='flex flex-col '>
              <div className='flex gap-1'>
                <span className='font-medium '>Ngày đặt hàng:</span> {item.orderStockDay}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium '>Trạng thái:</span> {item.orderStockStatus === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}
              </div>
              <div className='flex gap-1'>
                <span className='font-medium '>Nhân viên tạo:</span> {item.orderStockStaff}
              </div>
            </div>
            <span className='text-xl items-center justify-center flex'><FaArrowRight/></span>
          </div>
        </div>
      ))}
    </div>
  );
}
