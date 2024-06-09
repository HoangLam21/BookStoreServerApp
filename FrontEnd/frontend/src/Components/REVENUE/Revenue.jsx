import React from 'react'
import ChartComponent from './ChartComponent'
import Income from './Income'
import Outcome from './OutCome'
import RevenueDayList from './RevenueDayList';

export default function Revenue() {
  return (
    <div className='h-full w-full flex flex-col gap-4 px-2 overflow-y-auto lg:overflow-hidden'>
      <div className='h-full w-full lg:w-full md:w-full  sm:w-[85%] bg-backgrond--color rounded-lg relative'>
        <ChartComponent/>
      </div>
      {/* <div className='flex sm:h-2/5 sm:w-full gap-4 sm:flex-row flex-col  h-full '>
        <div className='sm:flex-1 sm:overflow-hidden lg:h-96 h-72'>

          <Income />
        </div>
        <div className='sm:flex-1 lg:h-96 h-72 '>
          <Outcome/>
        </div>
      </div> */}
      {/* <div className='w-full h-2/4 overflow-auto'>
        <RevenueDayList/>
      </div> */}
    </div>
  )
}
