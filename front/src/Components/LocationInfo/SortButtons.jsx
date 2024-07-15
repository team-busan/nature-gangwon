import React from 'react';

const SortButtons = () => (
  <section className="w-screen bg-lightGreen h-16 mb-5 shadow-md">
    <div className="w-1420 h-full mx-auto flex items-center p-2">
      <button className="font-bold mr-5">전체</button>
      <button className="mr-5">인기순</button>
      <button className="mr-5">후기순</button>
    </div>
  </section>
);

export default SortButtons;
