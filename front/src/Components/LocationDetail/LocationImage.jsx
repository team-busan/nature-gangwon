import React from 'react'

export default function LocationImage({image}) {
  return (
    <section className="w-screen h-104 flex justify-center">
    <img
      src={image}
      alt="메인 이미지"
      className="w-1420 h-full bg-cover"
    />
  </section>
  )
}
