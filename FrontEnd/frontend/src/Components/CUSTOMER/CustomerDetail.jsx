// import React from 'react'
// import CustomerInfor from './CustomerInfor'
// import CusHistoryOrder from './CustomerHistoryOrder'


// export default function CustomerDetail() {


//   return (
//     <div className='w-full h-full relative lg:overflow-hidden overflow-auto'>
//       <h4 className='h-8 relative -top-1 flex items-start border-b border-border--color text-header--lightcolor pl-4'>Thông tin khách hàng</h4>
//       <div className='h-3/5 w-full '>
//       <CustomerInfor />
//       </div>
//       <h4 className='h-20 items-end pb-2 lg:h-8 lg:items-center flex border-b border-t border-border--color text-header--lightcolor lg:pl-4 '>Lịch sử mua hàng</h4>
//       <CusHistoryOrder />
//     </div>
//   )
// }

import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerInfor from './CustomerInfor';
import CusHistoryOrder from './CustomerHistoryOrder';

const CustomerDetail = () => {
  const { id: customerId } = useParams();

  return (
    <div className='w-full h-full relative lg:overflow-hidden overflow-auto'>
      <h4 className='h-8 relative -top-1 flex items-start border-b border-border--color text-header--lightcolor pl-4'>Thông tin khách hàng</h4>
      <div className='h-3/5 w-full '>
        <CustomerInfor customerId={customerId} />
      </div>
      <h4 className='h-20 items-end pb-2 lg:h-8 lg:items-center flex border-b border-t border-border--color text-header--lightcolor lg:pl-4 '>Lịch sử mua hàng</h4>
      <CusHistoryOrder customerId={customerId} />
    </div>
  );
};

export default CustomerDetail;
