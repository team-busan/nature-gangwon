import React from 'react'
import NaverMap from '../NaverMap'

export default function DetailInformation() {
  const lat = "37.5665"
  const lng = "126.9780"
  return (
    <div>
      <NaverMap lat = {lat} lng = {lng}/>
    </div>
  )
}
