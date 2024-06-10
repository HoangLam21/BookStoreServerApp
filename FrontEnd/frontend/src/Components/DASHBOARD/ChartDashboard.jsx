
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


export default function ChartComponent() {
  const chartRef = useRef(null);
  const [revenuedaylistdata, setRevenueDayListData] = useState([]);
  const [revenuemonthlistdata, setRevenueMonthListData] = useState([]);
  const [revenueyearlistdata, setRevenueYearListData] = useState([]);
  const [monthdata, setMonthData] = useState('');
  const [yeardata, setYearData] = useState(2024);
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
      const url = `${REVENUE_MONTH_OF_YEAR_URL}${2024}`;
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
      <div className='h-full w-full bg-backgrond--color rounded-t-lg'>
          <div className="chartBox h-4/5 lg:w-5/6 lg:h-full sm:w-8/12 md:w-full w-64 lg:flex lg:items-center lg:pl-10">
            <canvas id="myChart" ref={chartRef} className='text-primary--color'></canvas>
          </div>
      </div>
 
    </div>
    
  );
}
