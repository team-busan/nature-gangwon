import React from 'react';
import mainImg from '../../img/LocationMain2.jpg';

const MainImage = () => (
  <section className="w-screen h-136">
    <img
      src={mainImg}
      alt="메인 이미지"
      className="w-full h-full "
    />
  </section>
);

export default MainImage;