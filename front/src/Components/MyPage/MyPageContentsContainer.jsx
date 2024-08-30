import MyPageContent from "./MyPageContent";

import { useEffect, useState } from "react";

const MyPageContentsContainer = ({ contentNum, data, plan, samplePhotos }) => {
  const [title, setTitle] = useState("내 메모");

  useEffect(() => {
    if (contentNum === 0) {
      setTitle("내 계획");
    } else if (contentNum === 1) {
      setTitle("내 메모");
    } else if (contentNum === 2) {
      setTitle("내 즐겨찾기");
    } else if (contentNum === 3) {
      setTitle("내 사진");
    } else if (contentNum === 4) {
      setTitle("경비분할");
    } else if (contentNum === 5) {
      setTitle("정보수정");
    }
  }, [contentNum]);

  return (
    <div className="mt-[50px]">
      <h4>{title}</h4>
      <hr className="bg-black h-[3px] mb-6" />
      {/* <MyPageContent
        contentNum={contentNum}
        data={data}
        plan={plan}
        samplePhotos={samplePhotos}
      /> */}
    </div>
  );
};

export default MyPageContentsContainer;
