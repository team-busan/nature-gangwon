import React, { useState } from 'react'
import SortButtons from '../Components/LocationInfo/SortButtons';
import PlanMainImage from '../Components/Plan/PlanMainImage';
import planImage from '../img/planImage.png';

export default function PlanInfo() {
  const [sortOption, setSortOption] = useState("all");

  return (
    <section>
      <PlanMainImage image = {planImage}/>
      <SortButtons sortOption = {setSortOption}/>
      <div className = "p-3">
        <h3>다양한 여행 계획들을 둘러보세요!</h3>
      </div>
    </section>
  )
}
