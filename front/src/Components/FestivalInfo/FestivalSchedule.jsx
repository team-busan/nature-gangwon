import React from 'react';

export default function FestivalSchedule({ type, startDate }) {
  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `D-${diffDays}` : 'Ended';
  };

  const backgroundColor = type === 'festival_ing' ? 'bg-orange-500' : 'bg-green';

  return (
    <div className={`absolute top-0 right-0 ${backgroundColor} text-white text-sm p-2 rounded z-10 opacity-95`}>
      {type === 'festival_ing' ? '진행 중' : calculateDaysLeft(startDate)}
    </div>
  );
}
