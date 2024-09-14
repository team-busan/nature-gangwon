import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MarkedFestivals = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [festivals, setFestivals] = useState([]);

  const getFestivals = async () => {
    const res = await axios.get("http://localhost:8000/festival/mark-list", {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });
    setFestivals(res.data.markList);
    return res.data;
  };

  useEffect(() => {
    console.log(festivals);
  }, [festivals]);

  return <div>MarkedFestivals</div>;
};

export default MarkedFestivals;
