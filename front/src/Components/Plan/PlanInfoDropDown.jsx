import React, { useState } from 'react';

function PlanInfoDropDown({selectTravel, setSelectTravel }) {

  const handleChange = (event) => {
    setSelectTravel(event.target.value);
  };

  return (
    <div className="relative inline-block w-64">
      <select
        value={selectTravel}
        onChange={handleChange}
        className="block w-full px-4 py-2 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-green focus:border-green"
      >
        <option value="전체">전체</option>
        <option value="여행 전">여행전</option>
        <option value="여행 중">여행중</option>
        <option value="여행 완료">여행완료</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

export default PlanInfoDropDown;
