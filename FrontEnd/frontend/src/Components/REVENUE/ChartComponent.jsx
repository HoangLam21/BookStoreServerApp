// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Chart, registerables } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// // Register all chart.js components
// Chart.register(...registerables);

// const REVENUE_DAY_ALL = 'http://167.172.69.8:8010/BookStore/revenue/day/all';
// const REVENUE_DAY_OF_MONTH_URL = 'http://167.172.69.8:8010/BookStore/revenue/days-of/';
// const REVENUE_MONTH_OF_YEAR_URL = 'http://167.172.69.8:8010/BookStore/revenue/months-of/';
// const REVENUE_DAY_CAL_URL = 'http://167.172.69.8:8010/BookStore/revenue/day/cal/';
// const REVENUE_CAL_MONTH_URL = 'http://167.172.69.8:8010/BookStore/revenue/month/cal/';
// const REVENUE_CAL_YEAR_URL = 'http://167.172.69.8:8010/BookStore/revenue/year/cal/';

// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQyMzk4MiwiaWF0IjoxNzE3NDEzMTgyLCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9QQVlNRU5UUyBDQU5DTEVfT1JERVIgQ1JFQVRFX09SREVSIEdFVF9NWV9CT09LUyBBRE1JTiBBRE1JTl9NQU5BR0UgU1RBRkYgSU1QT1JUX1dPUktfREVMRVRFIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIn0.dWCXeEMHhii6rFAG59UP0QCQj97MMfFOSBY3fPNp_8k';

// export default function ChartComponent() {
//   const chartRef = useRef(null);
//   const [revenuedaylistdata, setRevenueDayListData] = useState([]);
//   const [revenuemonthlistdata, setRevenueMonthListData] = useState([]);
//   const [revenueyearlistdata, setRevenueYearListData] = useState([]);
//   const [daydata, setDayData] = useState('');
//   const [monthdata, setMonthData] = useState('');
//   const [yeardata, setYearData] = useState('');
//   const [searchday, setSearchDay] = useState('');

//   const fetchData = async (url, setData) => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setData(response.data.result);
//     } catch (error) {
//       console.error('Error fetching revenue data:', error);
//     }
//   };

//   useEffect(() => {
//     const url = `${REVENUE_DAY_ALL}`;
//     fetchData(url, setRevenueDayListData);
//   }, []);

//   useEffect(() => {
//     if (monthdata) {
//       const url = `${REVENUE_DAY_OF_MONTH_URL}${monthdata}`;
//       fetchData(url, setRevenueMonthListData);
//     }
//   }, [monthdata]);

//   useEffect(() => {
//     if (yeardata) {
//       const url = `${REVENUE_MONTH_OF_YEAR_URL}${yeardata}`;
//       fetchData(url, setRevenueYearListData);
//     }
//   }, [yeardata]);

