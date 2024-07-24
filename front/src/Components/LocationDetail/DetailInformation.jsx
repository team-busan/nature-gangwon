import React from 'react'
import NaverMap from '../NaverMap'
import { Link } from 'react-router-dom'

export default function DetailInformation({information}) {
  const lat = "37.5665"
  const lng = "126.9780"

  const homepageUrl = information.homepage.startsWith('http://') || information.homepage.startsWith('https://')
  ? information.homepage
  : `https://${information.homepage}`;

  return (
    <section className = "w-1410">
      <div className = "">
        <NaverMap lat = {lat} lng = {lng}/>
      </div>
      <div className = "p-3 border-2 border-gray-300 w-full mt-3">
        <span className = "flex items-center">
          <h4 className = "p-3 w-24">주소</h4>
          <p>{information.address}</p>
        </span>
        <span className = "flex items-center">
          <h4 className = "p-3 w-24">전화번호</h4>
          <p>{information.tel}</p>
        </span>
        <span className = "flex items-center">
          <h4 className = "p-3 w-24">홈페이지</h4>
          <p className = "mr-10">{information.homepage}</p>
          <a
            href={information.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green text-white p-2 rounded-lg w-20 text-center"
          >
            바로가기
          </a>
        </span>
      </div>
    </section>
  )
}
