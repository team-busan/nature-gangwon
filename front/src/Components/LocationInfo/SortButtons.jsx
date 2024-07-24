import React from 'react';

const SortButtons = () => (
  <section className="w-scree h-16 mb-5">
    <div className="w-1420 h-full mx-auto flex items-center p-2 bg-lightGreen shadow-md">
      <button className="font-bold mr-5 p-3">전체</button>
      <button className="mr-5 p-3">인기순</button>
      <button className="mr-5 p-3">후기순</button>
    </div>
  </section>
);

export default SortButtons;