//   const createChart = () => {
//     const ctx = chartRef.current.getContext('2d');
//     return new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: [],
//         datasets: [{
//           label: 'Revenue',
//           data: [],
//           backgroundColor: 'rgba(81, 56, 32, 0.2)',
//           borderColor: 'rgba(81, 56, 32, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           x: {
//             type: 'category',
//             title: {
//               display: true,
//               text: 'Date'
//             }
//           },
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Revenue'
//             }
//           }
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     if (chartRef.current) {
//       const chartInstance = chartRef.current.chartInstance;

//       if (chartInstance) {
//         chartInstance.destroy();
//       }

//       chartRef.current.chartInstance = createChart();
//     }
//   }, []);

//   useEffect(() => {
//     if (chartRef.current && revenuemonthlistdata.length > 0) {
//       const chartInstance = chartRef.current.chartInstance;

//       if (chartInstance) {
//         chartInstance.data.labels = revenuemonthlistdata.map(data => {
//           const dateParts = data.day.split('-');
//           const day = dateParts[0].padStart(2, '0');
//           const month = dateParts[1].padStart(2, '0');
//           const year = dateParts[2];
//           return `${day}-${month}-${year}`;
//         });

//         chartInstance.data.datasets[0].data = revenuemonthlistdata.map(data => data.revenue);
//         chartInstance.update();
//       }
//     }
//   }, [revenuemonthlistdata]);

//   useEffect(() => {
//     if (chartRef.current && revenueyearlistdata.length > 0) {
//       const chartInstance = chartRef.current.chartInstance;

//       if (chartInstance) {
//         chartInstance.data.labels = revenueyearlistdata.map(data => data.month);
//         chartInstance.data.datasets[0].data = revenueyearlistdata.map(data => data.revenue);
//         chartInstance.update();
//       }
//     }
//   }, [revenueyearlistdata]);

//   const handleSearchDay = (event) => {
//     const value = event.target.value;
//     setSearchDay(value);
//     handleButtonDayClick()
//   };

//   const handleButtonDayClick = () => {
//     handleAddDayCal();
//   };

//   const handleAddDayCal = async () => {
//     const url = `${REVENUE_DAY_CAL_URL}${searchday}`;
//     try {
//       const response = await axios.post(url, {}, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('day added:', response.data);
//     } catch (error) {
//       console.error('Error adding day:', error);
//       if (error.response?.data) {
//         console.error("Error response:", error.response.data);
//       }
//     }
//   };

//   const handleMonthChange = (event) => {
//     setMonthData(event.target.value);
//   };

//   const handleAddMonthCal = async () => {
//     const url = `${REVENUE_CAL_MONTH_URL}${monthdata}`;
//     console.log(url)
//     try {
//       const response = await axios.post(url, {}, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('month cal added:', response.data);
//     } catch (error) {
//       console.error('Error adding month call:', error);
//       if (error.response?.data) {
//         console.error("Error response:", error.response.data);
//       }
//     }
//   };

//   const handleButtonMonthClick = () => {
   
//     handleAddMonthCal();
//   };

//   const handleYearChange = (event) => {
//     setYearData(event.target.value);
//   };

//   const handleButtonYearClick = () => {
//     handleAddYearCal()
//   };

//   const handleAddYearCal = async () => {
//     const url = `${REVENUE_CAL_YEAR_URL}${yeardata}`;
//     console.log(url)
//     try {
//       const response = await axios.post(url, {}, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('year cal added:', response.data);
//     } catch (error) {
//       console.error('Error adding year call:', error);
//       if (error.response?.data) {
//         console.error("Error response:", error.response.data);
//       }
//     }
//   };

//   const handleMonthChangeAndFetch = (event) => {
//     handleMonthChange(event);
//     handleButtonMonthClick();
//   };

//   const handleYearChangeAndFetch = (event) => {
//     handleYearChange(event);
//     handleButtonYearClick();
//   };

  

//   const filteredData = revenuedaylistdata.filter((item) =>
    
//      item.day.toLowerCase().includes(searchday.toLowerCase())
//  );

//   return (
//     <div className='w-full h-full  flex justify-center relative flex-col gap-16 bg-backgrond--color'>
//       <div className='h-2/4 bg-backgrond--color rounded-t-lg'>
//         <div className="chartCard  xl:ml-20 lg:h-full lg:w-3/4 lg:left-10 lg:ml-10 md:h-72 md:ml-20 sm:h-64 sm:ml-16 w-full relative ml-10 h-80">
//           <div className="chartBox h-full lg:w-full sm:w-8/12 md:w-full w-64 flex items-center">
//             <canvas id="myChart" ref={chartRef} className='text-primary--color'></canvas>
//           </div>
//         </div>
//         <div className='flex gap-10 relative left-0 pb-4 pl-4  bg-backgrond--color'>
//           <input
//             type='text'
//             value={searchday}
//             onChange={handleSearchDay}
//             className='text-primary--color cursor-pointer border border-border--lightcolor rounded-lg h-8 px-2 text-xs w-20'
//           />
//           <input
//             type='month'
//             value={monthdata}
//             onChange={handleMonthChangeAndFetch}
//             className='text-primary--color cursor-pointer border border-border--lightcolor rounded-lg h-8 px-2 text-xs w-32 '
//           />
//           <input
//             type='text'
//             value={yeardata}
//             placeholder='Year'
//             onChange={handleYearChangeAndFetch}
//             className='text-primary--color cursor-pointer border border-border--lightcolor rounded-lg h-8 px-2 text-sm w-20'
//           />
//         </div>
//       </div>
//       <div className="KH_maincontent_footer_content bg-white--color w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-auto">
//                 <div className="overflow-auto md:overflow-hidden md:full w-96 ml-3 sm:w-[96%]">
//                     <table className="w-full rounded-t-lg">
//                         <thead className="text-primary--color whitespace-nowrap rounded-t-lg">
//                             <tr>
//                                 <th className='w-1/5 text-center'>Ngày</th>
//                                 <th className='w-1/3 text-center'>Tổng bán</th>
//                                 <th className='w-2/12 text-center'>Tổng nhập</th>
//                                 <th className='w-1/3 text-center'>Doanh thu</th>
//                             </tr>
//                         </thead>
//                         <tbody className="KH_maincontent_footer_content_detail divide-y">
//                             {filteredData.map((item) => {
//                                 return(
//                                     <tr key={item.id} className="hover:bg-backgrond--color hover:no-underline shadow py-2">
//                                     <td className="w-1/3 text-center">{item.day}</td>
//                                     <td className="w-1/5 text-center">{item.total_sale}</td>
//                                     <td className="w-1/3 text-center">{item.total_import}</td>
//                                     <td className="w-1/3 text-center">{item.revenue}</td>
//                                 </tr>
//                                 )
                                
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//         </div>
//     </div>
    
//   );
// }


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register all chart.js components
Chart.register(...registerables);

const REVENUE_DAY_ALL = 'http://167.172.69.8:8010/BookStore/revenue/day/all';
const REVENUE_DAY_OF_MONTH_URL = 'http://167.172.69.8:8010/BookStore/revenue/days-of/';
const REVENUE_MONTH_OF_YEAR_URL = 'http://167.172.69.8:8010/BookStore/revenue/months-of/';
const REVENUE_DAY_CAL_URL = 'http://167.172.69.8:8010/BookStore/revenue/day/cal/';
const REVENUE_CAL_MONTH_URL = 'http://167.172.69.8:8010/BookStore/revenue/month/cal/';
const REVENUE_CAL_YEAR_URL = 'http://167.172.69.8:8010/BookStore/revenue/year/cal/';

//const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzY3MTk2NywiaWF0IjoxNzE3NjYxMTY3LCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQ0FOQ0xFX09SREVSIENSRUFURV9PUkRFUiBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgSU1QT1JUX1dPUktfRklORCBHRVRfQ1VTVE9NRVJfSU5GT1MgR0VUX1BBWU1FTlRfSU5GT1MgSU1QT1JUX1dPUktfREVMRVRFIElNUE9SVF9XT1JLX1VQREFURSBWRVJJRllfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.BeebnrEP8FI7pbjJ4fOSesqGorO2QZTR0TnYz85TWNM';

export default function ChartComponent() {
  const chartRef = useRef(null);
  const [revenuedaylistdata, setRevenueDayListData] = useState([]);
  const [revenuemonthlistdata, setRevenueMonthListData] = useState([]);
  const [revenueyearlistdata, setRevenueYearListData] = useState([]);
  const [daydata, setDayData] = useState('');
  const [monthdata, setMonthData] = useState('');
  const [yeardata, setYearData] = useState('');
  const [searchday, setSearchDay] = useState('');

  const fetchData = async (url, setData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  useEffect(() => {
    const url = `${REVENUE_DAY_ALL}`;
    fetchData(url, setRevenueDayListData);
  }, []);

  useEffect(() => {
    if (monthdata) {
      const url = `${REVENUE_DAY_OF_MONTH_URL}${monthdata}`;
      fetchData(url, setRevenueMonthListData);
    }
  }, [monthdata]);

  useEffect(() => {
    if (yeardata) {
      const url = `${REVENUE_MONTH_OF_YEAR_URL}${yeardata}`;
      fetchData(url, setRevenueYearListData);
    }
  }, [yeardata]);

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Revenue',
          data: [],
          backgroundColor: 'rgba(81, 56, 32, 0.2)',
          borderColor: 'rgba(81, 56, 32, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue'
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartRef.current.chartInstance = createChart();
    }
  }, []);

  useEffect(() => {
    if (chartRef.current && revenuemonthlistdata.length > 0) {
      const chartInstance = chartRef.current.chartInstance;

      if (chartInstance) {
        chartInstance.data.labels = revenuemonthlistdata.map(data => {
          const dateParts = data.day.split('-');
          const day = dateParts[0].padStart(2, '0');
          const month = dateParts[1].padStart(2, '0');
          const year = dateParts[2];
          return `${day}-${month}-${year}`;
        });

        chartInstance.data.datasets[0].data = revenuemonthlistdata.map(data => data.revenue);
        chartInstance.update();
      }
    }
  }, [revenuemonthlistdata]);

  useEffect(() => {
    if (chartRef.current && revenueyearlistdata.length > 0) {
      const chartInstance = chartRef.current.chartInstance;

      if (chartInstance) {
        chartInstance.data.labels = revenueyearlistdata.map(data => data.month);
        chartInstance.data.datasets[0].data = revenueyearlistdata.map(data => data.revenue);
        chartInstance.update();
      }
    }
  }, [revenueyearlistdata]);

  const handleSearchDay = (event) => {
    const value = event.target.value;
    setSearchDay(value);
    handleButtonDayClick()
  };

  const handleButtonDayClick = () => {
    handleAddDayCal();
  };

  const handleAddDayCal = async () => {
    const token = localStorage.getItem('token');
    const url = `${REVENUE_DAY_CAL_URL}${searchday}`;
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('day added:', response.data);
    } catch (error) {
      console.error('Error adding day:', error);
      if (error.response?.data) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleMonthChange = (event) => {
    setMonthData(event.target.value);
  };

  const handleAddMonthCal = async () => {
    const token = localStorage.getItem('token');
    const url = `${REVENUE_CAL_MONTH_URL}${monthdata}`;
    console.log(url)
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('month cal added:', response.data);
    } catch (error) {
      console.error('Error adding month call:', error);
      if (error.response?.data) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleButtonMonthClick = () => {
   
    handleAddMonthCal();
  };

  const handleYearChange = (event) => {
    setYearData(event.target.value);
  };

  const handleButtonYearClick = () => {
    handleAddYearCal()
  };

  const handleAddYearCal = async () => {
    const token = localStorage.getItem('token');
    const url = `${REVENUE_CAL_YEAR_URL}${yeardata}`;
    console.log(url)
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('year cal added:', response.data);
    } catch (error) {
      console.error('Error adding year call:', error);
      if (error.response?.data) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleMonthChangeAndFetch = (event) => {
    handleMonthChange(event);
    handleButtonMonthClick();
  };

  const handleYearChangeAndFetch = (event) => {
    handleYearChange(event);
    handleButtonYearClick();
  };

  

  const filteredData = revenuedaylistdata.filter((item) =>
    
     item.day.toLowerCase().includes(searchday.toLowerCase())
 );

  return (
    <div className='w-full h-full  flex justify-center relative flex-col gap-16 bg-backgrond--color'>
      <div className='h-2/4 bg-backgrond--color rounded-t-lg'>
        <div className="chartCard  xl:ml-20 lg:h-full lg:w-3/4 lg:left-10 lg:ml-10 md:h-72 md:ml-20 sm:h-64 sm:ml-16 w-full relative ml-10 h-80">
          <div className="chartBox h-full lg:w-full sm:w-8/12 md:w-full w-64 flex items-center">
            <canvas id="myChart" ref={chartRef} className='text-primary--color'></canvas>
          </div>
        </div>
        <div className='flex gap-10 relative left-0 pb-4 pl-4  bg-backgrond--color'>
          <input
            type='text'
            value={searchday}
            onChange={handleSearchDay}
            className='text-primary--color cursor-pointer border border-border--lightcolor rounded-lg h-8 px-2 text-xs w-20'
          />
          <input
            type='month'
            value={monthdata}
            onChange={handleMonthChangeAndFetch}
            className='text-primary--color cursor-pointer border border-border--lightcolor rounded-lg h-8 px-2 text-xs w-32 '
          />
          <input
            type='text'
            value={yeardata}
            placeholder='Year'
            onChange={handleYearChangeAndFetch}
            className='text-primary--color cursor-pointer border border-border--lightcolor rounded-lg h-8 px-2 text-sm w-20'
          />
        </div>
      </div>
      <div className="KH_maincontent_footer_content bg-white--color w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-auto">
                <div className="overflow-auto md:overflow-hidden md:full w-96 ml-3 sm:w-[96%]">
                    <table className="w-full rounded-t-lg">
                        <thead className="text-primary--color whitespace-nowrap rounded-t-lg">
                            <tr>
                                <th className='w-1/5 text-center'>Ngày</th>
                                <th className='w-1/3 text-center'>Tổng bán</th>
                                <th className='w-2/12 text-center'>Tổng nhập</th>
                                <th className='w-1/3 text-center'>Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody className="KH_maincontent_footer_content_detail divide-y">
                            {filteredData.map((item) => {
                                return(
                                    <tr key={item.id} className="hover:bg-backgrond--color hover:no-underline shadow py-2">
                                    <td className="w-1/3 text-center">{item.day}</td>
                                    <td className="w-1/5 text-center">{item.total_sale}</td>
                                    <td className="w-1/3 text-center">{item.total_import}</td>
                                    <td className="w-1/3 text-center">{item.revenue}</td>
                                </tr>
                                )
                                
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
    
  );
}
