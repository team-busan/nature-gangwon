import React from 'react';
import LocationItem from '../LocationInfo/LocationItem';

const LocationList = ({ data, loading, error }) => (
  <section className="w-full">
    {loading && <p>Loading...</p>}
    {!loading && !error && (
      <div className="w-1420 mx-auto p-2 flex flex-wrap">
        {data.map((item) => (
          <LocationItem key={item.id} item={item} />
        ))}
      </div>
    )}
  </section>
);

export default LocationList;
