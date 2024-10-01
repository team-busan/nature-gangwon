import { useRecoilState } from "recoil";
import { planList, planTitleState } from "../../state/planState";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PlanDefaultImage from "../PlanDefaultImage";

const PlanChooseThumbnail = ({ setPlanStage, dates }) => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);
  const [planTitle, setPlanTitle] = useRecoilState(planTitleState);
  const [plans, setPlans] = useRecoilState(planList);
  const [selectedIndex, setSelectedIndex] = useState({
    i: -1,
    j: -1,
    k: -1,
  });

  const handleAddPhoto = () => {
    setPlanStage(2);
  };

  const handleChoosePhoto = (i, j, k) => {
    setSelectedIndex({ i: i, j: j, k: k });
  };

  const handleSavePlan = () => {
    const postPlans = [];
    for (let i = 0; i < plans.length; i++) {
      for (let j = 0; j < plans[i].length; j++) {
        const postItem = {
          locationBasedId: plans[i][j].locationBasedId,
          dayNumber: i + 1,
          note: plans[i][j].memo,
          note2: plans[i][j].memo2,
          photoUrls: plans[i][j].photoUrls,
        };
        postPlans.push(postItem);
      }
    }

    const plan = {
      startDate: format(dates[0], "yyyy-MM-dd"),
      endDate: format(dates[1], "yyyy-MM-dd"),
      planTitle: planTitle,
      PlanImage:
        selectedIndex.i === -1 &&
        selectedIndex.j === -1 &&
        selectedIndex.k === -1
          ? null
          : plans[selectedIndex.i][selectedIndex.j].photoUrls[
              selectedIndex.k
            ].substring(5),
      postPlanList: postPlans,
    };

    axios
      .post("https://nature-gangwon.shop/plan/post", plan, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "계획이 저장되었습니다!",
          showConfirmButton: false,
          timer: 3000,
        });
        setPlanTitle("");
        navigate("/plan/list");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "계획 저장에 실패했습니다.",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const rendering = () => {
    const result = [];
    result.push(
      <div
        key="sample"
        onClick={() => setSelectedIndex({ i: -1, j: -1, k: -1 })}
        className={`w-52 h-52 rounded-lg cursor-pointer border-4 ${
          selectedIndex.i === -1 &&
          selectedIndex.j === -1 &&
          selectedIndex.k === -1
            ? "border-green"
            : "border-transparent"
        }`}
      >
        <PlanDefaultImage />
      </div>
    );
    for (let i = 0; i < plans.length; i++) {
      for (let j = 0; j < plans[i].length; j++) {
        for (let k = 0; k < plans[i][j].photoUrls.length; k++) {
          result.push(
            <img
              src={plans[i][j].photoUrls[k]}
              alt="여행 이미지"
              key={i.toString() + j + k}
              onClick={() => handleChoosePhoto(i, j, k)}
              className={`w-52 h-52 rounded-lg object-cover cursor-pointer border-4 ${
                i === selectedIndex.i &&
                j === selectedIndex.j &&
                k === selectedIndex.k
                  ? "border-green"
                  : "border-transparent"
              }`}
            />
          );
        }
      }
    }
    if (result.length !== 150) {
      result.push(
        <div
          onClick={handleAddPhoto}
          className="w-52 h-52 rounded-lg bg-gray-400 cursor-pointer flex items-center justify-center"
          key="plus"
        >
          <MdAddPhotoAlternate className="text-6xl text-white" />
        </div>
      );
    }
    return result;
  };

  return (
    <div className="w-full min-h-[750px] ml-[150px] p-6 bg-[#F3F3F7] flex flex-col gap-10">
      <h3>썸네일 선택</h3>
      <div className="w-full flex flex-wrap gap-10">{rendering()}</div>
      <div className="flex h-full items-end justify-end">
        <button
          onClick={handleSavePlan}
          className="px-4 py-2 rounded-lg bg-darkGreen text-white"
        >
          계획 저장
        </button>
      </div>
    </div>
  );
};

export default PlanChooseThumbnail;
