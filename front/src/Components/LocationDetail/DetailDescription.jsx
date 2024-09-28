import React from 'react'

export default function DetailDescription({ description, type }) {
  return (
    <section className="w-1420 mt-3 p-3">
      <h2 className="mb-5 text-green">{type === "festival" ? "축제 소개" : "관광지 소개"}</h2>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <hr className="border-t-2 mt-5 bg-gray-600 w-full" />
    </section>
  );
}
