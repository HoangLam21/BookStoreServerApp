import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';


export default function CelanderTop({ onSearch, triggerAddWorkShift,triggerUpdateWorkShift }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the search handler passed from parent component
  };

  const handleAddWorkShiftClick = () => {
    triggerAddWorkShift(true); // Set the state to true to display the AddWorkshift component
  };

  const handleUpdateWorkShiftClick = () => {
    triggerUpdateWorkShift(true); // Set the state to true to display the AddWorkshift component
  };



  return (
    <div className="maincontent_top flex border-b  border-border--lightcolor pb-4">
      <div className="search w-1/3 relative">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="search-input w-full h-10 px-4 border border-b-primary--color rounded-2xl focus:outline-none text-xs "
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <HiSearch className="absolute right-2 top-2 text-2xl text-primary--color" />
      </div>
      <button
        onClick={handleAddWorkShiftClick}
        className="btn_addworkshift bg-primary--color text-white--color rounded-full ml-4 cursor-pointer hover:opacity-70 border  h-10 w-36 text-xs 
                        sm:w-40 sm:text-sm
                        md:w-46 md:text-sm
                        lg:w-46 lg:text-sm"
      >
        Thêm Lịch Làm Việc
      </button>
      <button
        onClick={handleUpdateWorkShiftClick}
        className="btn_addworkshift bg-primary--color text-white--color rounded-full ml-4 cursor-pointer hover:opacity-70 border  h-10 w-36 text-xs 
                        sm:w-40 sm:text-sm
                        md:w-46 md:text-sm
                        lg:w-46 lg:text-sm"
      >
     Xóa lịch 
      </button>
      
    </div>
  );
}
