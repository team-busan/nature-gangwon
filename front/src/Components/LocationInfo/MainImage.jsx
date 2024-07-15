import React from 'react';
import mainImg from '../../img/LocationMain2.jpg';

const MainImage = () => (
  <section className="w-screen h-104">
    <img
      src={mainImg}
      alt="메인 이미지"
      className="w-screen h-full bg-cover"
    />
  </section>
);

export default MainImage;
