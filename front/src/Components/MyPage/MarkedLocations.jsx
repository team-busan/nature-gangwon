import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MarkedLocations = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    const res = await axios.get("http://localhost:8000/destination/mark-list", {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });
    setLocations(res.data.markList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["markList"],
    queryFn: getLocations,
  });

  useEffect(() => {
    console.log(locations);
    console.log(data);
  }, [locations]);

  return <div>MarkedLocations</div>;
};

export default MarkedLocations;
