import React, { useEffect, useRef } from "react";

const NaverMapWithMarkers = ({ width, height, locations = [], markerColors = [] }) => { // markerColors 추가
  const mapRef = useRef(null);

  useEffect(() => {
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`; // 브라우저 외부에서 자바스크립트 파일을 로드하면 전역 컨텍스트 window에서 실행 된다고 함 ㅇㅇ 
    script.async = true; // 스크립트 비동기적으로 로드되게
    script.onload = () => {
      const { naver } = window; // 파일 로드 한 부분을 naver로 저장
      console.log(naver);
      if (mapRef.current /* ref 가 참조하고 있는 dom 요소 */ && naver) { // 네이버 지도 초기화, 생성
        const initialPosition = new naver.maps.LatLng( 
          parseFloat(locations[0]?.mapy || 37.5665), 
          parseFloat(locations[0]?.mapx || 126.9780)
        );

        const map = new naver.maps.Map(mapRef.current, { 
          center: initialPosition, // 지도 초기 중심 좌표 설정
          zoom: 15,
        });

        // 커스텀 오버레이 클래스 정의
        // 오버레이? = 지도 위에 겹쳐서 표시되는 추가적인 요소
        class CustomOverlay extends naver.maps.OverlayView {
          constructor(options) {
            super(); 
            this._element = options.content; // 사용자 정의 오버레이 html 요소
            this._position = options.position; // 오버레이가 위치할 지도 상의 좌표
            this.setMap(options.map);  // 오버레이를 지도에 추가
          }

          onAdd() {  // 오버레이가 지도에 추가될 때 호출
            const overlayLayer = this.getPanes().overlayLayer; // 지도위의 여러 레이어 반환
            overlayLayer.appendChild(this._element);  // html 요소 오버레이에 추가
            this._element.style.zIndex = "1000"; 
          }

          draw() {  // 오버레이가 처음 추가되거나, 지도 상태가 변경될 때 호출
            const projection = this.getProjection();  // 지도 좌표를 화면 좌표로 변환할 수 있는 projection 반환
            const position = projection.fromCoordToOffset(this._position); // 지도 좌표를 화면좌표로 변환

            const { style } = this._element;
            style.position = 'absolute';
            
            // 마커의 중앙에 정확히 맞추기 위해 x와 y 값을 조정
            style.left = `${position.x - 39}px`; 
            style.top = `${position.y - 90}px`; 
          }

          onRemove() {  // 오버레이가 지도에서 제거될 때 호출
            if (this._element.parentNode) {
              this._element.parentNode.removeChild(this._element);
            }
          }
        }

        // 마커와 오버레이를 추가하는 함수
        locations.forEach((loc, index) => {
          const position = new naver.maps.LatLng(parseFloat(loc.mapy), parseFloat(loc.mapx));
          const color = markerColors[index % markerColors.length]; // 색상 선택

          // 커스텀 마커 아이콘 HTML
          const iconContent = `
          <div style="
            position: relative;
            width: 30px; 
            height: 30px; 
            background-color: #ffffff;
            border: 3px solid ${color.marker}; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-size: 12px; 
            color: #000000;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
            transform: translate(-17px, -35px);
          ">
            ${index + 1}
            <div style="
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 0; 
              height: 0; 
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-top: 10px solid ${color.marker};
              filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
            "></div>
          </div>
        `;

          // 기본 마커 추가
          new naver.maps.Marker({
            position,
            map,
            title: loc.title,
            icon: {
              content: iconContent,
            }
          });

          // 사진이 있는 경우, 커스텀 오버레이 추가
          if (loc.photoUrls && loc.photoUrls.length > 0) {
            const imageUrl = loc.photoUrls[0];

            // HTML 요소 생성
            const overlayElement = document.createElement("div");
            overlayElement.innerHTML = `
              <img src="${imageUrl}" style="width: 75px; height: 50px; border: 1px solid black; border-radius : 5px;" />
            `;

            // 커스텀 오버레이 인스턴스 생성 및 추가
            new CustomOverlay({
              map: map,
              position: position,
              content: overlayElement,
            });
          }
        });

        // 경로 폴리라인 그리기
        const markerPositions = locations.map(
          (loc) => new naver.maps.LatLng(parseFloat(loc.mapy), parseFloat(loc.mapx))
        );
        if (markerPositions.length > 1) {
          new naver.maps.Polyline({
            path: markerPositions,
            map,
            strokeColor: "#007BFF",
            strokeWeight: 3,
            zIndex: 100,
          });
        }
      }
    };

    script.onerror = () => {
      console.error("Naver Map script could not be loaded.");
    };
    
    document.head.appendChild(script);
  }, [locations, markerColors]);

  return <div ref={mapRef} style={{ width, height, position: "relative" }}></div>;
};

export default NaverMapWithMarkers;