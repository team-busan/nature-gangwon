import React, { useEffect, useRef } from 'react';

const NaverMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => {
      const { naver } = window;
      if (mapRef.current && naver) {
        const location = new naver.maps.LatLng(lat, lng);
        const map = new naver.maps.Map(mapRef.current, {
          center: location,
          zoom: 17, // 지도 확대 정도
        });
        new naver.maps.Marker({
          position: location,
          map,
        });
      }
    };
    script.onerror = () => {
      console.error('Naver Map script could not be loaded.');
    };
    document.head.appendChild(script);

  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: "1400px", height: "500px" }}></div>;
};

export default NaverMap;
