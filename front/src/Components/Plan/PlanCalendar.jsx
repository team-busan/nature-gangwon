import { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  addDays,
  differenceInDays,
} from "date-fns";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { motion } from "framer-motion";

import { useRecoilState } from "recoil";
import { planList } from "../../state/planState.js";
import PlanAlert from "./PlanAlert.jsx";
import { alertState } from "../../state/alertState.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CalendarHeader = ({ curMon, prevMon, nextMon }) => {
  return (
    <div className="flex gap-6 justify-center items-center text-2xl">
      <MdArrowBackIos className="cursor-pointer" onClick={prevMon} />
      <div>
        {format(curMon, "yyyy")}.{format(curMon, "M")}
      </div>
      <MdArrowForwardIos className="cursor-pointer" onClick={nextMon} />
    </div>
  );
};

const CaledarBody = ({ curMon, dates, onDateClick, rangeState }) => {
  const today = format(new Date(), "yyyyMMdd");
  const getWeather = async () => {
    const res = await axios.get(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.REACT_APP_WEATHER_API_KEY}&numOfRows=9999&dataType=JSON&pageNo=1&base_date=${today}&base_time=0500&nx=84&ny=132`
    );
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: getWeather,
  });

  useEffect(() => {
    if (data) {
      if (data.response) {
        if (data.response.body) {
          if (data.response.body.items) {
            if (data.response.body.items.item) {
              function getMode(arr) {
                const frequencyMap = {};
                arr.forEach((value) => {
                  frequencyMap[value] = (frequencyMap[value] || 0) + 1;
                });

                let maxCount = 0;
                let modeValue = null;

                Object.keys(frequencyMap).forEach((key) => {
                  if (frequencyMap[key] > maxCount) {
                    maxCount = frequencyMap[key];
                    modeValue = key;
                  }
                });

                return modeValue;
              }

              // 날짜별로 데이터 처리 함수
              function processWeatherData(weatherData) {
                const dailyData = {};

                weatherData.forEach((item) => {
                  const { fcstDate, category, fcstValue } = item;

                  // 날짜별로 데이터 그룹화
                  if (!dailyData[fcstDate]) {
                    dailyData[fcstDate] = { SKY: [], PTY: [] };
                  }

                  if (category === "SKY") {
                    dailyData[fcstDate].SKY.push(fcstValue);
                  } else if (category === "PTY") {
                    dailyData[fcstDate].PTY.push(fcstValue);
                  }
                });

                // 날짜별로 최빈값 계산
                const result = Object.keys(dailyData).map((date) => {
                  const mostFrequentSky = getMode(dailyData[date].SKY);
                  const mostFrequentPty = getMode(dailyData[date].PTY);

                  return { date, sky: mostFrequentSky, pty: mostFrequentPty };
                });

                return result;
              }

              const result = processWeatherData(data.response.body.items.item);
              console.log(result);
            }
          }
        }
      }
    }
  }, [data]);

  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  const monStart = startOfMonth(curMon);
  const monEnd = endOfMonth(curMon);
  const startDate = startOfWeek(monStart);
  const endDate = endOfWeek(monEnd);

  const monArray = [];
  let day = startDate;

  while (day <= endDate) {
    monArray.push(day);
    day = addDays(day, 1);
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, translateY: -10 },
    show: { opacity: 1, translateY: 0 },
  };

  return (
    <div>
      <div className="grid grid-cols-7 place-items-center mt-10 mb-2">
        {weeks.map((item, idx) => {
          return (
            <div className="first:text-red-600 last:text-blue-500" key={idx}>
              {item}
            </div>
          );
        })}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-7 gap-y-4 place-items-center text-center"
      >
        {monArray.map((day, idx) => {
          return (
            <motion.div
              variants={item}
              className={`py-6 px-10 cursor-pointer w-full ${
                format(curMon, "M") !== format(day, "M")
                  ? "text-gray-300"
                  : "text-black"
              } ${
                isSameDay(day, dates[0]) ? "bg-softGreen rounded-l-full" : null
              }
              ${isSameDay(day, dates[1]) ? "bg-softGreen rounded-r-full" : null}
              ${dates[0] < day && day < dates[1] ? "bg-lightGreen" : ""}
              hover:${
                rangeState === true && dates[0] < day ? "bg-lightGreen" : null
              }`}
              key={idx}
              onClick={() => onDateClick(day)}
            >
              {format(day, "d")}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const PlanCalendar = ({ setPlanStage, dates, setDates, setFoldStage }) => {
  const [plans, setPlans] = useRecoilState(planList);
  const [curMon, setCurMon] = useState(new Date());
  const prevMon = () => setCurMon(subMonths(curMon, 1));
  const nextMon = () => setCurMon(addMonths(curMon, 1));
  const [rangeState, setRangeState] = useState(false);
  const [message, setMessage] = useRecoilState(alertState);

  const onDateClick = (date) => {
    if (rangeState === false) {
      setDates((prev) => [date, prev[1]]);
      setRangeState(true);
    } else {
      if (date < dates[0]) {
        setMessage("여행 마지막 날은 여행 시작 날 이후여야 합니다.");
        setDates([new Date(), new Date()]);
      } else if (differenceInDays(date, dates[0]) > 9) {
        setMessage("최대 10일의 계획만 세울 수 있습니다.");
        setDates([new Date(), new Date()]);
      } else {
        setDates((prev) => [prev[0], date]);
      }
      setRangeState(false);
    }
  };

  useEffect(() => {
    const days = differenceInDays(dates[1], dates[0]);
    let emptyList = [];
    for (let i = 0; i <= days; i++) {
      emptyList.push([]);
    }
    setPlans(emptyList);
  }, [dates]);

  return (
    <div className="w-1/2">
      <div className="w-full h-20 mt-5 mb-10 relative flex justify-center items-center">
        <h2>{!rangeState ? "여행 시작 날 선택" : "여행 마지막 날 선택"}</h2>
        {message && <PlanAlert />}
      </div>
      <CalendarHeader curMon={curMon} prevMon={prevMon} nextMon={nextMon} />
      <CaledarBody
        curMon={curMon}
        dates={dates}
        onDateClick={onDateClick}
        rangeState={rangeState}
      />

      <div className="mt-12 flex justify-between items-center">
        <div>
          <div>여행 시작 날 : {format(dates[0], "yyyy M dd")}</div>
          <div>여행 마지막 날 : {format(dates[1], "yyyy M dd")}</div>
        </div>
        <button
          onClick={() => {
            setPlanStage(1);
            setFoldStage(1);
          }}
          className="bg-darkGreen text-white py-2 px-4 rounded-lg h-min"
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default PlanCalendar;
