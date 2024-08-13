import React from 'react';
import NaverMap from '../NaverMap';

export default function DetailInformation({ information }) {
  
  const extractUrl = (htmlString) => {
    const regex = /href="([^"]*)"/;
    const match = htmlString.match(regex);
    return match ? match[1] : "#";
  };

  const telInfo = information.tel ? information.tel : "제공하지 않는 정보입니다.";

  const homepageUrl = extractUrl(information.homepage);

  return (
    <section className="w-1410">
      <div>
        <NaverMap lat={parseFloat(information.lat)} lng={parseFloat(information.lng)} width={1400} height={500} />
      </div>
      <div className="p-3 border-2 border-gray-300 w-full mt-3">
        <span className="flex items-center">
          <h4 className="p-3 w-24">주소</h4>
          <p>{information.address}</p>
        </span>
        <span className="flex items-center">
          <h4 className="p-3 w-24">전화번호</h4>
          <p>{telInfo}</p>
        </span>
        <span className="flex items-center">
          <h4 className="p-3 w-24">홈페이지</h4>
          <div className="mr-7" dangerouslySetInnerHTML={{ __html: information.homepage }} />
          <a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green text-white p-2 rounded-lg w-20 text-center ml-2"
          >
            바로가기
          </a>
        </span>
      </div>
    </section>
  )
}
