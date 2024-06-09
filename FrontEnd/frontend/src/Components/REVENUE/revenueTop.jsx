import React, { useState, useEffect } from 'react';

export default function RevenueTop() {
  return (
    <div className='flex gap-4'>
      <MonthYearData />
      <div></div>
    </div>
  );
}

function MonthYearData() {
  const monthYear = [
    {
      year: 2023,
      states: Array.from({ length: 12 }, (_, i) => ({ name: i + 1 })),
    },
    {
      year: 2024,
      states: Array.from({ length: 12 }, (_, i) => ({ name: i + 1 })),
    },
  ];

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    if (selectedYear) {
      setSelectedMonth(null); // Reset selected month when year changes
    }
  }, [selectedYear]);

  function handleYear(selectedYear) {
    setSelectedYear(selectedYear);
  }

  function handleMonth(selectedMonth) {
    setSelectedMonth(selectedMonth);
  }

  return (
    <div>
      <div className='w-auto gap-10 flex justify-center'>
        <h4 className='text-header--lightcolor'>Năm</h4>
        <select
          className='form-control bg-border--color w-20 pl-2 text-primary--color'
          onChange={(e) => handleYear(parseInt(e.target.value))}
        >
          <option ></option>
          {monthYear.map((my) => (
            <option key={my.year} value={my.year}>
              {my.year}
            </option>
          ))}
        </select>
        <h4 className='text-header--lightcolor'>Tháng</h4>
        <select
          className='form-control bg-border--color w-20 pl-7 text-primary--color'
          onChange={(e) => handleMonth(parseInt(e.target.value))}
          disabled={!selectedYear} // Disable month selection until a year is selected
        >
          <option ></option>
          {selectedYear &&
            monthYear
              .find((my) => my.year === selectedYear)
              .states.map((month) => (
                <option key={month.name} value={month.name}>
                  {month.name}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
}
