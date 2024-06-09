import React from 'react'
import OrderList from './OrderList'
import OrderDetail from './OrderDetail'


export default function Order() {
  return (
    <div className='w-full h-full overflow-hidden'>
      {/* <OrderDetail/> */}
      <OrderList/>
    </div>
  )
}
