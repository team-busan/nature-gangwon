import React from 'react';
import mainImg from '../../img/LocationMain2.jpg';

const MainImage = ({image}) => (
  <section className="w-full h-136 flex justify-center">
    <img
      src={image}
      alt="메인 이미지"
      className="w-1420 h-full "
    />
  </section>
);

export default MainImage;