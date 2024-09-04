import { useState } from "react";

import { FaMinus, FaPlus, FaDivide, FaEquals } from "react-icons/fa6";

const Expense = ({ item, idx, handleChange }) => {
  return (
    <li className="border-[1px] border-black p-2 rounded-lg">
      <input
        type="number"
        min="0"
        step="1000"
        placeholder="경비를 입력하세요"
        value={item}
        onChange={(e) => handleChange(e, idx)}
        className="w-full outline-none"
      />
    </li>
  );
};

const ExpensesDivision = () => {
  const [expense, setExpense] = useState([0]);
  const [people, setPeople] = useState();

  const handleChange = (e, idx) => {
    const expenseCopy = [...expense];
    expenseCopy[idx] = e.target.value;
    setExpense(expenseCopy);
  };

  const handleAdd = () => {
    setExpense([...expense, ""]);
  };

  const handleRemove = () => {
    const expenseCopy = [...expense];
    expenseCopy.pop();
    setExpense(expenseCopy);
  };

  return (
    <div className="w-3/4 mx-auto py-24 px-32 border-[1px] border-gray-200 rounded-xl shadow-lg flex flex-col gap-20">
      <div className="w-full flex justify-center">
        <h3>경비분할</h3>
      </div>
      <div className="flex flex-col justify-between gap-20">
        <ul className="flex flex-col gap-5">
          {expense.map((item, idx) => {
            return (
              <Expense
                key={idx}
                item={item}
                idx={idx}
                handleChange={handleChange}
              />
            );
          })}
          <li className="flex gap-5">
            <div
              onClick={handleAdd}
              className="w-min p-2 border-[1px] border-black rounded-lg flex items-center justify-center cursor-pointer"
            >
              <FaPlus className="text-2xl" />
            </div>
            {expense.length > 1 ? (
              <div
                onClick={handleRemove}
                className="w-min p-2 border-[1px] border-black rounded-lg flex items-center justify-center cursor-pointer"
              >
                <FaMinus className="text-2xl" />
              </div>
            ) : null}
          </li>
        </ul>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <input
              type="number"
              disabled
              placeholder="총 경비"
              value={expense.reduce((acc, cur) => acc + parseInt(cur), 0)}
              className="w-8/12 outline-none p-2 border-[1px] border-black rounded-lg"
            />
            <FaDivide className="text-2xl w-2/12" />
            <input
              type="number"
              min="0"
              placeholder="n 명"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-2/12 p-2 border-[1px] border-black rounded-lg"
            />
          </div>
          <div className="flex gap-5">
            <div className="w-min p-2 border-[1px] border-black rounded-lg flex justify-center items-center">
              <FaEquals className="text-2xl" />
            </div>
            <input
              type="number"
              disabled
              placeholder="1인당 경비"
              className="p-2 w-full border-[1px] border-black rounded-lg"
              value={
                people === 0
                  ? 0
                  : parseInt(
                      expense.reduce((acc, cur) => acc + parseInt(cur), 0) /
                        people
                    )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDivision;
