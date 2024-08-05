import { useState } from "react";
import { format, addMonths, subMonths, set } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { motion } from "framer-motion";

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
                rangeState == true && dates[0] < day ? "bg-lightGreen" : null
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
  const [curMon, setCurMon] = useState(new Date());
  const prevMon = () => setCurMon(subMonths(curMon, 1));
  const nextMon = () => setCurMon(addMonths(curMon, 1));
  const [rangeState, setRangeState] = useState(false);
  const onDateClick = (date) => {
    if (rangeState == false) {
      setDates([date, date]);
      setDates((prev) => [date, prev[1]]);
      setRangeState(true);
    } else {
      if (date < dates[0]) {
        setDates([date, date]);
      } else {
        setDates((prev) => [prev[0], date]);
      }
      setRangeState(false);
    }
  };

  return (
    <div className="w-1/2">
      <CalendarHeader curMon={curMon} prevMon={prevMon} nextMon={nextMon} />
      <CaledarBody
        curMon={curMon}
        dates={dates}
        onDateClick={onDateClick}
        rangeState={rangeState}
      />

      <div className="flex justify-between items-center">
        <div>
          <div>{!rangeState ? "여행 시작 날 선택" : "여행 마지막 날 선택"}</div>
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
