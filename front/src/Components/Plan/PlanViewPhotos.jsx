import { useRef } from "react";
import { useRecoilState } from "recoil";
import {
  planList,
  planPhotoAccordianState,
  planPhotoAccordianItemState,
} from "../../state/planState";

import { FaTrash } from "react-icons/fa6";
import axios from "axios";

const PlanViewPhotos = () => {
  const [plans, setPlans] = useRecoilState(planList);
  const [arrcodianState, setAccordianState] = useRecoilState(
    planPhotoAccordianState
  );
  const [arrcodianItemState, setAccordianItemState] = useRecoilState(
    planPhotoAccordianItemState
  );

  const inputRef = useRef(null);

  const handleClickButton = () => {
    inputRef.current?.click();
  };

  const handleUploadPhoto = async () => {
    if (inputRef.current?.files !== null) {
      const planCopy = [...plans];
      const dayCopy = [...plans[arrcodianState]];
      const itemCopy = { ...plans[arrcodianState][arrcodianItemState] };
      const photoUrlsCopy = [
        ...plans[arrcodianState][arrcodianItemState].photoUrls,
      ];
      itemCopy.photoUrls = photoUrlsCopy;
      dayCopy[arrcodianItemState] = itemCopy;
      planCopy[arrcodianState] = dayCopy;

      const formData = new FormData();
      formData.append("file", inputRef.current?.files[0]);
      await axios
        .post("https://nature-gangwon.shop:8000/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => photoUrlsCopy.push(res.data));
      setPlans(planCopy);
    }
  };

  const handleDeletePhoto = (i) => {
    const planCopy = [...plans];
    const dayCopy = [...plans[arrcodianState]];
    const itemCopy = { ...plans[arrcodianState][arrcodianItemState] };
    const photoUrlsCopy = [
      ...plans[arrcodianState][arrcodianItemState].photoUrls,
    ];
    photoUrlsCopy.splice(i, 1);
    itemCopy.photoUrls = photoUrlsCopy;
    dayCopy[arrcodianItemState] = itemCopy;
    planCopy[arrcodianState] = dayCopy;
    setPlans(planCopy);
  };

  let count = 0;

  const rendering = () => {
    const result = [];
    const length = plans[arrcodianState][arrcodianItemState].photoUrls.length;
    for (let i = 0; i < length; i++) {
      result.push(
        <div
          key={
            planPhotoAccordianState.toString() +
            planPhotoAccordianItemState.toString() +
            count++
          }
          className="w-full aspect-square rounded-lg relative cursor-pointer"
        >
          <img
            src={plans[arrcodianState][arrcodianItemState].photoUrls[i]}
            alt="계획된 장소에 사용자가 추가한 이미지"
            className="object-cover rounded-lg w-full aspect-square"
          />
          <div
            onClick={() => handleDeletePhoto(i)}
            className="absolute right-5 top-5 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            <FaTrash className="text-2xl" />
          </div>
        </div>
      );
    }
    if (length !== 3) {
      result.push(
        <div
          key={
            planPhotoAccordianState.toString() +
            planPhotoAccordianItemState.toString() +
            count++
          }
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadPhoto}
            className="hidden"
          />
          <button
            onClick={handleClickButton}
            className="w-full aspect-square bg-gray-400 rounded-lg"
          >
            이미지업로드
          </button>
        </div>
      );
    }
    return result;
  };

  return <div className="flex flex-col gap-10 pr-10">{rendering()}</div>;
};

export default PlanViewPhotos;
