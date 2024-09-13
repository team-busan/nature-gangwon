import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const OAuth = () => {
  const { token, expirationTime } = useParams();
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !expirationTime) return;

    const now = new Date().getTime() * 1000;
    const expires = new Date(now + Number(expirationTime));

    setCookie("token", token, { expires, path: "/" });
    navigate("/");
  }, [token]);

  return <div>OAuth</div>;
};

export default OAuth;
