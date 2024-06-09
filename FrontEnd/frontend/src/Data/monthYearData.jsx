import React from 'react';

export default function MonthYearData({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) {
  const monthYear = [
    { year: 2023, months: Array.from({ length: 12 }, (_, i) => i + 1) },
    { year: 2024, months: Array.from({ length: 12 }, (_, i) => i + 1) },
  ];

  return (
    <div>
      <h4>Chọn năm và tháng</h4>
      <div className="flex gap-2">
        <select
          value={selectedYear || ''}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
        >
          <option value="">-- Chọn năm --</option>
          {monthYear.map(({ year }) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth || ''}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          disabled={!selectedYear}
        >
          <option value="">-- Chọn tháng --</option>
          {selectedYear &&
            monthYear
              .find((my) => my.year === selectedYear)
              .months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
}

