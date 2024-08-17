import React from 'react'

export default function DetailDescription({ description }) {
  return (
    <section className="w-1420 mt-3 p-3">
      <h2 className="mb-5 text-green">관광지 소개</h2>
      <div dangerouslySetInnerHTML={{ __html: description.detailOverview }} />
      <hr className="border-t-2 mt-5 bg-gray-600 w-full" />
    </section>
  )
}
