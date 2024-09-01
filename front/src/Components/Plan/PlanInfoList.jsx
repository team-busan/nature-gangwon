import React from 'react'
import PlanInfoItem from './PlanInfoItem'
import { useNavigate } from 'react-router-dom'

export default function PlanInfoList({data, loading, error}) {

  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/plan/${id}`); // 절대 경로로 변경
  }

  return (
    <section className = "w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data: {error.message}</p>}
      {!loading && !error && data && (
        <div className = "w-1420 mx-auto p-2 flex flex-wrap">
          {data.plans.map((item) => (
            <div
              key = {item.planId}
              className = "p-2 cursor-pointer"
              style = {{width : "calc(25% - 16px", margin : "8px"}}
              onClick = {() => handleItemClick(item.planId)}
            >
              <PlanInfoItem item = {item}/>
            </div>
          ))}

        </div>
      )}
    </section>
  )
}
