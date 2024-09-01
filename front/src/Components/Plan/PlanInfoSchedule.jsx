import React from 'react';

export default function PlanInfoSchedule({ data }) {
  // 여행 상태에 따라 텍스트를 반환하는 함수
  const getTravel = (status) => {
    switch (status) {
      case '여행 중':
        return '여행중';
      case '여행 완료':
        return '여행완료';
      case '여행 전':
        return '여행전';
      default:
        return 'null';
    }
  };

  // 여행 상태에 따라 배경색을 반환하는 함수
  const getBackgroundColor = (status) => {
    switch (status) {
      case '여행 중':
        return 'bg-orange-500'; 
      case '여행 완료':
        return 'bg-green';
      case '여행 전':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={`absolute top-0 right-0 ${getBackgroundColor(data)} text-white text-sm p-2 rounded z-10 opacity-95 w-20`}>
      <span className = "text-center">
        <p>{getTravel(data)}</p>
      </span>
    </div>
  );
}
