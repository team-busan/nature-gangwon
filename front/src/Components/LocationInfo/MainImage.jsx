import React from 'react';
import mainImg from '../../img/LocationMain2.jpg';

const MainImage = ({image}) => (
  <section className="w-full h-136 flex justify-center bg-gray-100">
    <img
      src={image}
      alt="메인 이미지"
      className=" bg-cover "
    />
  </section>
);

export default MainImage;