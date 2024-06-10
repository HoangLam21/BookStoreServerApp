
import React from 'react';
import { customerData, productData } from './customer_product'
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ChartDashboard from './ChartDashboard'
import BookItem from './BookItem'
import CustomerVIP from './CustomerVIP'


export default function Maincontent() {
  return (
    <div className='h-full w-full flex flex-col gap-4 px-2 overflow-y-auto lg:overflow-hidden'>
      <div className='h-full w-full lg:w-full lg:h-full md:w-full  sm:w-[85%] bg-backgrond--color rounded-lg relative'>
        <ChartDashboard/>
      </div>
      <div className='flex sm:h-2/5 sm:w-full gap-4 sm:flex-row flex-col  h-full '>
        <div className='sm:flex-1 sm:overflow-hidden lg:h-96 h-72'>

        <BookItem/>
        </div>
        <div className='sm:flex-1 lg:h-96 h-72 '>
        <CustomerVIP/>
        </div>
      </div> 
    </div>
  )
}


function CustomerDataSection({ customerData }) {
  return (
    <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full" style={{ border: 'black solid 0.2px' }}>
      <h2 className="text-opacity-50 text-center m-2">Khách hàng thân thiết</h2>
      <div className=' h-64 overflow-y-scroll'>
        <table className=" w-full border h-full overflow-hidden" >
          <thead>
            <tr>
              <th className="px-4 py-2">Mã khách hàng</th>
              <th className="px-4 py-2">Tên khách hàng</th>
              <th className="px-4 py-2">Điểm tích lũy</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.id} className="border-t border-b  text-normal--color">
                <td className="px-4 py-2">{customer.id}</td>
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductDataSection({ productData }) {
  return (
    <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full" style={{ border: 'black solid 0.2px' }}>
      <h2 className=" text-opacity-50 text-center m-2">Danh sách sản phẩm</h2>
      <div className=' h-64 overflow-y-scroll'>
        <table className=" w-full border h-64 overflow-hidden" >
          <thead>
            <tr className="bg-stone-700 text-neutral-700">
              <th className="px-4 py-2">Tên sản phẩm</th>
              <th className="px-4 py-2">Mã sách</th>
              <th className="px-4 py-2">Giá</th>
            </tr>
          </thead>
          <tbody className="max-h-14 overflow-auto">
            {productData.map((product) => (
              <tr key={product.code} className="border-t border-b text-normal--color">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.code}</td>
                <td className="px-4 py-2">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductChart() {
  return (
    <Bar
      data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Số tiền (đồng)",
            background: ["rgb(235, 234, 232)"],
            data: [8, 14, 21, 5, 19, 11, 12]
          }
        ]
      }}
      option={{
        legend: { display: true },
        title: {
          display: true,
          text: "Biểu đồ doanh thu"
        }
      }}
    />
  );
}

